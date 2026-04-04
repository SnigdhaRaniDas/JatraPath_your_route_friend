"use client";

import { MapPin, Search, ArrowRightLeft } from "lucide-react";
import { useState } from "react";

export default function SearchCard({ onSearch }: any) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [showSwapModal, setShowSwapModal] = useState(false);

  const [fromList, setFromList] = useState<string[]>([]);
  const [toList, setToList] = useState<string[]>([]);

  // Fetch autocomplete places
  const fetchPlaces = async (value: string, type: "from" | "to") => {
    if (!value) {
      type === "from" ? setFromList([]) : setToList([]);
      return;
    }

    try {
      const res = await fetch(`/api/places?q=${value}`);
      const data = await res.json();

      type === "from" ? setFromList(data) : setToList(data);
    } catch (error) {
      console.error("Failed to fetch places:", error);
    }
  };

  // Open Swap Modal
  const handleSwapClick = () => {
    if (!from || !to) {
      alert("Both FROM and TO locations must be selected before swapping.");
      return;
    }
    setShowSwapModal(true);
  };

  // Confirm Swap
  const confirmSwap = () => {
    setFrom(to);
    setTo(from);
    setShowSwapModal(false);
  };

  // Handle Search
  const handleSearch = () => {
    if (!from || !to) {
      alert("Please select both FROM and TO locations.");
      return;
    }

    if (from === to) {
      alert("FROM and TO locations cannot be the same.");
      return;
    }

    onSearch(from, to);
  };

  return (
    <div
  id="find-routes"
  className="flex items-center justify-center px-4 py-16 scroll-mt-24 relative"
>
      <div className="w-full max-w-3xl rounded-2xl bg-white/90 backdrop-blur shadow-xl p-8 ring-1 ring-sky-300">
        <h1 className="text-3xl font-bold text-center mb-2 bg-linear-to-r from-sky-700 to-blue-800 bg-clip-text text-transparent">
          Find Bus Routes in Dhaka, Bangladesh
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Search bus routes between locations in Dhaka with fare
        </p>

        <div className="flex items-end gap-4 flex-col sm:flex-row">
          {/* FROM */}
          <div className="flex-1 w-full relative">
            <label className="block mb-1 font-semibold text-sm text-gray-700">
              FROM
            </label>
            <div className="flex items-center border border-sky-200 rounded-lg px-3 py-2.5">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  fetchPlaces(e.target.value, "from");
                }}
                placeholder="Enter starting location"
                className="w-full outline-none bg-transparent"
              />
            </div>

            {fromList.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow z-20 max-h-48 overflow-auto">
                {fromList.map((place) => (
                  <li
                    key={place}
                    className="px-3 py-2 text-sm hover:bg-sky-100 cursor-pointer"
                    onClick={() => {
                      setFrom(place);
                      setFromList([]);
                    }}
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwapClick}
              className="p-3 rounded-full bg-white hover:bg-gray-50 shadow-md border border-gray-200 transition-all hover:scale-110"
              aria-label="Swap locations"
            >
              <ArrowRightLeft className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          {/* TO */}
          <div className="flex-1 w-full relative">
            <label className="block mb-1 font-semibold text-sm text-gray-700">
              TO
            </label>
            <div className="flex items-center border border-sky-200 rounded-lg px-3 py-2.5">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  fetchPlaces(e.target.value, "to");
                }}
                placeholder="Enter destination"
                className="w-full outline-none bg-transparent"
              />
            </div>

            {toList.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow z-20 max-h-48 overflow-auto">
                {toList.map((place) => (
                  <li
                    key={place}
                    className="px-3 py-2 text-sm hover:bg-sky-100 cursor-pointer"
                    onClick={() => {
                      setTo(place);
                      setToList([]);
                    }}
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSearch}
            className="px-8 py-3 rounded-lg bg-linear-to-r from-sky-600 to-blue-700 text-white flex items-center gap-2 hover:opacity-90 transition shadow-md"
          >
            <Search size={18} />
            Search Bus Routes
          </button>
        </div>
      </div>

      {/* Swap Confirmation Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Swap Locations?
            </h2>
            <p className="text-gray-600 mb-6">
              FROM: <strong>{from}</strong> <br />
              TO: <strong>{to}</strong>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowSwapModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmSwap}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}