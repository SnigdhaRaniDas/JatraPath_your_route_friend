import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/image/JatraLogo.png"
            alt="JatraPath Logo"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#find-routes" className="hover:text-blue-600 transition-colors">Find Routes</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>

        {/* CTA Button */}
        <div>
          <a 
            href="#download" 
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Download App
          </a>
        </div>
      </div>
    </nav>
  );
}