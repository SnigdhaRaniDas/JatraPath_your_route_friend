"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchCard from "@/components/SearchCard";
import AvailableRoutes from "@/components/AvailableRoutes";
import Footer from "@/components/Footer";

export default function Home() {
  // Stores buses returned from backend
  const [buses, setBuses] = useState<any[]>([]);

  // Tracks whether user clicked Search
  const [searched, setSearched] = useState(false);

  // Called when Search button is clicked
  async function handleSearch(from: string, to: string) {
    try {
      const res = await fetch(
        `/api/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      );

      const data = await res.json();

      setBuses(data);
      setSearched(true);
    } catch (error) {
      console.error("Search failed", error);
      setBuses([]);
      setSearched(true);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-blue-100 to-sky-200">
      <Navbar />

      {/* SEARCH SECTION */}
      <SearchCard onSearch={handleSearch} />

      {/* RESULTS SECTION */}
      <AvailableRoutes buses={buses} searched={searched} />

      <Footer />
    </div>
  );
}
