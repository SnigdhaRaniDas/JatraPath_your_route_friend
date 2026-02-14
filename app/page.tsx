import Image from "next/image";
import { MapPin, RefreshCcw, Search, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 via-blue-100 to-sky-200">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-linear-to-r from-sky-700 to-blue-800 text-sky-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/image/JatraLogo.png"
              alt="JatraPath Logo"
              width={150}
              height={100}
              className="h-auto"
            />
          </div>

          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#find-routes" className="hover:text-white transition">Routes</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Search Card */}
      <div id="find-routes" className="flex items-center justify-center px-4 py-16 scroll-mt-24">
        <div className="w-full max-w-3xl rounded-2xl bg-white/90 backdrop-blur shadow-xl p-8 ring-1 ring-sky-300">

          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-sky-700 to-blue-800 bg-clip-text text-transparent">
            Find Bus Routes in Dhaka, Bangladesh
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Search bus routes between locations in Dhaka with fare
          </p>

          <div className="flex items-end gap-3">

            <div className="flex-1">
              <label className="block mb-1 font-semibold text-sm text-gray-700">FROM</label>
              <div className="flex items-center border border-sky-200 rounded-lg px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-sky-400 transition">
                <MapPin size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter starting location"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <button className="mt-6 rounded-full p-2 text-sky-700 hover:bg-sky-200 transition">
              <RefreshCcw size={20} />
            </button>

            <div className="flex-1">
              <label className="block mb-1 font-semibold text-sm text-gray-700">TO</label>
              <div className="flex items-center border border-sky-200 rounded-lg px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-sky-400 transition">
                <MapPin size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-linear-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white py-3 flex items-center justify-center gap-2 font-semibold text-sm transition shadow-lg">
            <Search size={16} />
            Search Bus Routes
          </button>
        </div>
      </div>

      {/* Available Routes Card */}
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl w-full max-w-3xl mx-auto p-8 mt-4 ring-1 ring-sky-300">
        <h2 className="text-center text-xl font-bold mb-1 text-sky-900">Available Routes</h2>
        <p className="text-center text-sky-800 mb-6 text-sm">
          Search for routes to see available buses and fares
        </p>

        <div className="flex justify-center">
          <div className="bg-linear-to-br from-sky-50 to-white p-5 rounded-2xl shadow-sm w-full max-w-md animate-pulse ring-1 ring-sky-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-sky-200 p-3 rounded-lg w-10 h-10" />
                <div className="space-y-1 w-32">
                  <div className="h-4 bg-gray-300 rounded w-16" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              </div>
              <div className="h-4 bg-sky-200 rounded-full w-12" />
            </div>

            <div className="space-y-2 mb-3">
              <div className="h-3 bg-gray-200 rounded w-40" />
              <div className="h-3 bg-gray-100 rounded w-28" />
            </div>

            <div className="flex items-center justify-between">
              <div className="h-3 bg-gray-200 rounded w-12" />
              <div className="h-3 bg-gray-200 rounded w-12" />
              <div className="h-3 bg-gray-300 rounded w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 w-full bg-gradient-to-b from-sky-700 to-blue-800 text-sky-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 shadow-md">
                  <Image src="/image/JatraLogo.png" alt="logo" width={24} height={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">JatraPath</h2>
                  <p className="text-sm text-sky-200">Your Route Friend</p>
                </div>
              </div>

              <p className="max-w-sm text-sm leading-relaxed text-sky-100/90">
                Making daily commuting easier by providing clear route and fare information for public transport users in one convenient place.
              </p>

              <div className="mt-6">
                <Mail className="h-5 w-5 hover:text-white cursor-pointer transition" />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#find-routes" className="hover:text-white transition">Find Routes</a></li>
                <li><a href="#" className="hover:text-white transition">Fare Information</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-sky-200">
            © 2026 JatraPath. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
