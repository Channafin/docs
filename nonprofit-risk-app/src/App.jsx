import { useState } from 'react';
import { Shield, Save, Download } from 'lucide-react';
import { roles as initialRoles } from './data/roles';
import { tasks, categories } from './data/tasks';
import { initialScenarios } from './data/scenarios';
import { calculateRiskScore, generateRecommendations } from './utils/riskCalculation';
import RiskDashboard from './components/RiskDashboard';
import TaskAssignment from './components/TaskAssignment';
import RoleManagement from './components/RoleManagement';
import Recommendations from './components/Recommendations';

function App() {
  const [roles, setRoles] = useState(initialRoles);
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [activeScenario, setActiveScenario] = useState('current');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const currentAssignments = scenarios[activeScenario].assignments;

  // Calculate risk for all scenarios
  const scenarioRisks = {};
  Object.keys(scenarios).forEach(scenarioKey => {
    scenarioRisks[scenarioKey] = calculateRiskScore(
      scenarios[scenarioKey].assignments,
      roles
    );
  });

  const currentRisk = scenarioRisks[activeScenario];
  const recommendations = generateRecommendations(currentRisk, currentAssignments, roles);

  const handleTaskAssignment = (taskId, roleId) => {
    setScenarios(prev => ({
      ...prev,
      [activeScenario]: {
        ...prev[activeScenario],
        assignments: {
          ...prev[activeScenario].assignments,
          [taskId]: roleId || undefined
        }
      }
    }));
  };

  const handleAddRole = (newRole) => {
    setRoles(prev => [...prev, newRole]);
  };

  const handleCopyScenario = (fromScenario) => {
    const newScenarioKey = `custom_${Date.now()}`;
    setScenarios(prev => ({
      ...prev,
      [newScenarioKey]: {
        name: `Copy of ${scenarios[fromScenario].name}`,
        assignments: { ...scenarios[fromScenario].assignments }
      }
    }));
  };

  const handleRenameScenario = (scenarioKey, newName) => {
    setScenarios(prev => ({
      ...prev,
      [scenarioKey]: {
        ...prev[scenarioKey],
        name: newName
      }
    }));
  };

  const handleExport = () => {
    const exportData = {
      scenarios,
      roles,
      riskAnalysis: scenarioRisks,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nonprofit-risk-analysis-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    localStorage.setItem('nonprofit-risk-data', JSON.stringify({ scenarios, roles }));
    alert('Configuration saved successfully!');
  };

  // Load saved data on mount
  useState(() => {
    const saved = localStorage.getItem('nonprofit-risk-data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.scenarios) setScenarios(data.scenarios);
        if (data.roles) setRoles(data.roles);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Nonprofit Risk Management Tool
                </h1>
                <p className="text-sm text-gray-600">
                  Internal Control Assessment & Optimization
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Risk Dashboard & Recommendations */}
          <div className="lg:col-span-1 space-y-6">
            <RiskDashboard
              scenarios={scenarios}
              scenarioRisks={scenarioRisks}
              activeScenario={activeScenario}
              onScenarioChange={setActiveScenario}
              onCopyScenario={handleCopyScenario}
              onRenameScenario={handleRenameScenario}
              roles={roles}
            />
            <Recommendations recommendations={recommendations} />
          </div>

          {/* Right Column - Task Assignment & Role Management */}
          <div className="lg:col-span-2 space-y-6">
            <TaskAssignment
              tasks={tasks}
              categories={categories}
              assignments={currentAssignments}
              roles={roles}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onTaskAssignment={handleTaskAssignment}
              riskAnalysis={currentRisk}
            />
            <RoleManagement
              roles={roles}
              assignments={currentAssignments}
              workloadByRole={currentRisk.workloadByRole}
              onAddRole={handleAddRole}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
