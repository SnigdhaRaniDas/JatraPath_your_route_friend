"use client";

import { X, MapPin, User, GraduationCap, Bus } from "lucide-react";
import { RouteSearchResult } from "@/type/transport";

interface RouteDetailsModalProps {
  result: RouteSearchResult;
  onClose: () => void;
}

export function RouteDetailsModal({
  result,
  onClose,
}: RouteDetailsModalProps) {
  const stops = result.stops ?? [];
  const stopsCount = stops.length;

  // ✅ fare calculation
  const fare =
    stopsCount > 1
      ? result.fareMatrix?.[stops[0]]?.[stops[stopsCount - 1]] ?? 0
      : 0;

  const studentFare = Math.round(fare * 0.6);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Bus className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              {/* Bus Name */}
              <h2 className="font-semibold text-lg">{result.name}</h2>

              {/* Route Direction */}
              {stopsCount > 1 && (
                <p className="text-sm text-gray-500">
                  {stops[0]} - {stops[stopsCount - 1]}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto flex-1 p-4">

          {/* ===== Fare Section ===== */}
          <div className="mb-5">
            <h3 className="font-medium mb-3">Fare Information</h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Regular */}
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  Regular
                </div>

                <p className="text-xl font-semibold mt-1">৳{fare}</p>
              </div>

              {/* Student */}
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </div>

                <p className="text-xl font-semibold text-blue-700 mt-1">
                  ৳{studentFare}
                </p>
              </div>
            </div>
          </div>

          {/* ===== Your Route ===== */}
          <div>
            <h3 className="font-medium mb-3">
              Your Route ({stopsCount} stops)
            </h3>

            <div className="space-y-3">
              {stops.map((stop, index) => {
                const isFirst = index === 0;
                const isLast = index === stops.length - 1;

                return (
                  <div key={index} className="flex items-start gap-3">
                    {/* Timeline Dot */}
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

                    {/* Stop Info */}
                    <div className="flex-1 pb-2">
                      <p className="font-medium">{stop}</p>

                      {isFirst && (
                        <p className="text-xs text-green-600">
                          Starting point
                        </p>
                      )}

                      {isLast && (
                        <p className="text-xs text-red-600">
                          Destination
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== Complete Route ===== */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-medium mb-2">Complete Route</h3>

            {stopsCount > 1 && (
              <>
                <p className="text-sm text-gray-600">
                  {stops[0]} → {stops[stopsCount - 1]}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Total {stopsCount} stops
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}