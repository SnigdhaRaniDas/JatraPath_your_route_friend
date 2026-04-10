"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const handleScroll = (id: string) => {
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/image/JatraLogo.png"
              alt="JatraPath Logo"
              width={200}
              height={100}
              className="h-9 md:h-12 lg:h-10 w-auto"
            />
          </div>

          {/* Links */}
          <div className="hidden md:flex gap-8 font-medium text-gray-700">
            <button
              onClick={() => router.push("/")}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => handleScroll("find-routes")}
              className="hover:text-blue-600 transition-colors"
            >
              Find Routes
            </button>

            <button
              onClick={() => handleScroll("contact")}
              className="hover:text-blue-600 transition-colors"
            >
              Contact
            </button>

            <button
              onClick={() => router.push("/about")}
              className="hover:text-blue-600 transition-colors"
            >
              About
            </button>
          </div>

          {/* CTA Button */}
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Download App
            </button>
          </div>
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center shadow-xl w-[300px]">
            <h2 className="text-xl font-bold mb-2">🚀 Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              Our mobile app is under development. Stay tuned!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}