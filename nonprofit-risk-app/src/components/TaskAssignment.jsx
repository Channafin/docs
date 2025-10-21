import { CheckCircle, AlertTriangle, Circle } from 'lucide-react';

function TaskAssignment({
  tasks,
  categories,
  assignments,
  roles,
  selectedCategory,
  onCategoryChange,
  onTaskAssignment,
  riskAnalysis
}) {
  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter(task => task.category === selectedCategory);

  const getTaskStatus = (task) => {
    const assignedRole = assignments[task.id];

    if (!assignedRole) {
      return {
        icon: <Circle className="w-4 h-4 text-gray-400" />,
        className: 'bg-white border-gray-200',
        statusText: 'Unassigned'
      };
    }

    // Check if this task is involved in any violation
    const hasViolation = riskAnalysis.violations.some(
      v => (v.task1.id === task.id || v.task2.id === task.id) && v.role === assignedRole
    );

    if (hasViolation) {
      return {
        icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
        className: 'bg-red-50 border-red-300',
        statusText: 'Conflict'
      };
    }

    return {
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      className: 'bg-green-50 border-green-200',
      statusText: 'Assigned'
    };
  };

  const getRiskWeightColor = (weight) => {
    if (weight >= 9) return 'bg-red-500';
    if (weight >= 7) return 'bg-orange-500';
    if (weight >= 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <h2 className="text-lg font-semibold">Task Assignment</h2>
        <p className="text-sm text-purple-100">Assign tasks to roles and monitor conflicts</p>
      </div>

      <div className="p-4">
        {/* Category Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Tasks ({tasks.length})
            </button>
            {categories.map(category => {
              const count = tasks.filter(t => t.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Task Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map(task => {
                const status = getTaskStatus(task);
                const assignedRole = assignments[task.id];
                const role = roles.find(r => r.id === assignedRole);

                return (
                  <tr
                    key={task.id}
                    className={`transition-colors ${status.className}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {status.icon}
                        <span className="text-xs text-gray-600">{status.statusText}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">
                        {task.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs text-gray-600">{task.category}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getRiskWeightColor(task.riskWeight)}`}
                            style={{ width: `${(task.riskWeight / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-6">{task.riskWeight}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        value={assignedRole || ''}
                        onChange={(e) => onTaskAssignment(task.id, e.target.value)}
                        className={`text-sm border rounded px-2 py-1 ${
                          status.statusText === 'Conflict'
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      >
                        <option value="">-- Unassigned --</option>
                        {roles.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({r.type})
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks found for the selected category
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskAssignment;
