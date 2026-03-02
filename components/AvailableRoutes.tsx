"use client";

import { useState } from "react";
import { Bus, Star } from "lucide-react";
import BusCard from "./BusCard";
import { RouteDetailsModal } from "./RouteDetailsmodel";
import { RouteSearchResult } from "@/type/transport";

interface AvailableRoutesProps {
  results: RouteSearchResult[];
  hasSearched: boolean;
  searchFrom: string;
  searchTo: string;
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

export default function AvailableRoutes({
  results = [],
  hasSearched,
  searchFrom,
  searchTo,
  onAddToFavorites,
  isFavorite,
}: AvailableRoutesProps) {
  // ✅ modal state (IMPORTANT)
  const [selectedRoute, setSelectedRoute] =
    useState<RouteSearchResult | null>(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="bg-white/90 rounded-2xl shadow-xl w-full max-w-6xl mx-auto p-8 ring-1 ring-sky-300">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-sky-900">
              {hasSearched
                ? results.length > 0
                  ? "Available Routes"
                  : "No Routes Found"
                : "Available Routes"}
            </h2>

            <p className="text-sm text-sky-800 mt-1">
              {!hasSearched
                ? "Search for routes to see available buses"
                : results.length > 0
                ? `Found ${results.length} route${
                    results.length !== 1 ? "s" : ""
                  } from ${searchFrom} to ${searchTo}`
                : `No direct routes available from ${searchFrom} to ${searchTo}`}
            </p>
          </div>

          {hasSearched && results.length > 0 && (
            <button
              onClick={onAddToFavorites}
              disabled={isFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isFavorite
                  ? "bg-gray-100 text-gray-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Star className="w-4 h-4" />
              {isFavorite ? "Saved" : "Save Route"}
            </button>
          )}
        </div>

        {/* NO RESULT */}
        {hasSearched && results.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <Bus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-xl text-gray-600 mb-2">
              No direct routes available
            </p>
          </div>
        )}

        {/* RESULTS */}
        {hasSearched && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {results.map((result, index) => (
              <BusCard
                key={index}
                result={result}
                onViewDetails={() => setSelectedRoute(result)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ MODAL RENDER */}
      {selectedRoute && (
        <RouteDetailsModal
          result={selectedRoute}
          onClose={() => setSelectedRoute(null)}
        />
      )}
    </section>
  );
}