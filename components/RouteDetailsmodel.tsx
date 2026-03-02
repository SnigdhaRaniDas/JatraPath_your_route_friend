import { X, MapPin, User, GraduationCap, Bus } from "lucide-react";
import { RouteSearchResult } from "../type/transport";

interface RouteDetailsModalProps {
  result: RouteSearchResult;
  onClose: () => void;
}

export function RouteDetailsModal({ result, onClose }: RouteDetailsModalProps) {
  const { route, relevantStops, fromStopIndex, toStopIndex } = result;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Bus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{route.busName}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Fare Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Regular</span>
                </div>
                <span className="text-xl font-semibold">৳{route.fareRegular}</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Student</span>
                </div>
                <span className="text-xl font-semibold text-blue-600">৳{route.fareStudent}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Your Route ({relevantStops.length} stops)</h3>
            <div className="space-y-3">
              {relevantStops.map((stop, index) => {
                const isFirst = index === 0;
                const isLast = index === relevantStops.length - 1;
                
                return (
                  <div key={stop.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isFirst
                            ? "bg-green-600"
                            : isLast
                            ? "bg-red-600"
                            : "bg-gray-300"
                        }`}
                      />
                      {!isLast && (
                        <div className="w-0.5 h-8 bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="font-medium">{stop.name}</p>
                      {isFirst && (
                        <p className="text-xs text-green-600 mt-0.5">Starting point</p>
                      )}
                      {isLast && (
                        <p className="text-xs text-red-600 mt-0.5">Destination</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium mb-2">Complete Route</h3>
            <p className="text-sm text-gray-600">
              {route.stops[0].name} → {route.stops[route.stops.length - 1].name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Total {route.stops.length} stops
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
