// RouteDetailsModal.tsx
"use client";

import { X, Bus, User, GraduationCap } from "lucide-react";
import { RouteSearchResult } from "@/type/transport";
import { useState } from "react";
import RouteMapPreview from "./RouteMapPreview";
import RouteMap from "./RouteMap";
import { fareData } from "@/app/data/faredata";

interface RouteDetailsModalProps {
  result: RouteSearchResult;
  onClose: () => void;
}

function calculateFare(
  busId: string,
  firstStop: string,
  lastStop: string
): number {
  if (!fareData[busId]) return 10;

  const busFareMap = fareData[busId];
  const firstStopFare = busFareMap[firstStop];
  const lastStopFare = busFareMap[lastStop];

  if (firstStopFare === undefined || lastStopFare === undefined) return 10;

  const diff = Math.abs(lastStopFare - firstStopFare);

  // Same fare tier (diff = 0) → minimum 10tk
  // Any fare ≤ 5tk → round up to 10tk
  if (diff === 0 || diff <= 5) return 10;

  return diff;
}

export function RouteDetailsModal({ result, onClose }: RouteDetailsModalProps) {
  const stops = result.stops ?? [];
  const stopsCount = stops.length;
  const [fullMapOpen, setFullMapOpen] = useState(false);

  let fare = 0;
  if (stopsCount >= 2 && result.id) {
    fare = calculateFare(result.id, stops[0], stops[stopsCount - 1]);
  }

  const studentFare = Math.max(10, Math.round(fare * 0.6));

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
        <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Bus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{result.name}</h2>
                {stopsCount > 1 && (
                  <p className="text-sm text-gray-500">
                    {stops[0]} - {stops[stopsCount - 1]}
                  </p>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 p-4 space-y-5">

            {/* Fare */}
            <div>
              <h3 className="font-medium mb-3">Fare Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" /> Regular
                  </div>
                  <p className="text-xl font-semibold mt-1">৳{fare}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <GraduationCap className="w-4 h-4" /> Student
                  </div>
                  <p className="text-xl font-semibold text-blue-700 mt-1">৳{studentFare}</p>
                </div>
              </div>
            </div>

            {/* Route Preview */}
            <div>
              <h3 className="font-medium mb-2">Route Preview</h3>
              <RouteMapPreview busName={result.id} stopsList={stops} />
              <button
                onClick={() => setFullMapOpen(true)}
                className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                View Full Map
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Full Map Modal */}
      {fullMapOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setFullMapOpen(false)}
              className="absolute top-3 right-3 z-[1000] p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 border border-gray-200"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <RouteMap busName={result.id} stopsList={stops} />
          </div>
        </div>
      )}
    </>
  );
}