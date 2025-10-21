import { useState } from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Copy, Edit2 } from 'lucide-react';

function RiskDashboard({
  scenarios,
  scenarioRisks,
  activeScenario,
  onScenarioChange,
  onCopyScenario,
  onRenameScenario,
  roles
}) {
  const [expanded, setExpanded] = useState(false);
  const [editingScenario, setEditingScenario] = useState(null);
  const [editName, setEditName] = useState('');

  const getRiskIcon = (level) => {
    switch (level) {
      case 'Low':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Medium':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'High':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getRiskColorClasses = (level) => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'High':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const handleStartEdit = (scenarioKey, currentName) => {
    setEditingScenario(scenarioKey);
    setEditName(currentName);
  };

  const handleSaveEdit = (scenarioKey) => {
    if (editName.trim()) {
      onRenameScenario(scenarioKey, editName.trim());
    }
    setEditingScenario(null);
  };

  const currentRisk = scenarioRisks[activeScenario];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Risk Analysis Dashboard
        </h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Scenario Comparison Cards */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Scenarios</h3>
          {Object.keys(scenarios).map(scenarioKey => {
            const scenario = scenarios[scenarioKey];
            const risk = scenarioRisks[scenarioKey];
            const isActive = scenarioKey === activeScenario;

            return (
              <div
                key={scenarioKey}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onScenarioChange(scenarioKey)}
              >
                <div className="flex items-center justify-between mb-2">
                  {editingScenario === scenarioKey ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => handleSaveEdit(scenarioKey)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(scenarioKey)}
                      className="text-sm font-medium flex-1 mr-2 px-2 py-1 border rounded"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm font-medium text-gray-900">
                        {scenario.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(scenarioKey, scenario.name);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopyScenario(scenarioKey);
                    }}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    title="Copy scenario"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getRiskIcon(risk.level)}
                    <span className="text-xs text-gray-600">{risk.level} Risk</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    getRiskColorClasses(risk.level)
                  }`}>
                    Score: {risk.score}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Scenario Details */}
        <div className="border-t pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-3"
          >
            <span>Risk Details: {scenarios[activeScenario].name}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expanded && (
            <div className="space-y-3">
              {/* Overall Risk Score */}
              <div className={`p-3 rounded-lg border-2 ${getRiskColorClasses(currentRisk.level)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Overall Risk</span>
                  <span className="text-2xl font-bold">{currentRisk.score}</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      currentRisk.level === 'High' ? 'bg-red-600' :
                      currentRisk.level === 'Medium' ? 'bg-yellow-600' :
                      'bg-green-600'
                    }`}
                    style={{ width: `${currentRisk.score}%` }}
                  />
                </div>
              </div>

              {/* Violations */}
              {currentRisk.violations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-red-700 uppercase">
                    Segregation Violations ({currentRisk.violations.length})
                  </h4>
                  {currentRisk.violations.map((violation, idx) => {
                    const role = roles.find(r => r.id === violation.role);
                    return (
                      <div key={idx} className="text-xs bg-red-50 p-2 rounded border border-red-200">
                        <div className="font-medium text-red-800">{role?.name || 'Unknown'}</div>
                        <div className="text-red-700">
                          • {violation.task1.name}
                        </div>
                        <div className="text-red-700">
                          • {violation.task2.name}
                        </div>
                        <div className="text-red-600 text-xs mt-1">
                          Severity: {violation.severity}/10
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* High-Risk Combinations */}
              {currentRisk.highRiskCombinations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-orange-700 uppercase">
                    High-Risk Combinations ({currentRisk.highRiskCombinations.length})
                  </h4>
                  {currentRisk.highRiskCombinations.map((combo, idx) => {
                    const role = roles.find(r => r.id === combo.role);
                    return (
                      <div key={idx} className="text-xs bg-orange-50 p-2 rounded border border-orange-200">
                        <div className="font-medium text-orange-800">{role?.name || 'Unknown'}</div>
                        <div className="text-orange-700">{combo.description}</div>
                        <div className="text-orange-600 text-xs mt-1">
                          Severity: {combo.severity}/10
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Unassigned Critical Tasks */}
              {currentRisk.unassignedCritical.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-yellow-700 uppercase">
                    Unassigned Critical Tasks ({currentRisk.unassignedCritical.length})
                  </h4>
                  {currentRisk.unassignedCritical.map((task, idx) => (
                    <div key={idx} className="text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                      <div className="text-yellow-800">{task.name}</div>
                      <div className="text-yellow-600 text-xs">
                        Risk Weight: {task.riskWeight}/10
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* All Clear */}
              {currentRisk.violations.length === 0 &&
               currentRisk.highRiskCombinations.length === 0 &&
               currentRisk.unassignedCritical.length === 0 && (
                <div className="text-xs bg-green-50 p-3 rounded border border-green-200 text-green-700 text-center">
                  No major control issues detected
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RiskDashboard;
