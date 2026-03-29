// BusCard.tsx
"use client";

import { Bus, MapPin, User, GraduationCap, Clock } from "lucide-react";
import { RouteSearchResult } from "@/type/transport";
import { fareData } from "@/app/data/faredata";

interface BusCardProps {
  result: RouteSearchResult;
  onViewDetails: () => void;
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

export default function BusCard({ result, onViewDetails }: BusCardProps) {
  const stops = Array.isArray(result.stops) ? result.stops : [];
  const stopsCount = stops.length;
  const intermediateCount = stopsCount > 2 ? stopsCount - 2 : 0;

  let fare = 0;
  if (stopsCount >= 2 && result.id) {
    fare = calculateFare(result.id, stops[0], stops[stopsCount - 1]);
  }

  const studentFare = Math.max(10, Math.round(fare * 0.6));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Bus className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{result.name ?? "N/A"}</h3>
          </div>
        </div>
      </div>

      <div className="space-y-1 mb-4 text-sm text-gray-600">
        {stopsCount > 0 && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>{stops[0]}</span>
          </div>
        )}
        <div className="ml-6 text-xs text-gray-500">
          {intermediateCount > 0 ? `${intermediateCount} stoppage` : "1 stoppage"}
        </div>
        {stopsCount > 1 && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <span>{stops[stopsCount - 1]}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <Clock className="w-4 h-4" />
        <span>{stopsCount} stops</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">৳{fare}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">৳{studentFare}</span>
          </div>
        </div>
        <button
          onClick={onViewDetails}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
}