import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-sky-700 to-blue-800 text-sky-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/image/JatraLogo.png"
            alt="JatraPath Logo"
            width={150}
            height={100}
          />
        </div>

        <div className="flex gap-6 font-medium">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#find-routes" className="hover:text-white transition">Routes</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </nav>
  );
}
