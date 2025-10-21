import { tasks } from '../data/tasks';

export function calculateRiskScore(assignments, rolesList) {
  let riskScore = 0;
  const violations = [];
  const highRiskCombinations = [];
  const unassignedCritical = [];
  const workloadByRole = {};

  // Initialize workload counter
  rolesList.forEach(role => {
    workloadByRole[role.id] = 0;
  });

  // Count assignments per role
  Object.values(assignments).forEach(roleId => {
    if (roleId && workloadByRole[roleId] !== undefined) {
      workloadByRole[roleId]++;
    }
  });

  // Check for segregation of duties violations
  tasks.forEach(task => {
    const assignedRole = assignments[task.id];

    // Check if critical task is unassigned
    if (!assignedRole && task.riskWeight >= 8) {
      unassignedCritical.push(task);
      riskScore += task.riskWeight;
    }

    // Check for conflicts with other tasks
    if (assignedRole) {
      task.conflictsWith.forEach(conflictTaskId => {
        const conflictTask = tasks.find(t => t.id === conflictTaskId);
        if (conflictTask && assignments[conflictTaskId] === assignedRole) {
          const violationKey = [task.id, conflictTaskId].sort().join('-');

          // Avoid duplicate violations
          if (!violations.find(v => v.key === violationKey)) {
            const severity = Math.max(task.riskWeight, conflictTask.riskWeight);
            violations.push({
              key: violationKey,
              task1: task,
              task2: conflictTask,
              role: assignedRole,
              severity
            });
            riskScore += severity;
          }
        }
      });
    }
  });

  // Detect high-risk combinations
  const bankingAccess = assignments['online_banking'];
  const checkSigning = assignments['sign_checks'];
  const reconciliation = assignments['bank_reconciliation'];

  if (bankingAccess && bankingAccess === checkSigning && checkSigning === reconciliation) {
    highRiskCombinations.push({
      description: 'Complete banking control (online access, check signing, and reconciliation)',
      role: bankingAccess,
      severity: 10
    });
    riskScore += 15;
  } else if (bankingAccess && bankingAccess === checkSigning) {
    highRiskCombinations.push({
      description: 'Online banking access and check signing authority',
      role: bankingAccess,
      severity: 9
    });
    riskScore += 10;
  }

  // Check for complete cash control
  const openMail = assignments['open_mail'];
  const prepareDeposits = assignments['prepare_deposits'];
  const recordReceipts = assignments['record_receipts'];

  if (openMail && openMail === prepareDeposits && prepareDeposits === recordReceipts) {
    highRiskCombinations.push({
      description: 'Complete cash receipt control (open mail, prepare deposits, record receipts)',
      role: openMail,
      severity: 10
    });
    riskScore += 12;
  }

  // Check for disbursement control concentration
  const approveInvoices = assignments['approve_invoices'];
  const prepareChecks = assignments['prepare_checks'];
  const recordPayments = assignments['record_payments'];

  if (approveInvoices && approveInvoices === prepareChecks && prepareChecks === recordPayments) {
    highRiskCombinations.push({
      description: 'Complete disbursement control (approve, prepare, and record payments)',
      role: approveInvoices,
      severity: 10
    });
    riskScore += 12;
  }

  // Check for workload issues (overload warning, not necessarily a risk)
  const overloadedRoles = Object.entries(workloadByRole)
    .filter(([roleId, count]) => count > 10)
    .map(([roleId, count]) => ({ roleId, count }));

  // Cap risk score at 100
  riskScore = Math.min(100, riskScore);

  // Determine risk level
  let riskLevel = 'Low';
  let riskColor = 'green';
  if (riskScore > 60) {
    riskLevel = 'High';
    riskColor = 'red';
  } else if (riskScore > 30) {
    riskLevel = 'Medium';
    riskColor = 'yellow';
  }

  return {
    score: riskScore,
    level: riskLevel,
    color: riskColor,
    violations,
    highRiskCombinations,
    unassignedCritical,
    overloadedRoles,
    workloadByRole
  };
}

export function generateRecommendations(riskAnalysis, assignments, roles) {
  const recommendations = [];

  // High priority: Segregation violations
  if (riskAnalysis.violations.length > 0) {
    riskAnalysis.violations.forEach(violation => {
      const role = roles.find(r => r.id === violation.role);
      recommendations.push({
        priority: 'High',
        type: 'Segregation Violation',
        description: `Separate "${violation.task1.name}" and "${violation.task2.name}" - currently both assigned to ${role?.name || 'Unknown'}`,
        severity: violation.severity
      });
    });
  }

  // High priority: High-risk combinations
  if (riskAnalysis.highRiskCombinations.length > 0) {
    riskAnalysis.highRiskCombinations.forEach(combo => {
      const role = roles.find(r => r.id === combo.role);
      recommendations.push({
        priority: 'High',
        type: 'High-Risk Combination',
        description: `${combo.description} - assigned to ${role?.name || 'Unknown'}`,
        severity: combo.severity
      });
    });
  }

  // High priority: Unassigned critical tasks
  if (riskAnalysis.unassignedCritical.length > 0) {
    riskAnalysis.unassignedCritical.forEach(task => {
      recommendations.push({
        priority: 'High',
        type: 'Unassigned Critical Task',
        description: `Assign "${task.name}" (risk weight: ${task.riskWeight})`,
        severity: task.riskWeight
      });
    });
  }

  // Medium priority: Overloaded roles
  if (riskAnalysis.overloadedRoles.length > 0) {
    riskAnalysis.overloadedRoles.forEach(overload => {
      const role = roles.find(r => r.id === overload.roleId);
      recommendations.push({
        priority: 'Medium',
        type: 'Workload Imbalance',
        description: `${role?.name || 'Unknown'} has ${overload.count} tasks - consider redistributing`,
        severity: 5
      });
    });
  }

  // Sort by priority and severity
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  recommendations.sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.severity - a.severity;
  });

  return recommendations;
}
