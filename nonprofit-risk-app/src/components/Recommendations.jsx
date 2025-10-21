import { Lightbulb, AlertTriangle, AlertCircle, Info } from 'lucide-react';

function Recommendations({ recommendations }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Medium':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'Low':
        return <Info className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getPriorityColorClasses = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'Medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'Low':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'Segregation Violation':
        return 'bg-red-100 text-red-800';
      case 'High-Risk Combination':
        return 'bg-orange-100 text-orange-800';
      case 'Unassigned Critical Task':
        return 'bg-yellow-100 text-yellow-800';
      case 'Workload Imbalance':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Recommendations
        </h2>
        <p className="text-sm text-amber-100">Prioritized action items to reduce risk</p>
      </div>

      <div className="p-4">
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-3">
              <Lightbulb className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Excellent Internal Controls!
            </h3>
            <p className="text-sm text-gray-600">
              No major issues detected. Your organization has good segregation of duties.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${getPriorityColorClasses(rec.priority)}`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {getPriorityIcon(rec.priority)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase">
                        {rec.priority} Priority
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadgeColor(rec.type)}`}>
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>Tip:</strong> Address high-priority items first. These represent the most significant
              internal control weaknesses that could lead to fraud or errors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendations;
