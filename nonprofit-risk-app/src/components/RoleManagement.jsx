import { useState } from 'react';
import { Users, Plus, User } from 'lucide-react';

function RoleManagement({ roles, assignments, workloadByRole, onAddRole }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    type: 'Staff'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRole.name.trim()) {
      const roleId = newRole.name.toLowerCase().replace(/\s+/g, '_');
      onAddRole({
        id: roleId,
        name: newRole.name.trim(),
        type: newRole.type,
        icon: User,
        color: 'gray'
      });
      setNewRole({ name: '', type: 'Staff' });
      setShowAddForm(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Board':
        return 'bg-blue-100 text-blue-800';
      case 'Staff':
        return 'bg-green-100 text-green-800';
      case 'External':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkloadStatus = (count) => {
    if (count === 0) return { color: 'bg-gray-200', label: 'No tasks' };
    if (count <= 5) return { color: 'bg-green-500', label: 'Light' };
    if (count <= 10) return { color: 'bg-yellow-500', label: 'Moderate' };
    return { color: 'bg-red-500', label: 'Heavy' };
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Role Management
            </h2>
            <p className="text-sm text-teal-100">View workload and add custom roles</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1 bg-white text-teal-700 rounded-lg hover:bg-teal-50 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Add Role Form */}
        {showAddForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Custom Role</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Finance Manager"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Role Type
                </label>
                <select
                  value={newRole.type}
                  onChange={(e) => setNewRole({ ...newRole, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="Board">Board</option>
                  <option value="Staff">Staff</option>
                  <option value="External">External</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                >
                  Add Role
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roles.map(role => {
            const taskCount = workloadByRole[role.id] || 0;
            const workloadStatus = getWorkloadStatus(taskCount);
            const Icon = role.icon;

            return (
              <div
                key={role.id}
                className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-${role.color}-100`}>
                      <Icon className={`w-4 h-4 text-${role.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {role.name}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(role.type)}`}>
                        {role.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Workload</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${workloadStatus.color} transition-all`}
                      style={{ width: `${Math.min(100, (taskCount / 15) * 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {workloadStatus.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;
