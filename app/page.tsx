"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchCard from "@/components/SearchCard";
import AvailableRoutes from "@/components/AvailableRoutes";
import Footer from "@/components/Footer";
import { RouteSearchResult } from "@/type/transport";
import { RouteDetailsModal } from "@/components/RouteDetailsmodel";

export default function Home() {
  const [results, setResults] = useState<RouteSearchResult[]>([]);
  
  const [hasSearched, setHasSearched] = useState(false);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  async function handleSearch(from: string, to: string) {
    try {
      setSearchFrom(from);
      setSearchTo(to);

      const res = await fetch(
        `/api/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      );

      if (!res.ok) {
        setResults([]);
        setHasSearched(true);
        return;
      }

      const data = await res.json();
      setResults(data);
      setHasSearched(true);

    } catch (error) {
      console.error("Search failed", error);
      setResults([]);
      setHasSearched(true);
    }
  }

  function handleViewDetails(result: RouteSearchResult) {
    console.log("View details:", result);
  }

  function handleAddToFavorites() {
    setIsFavorite(true);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-blue-100 to-sky-200">
      <Navbar />

      <SearchCard onSearch={handleSearch} />

      <AvailableRoutes
        results={results}
        hasSearched={hasSearched}
        searchFrom={searchFrom}
        searchTo={searchTo}
        onAddToFavorites={handleAddToFavorites}
        isFavorite={isFavorite}
      />

      <Footer />
      
    </div>
  );
}