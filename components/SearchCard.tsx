"use client";

import { MapPin, RefreshCcw, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchCard({ onSearch }: any) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromList, setFromList] = useState<string[]>([]);
  const [toList, setToList] = useState<string[]>([]);

  const fetchPlaces = async (value: string, type: "from" | "to") => {
    if (!value) {
      type === "from" ? setFromList([]) : setToList([]);
      return;
    }

    const res = await fetch(`/api/places?q=${value}`);
    const data = await res.json();

    type === "from" ? setFromList(data) : setToList(data);
  };

  return (
    <div id="find-routes" className="flex items-center justify-center px-4 py-16 scroll-mt-24">
      <div className="w-full max-w-3xl rounded-2xl bg-white/90 backdrop-blur shadow-xl p-8 ring-1 ring-sky-300">

        <h1 className="text-3xl font-bold text-center mb-2 bg-linear-to-r from-sky-700 to-blue-800 bg-clip-text text-transparent">
          Find Bus Routes in Dhaka, Bangladesh
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Search bus routes between locations in Dhaka with fare
        </p>

        <div className="flex items-end gap-3 flex-col sm:flex-row">

          {/* FROM */}
          <div className="flex-1 w-full relative">
            <label className="block mb-1 font-semibold text-sm text-gray-700">FROM</label>
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

          {/* SWAP */}
          <motion.button
            type="button"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            whileTap={{ rotate: 180, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-0 sm:mt-6 rounded-full p-2 text-sky-700 hover:bg-sky-200"
          >
            <RefreshCcw size={20} />
          </motion.button>

          {/* TO */}
          <div className="flex-1 w-full relative">
            <label className="block mb-1 font-semibold text-sm text-gray-700">TO</label>
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

        {/* SEARCH */}
        <div className="mt-8 flex justify-center">
          <button
            className="px-8 py-3 rounded-lg bg-linear-to-r from-sky-600 to-blue-700 text-white flex items-center gap-2 hover:opacity-90 transition"
            onClick={() => {
              console.log("Search clicked", from, to);
              onSearch(from, to);
            }}
          >
            <Search size={16} />
            Search Bus Routes
          </button>
        </div>

      </div>
    </div>
  );
}