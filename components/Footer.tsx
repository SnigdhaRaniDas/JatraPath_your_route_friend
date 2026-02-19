import Image from "next/image";
import Link from "next/link";
import { Mail, Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 w-full bg-gradient-to-b from-sky-700 to-blue-900 text-sky-100">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Left Section */}
        <div>
          <div className="mb-4">
            <Image
              src="/image/JatraLogo.png"
              alt="JatraPath Logo"
              width={150}
              height={50}
              className="object-contain"
              priority
            />
          </div>

          <p className="text-sky-200 text-sm leading-relaxed">
            Your trusted companion for hassle-free commuting. Find bus
            routes, check fares, and plan your journey with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sky-200 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/routes" className="hover:text-white transition">Find Routes</Link></li>
            <li><Link href="/fare" className="hover:text-white transition">Fare Information</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Connect With Us</h3>

          <div className="flex items-center gap-2 text-sky-200 text-sm mb-6">
            <Mail size={16} />
            <span>info@jatrapath.com</span>
          </div>

          <div className="flex gap-4">
            <a className="bg-sky-800/50 p-3 rounded-lg hover:bg-sky-600 transition">
              <Facebook size={18} />
            </a>
            <a className="bg-sky-800/50 p-3 rounded-lg hover:bg-sky-600 transition">
              <Twitter size={18} />
            </a>
            <a className="bg-sky-800/50 p-3 rounded-lg hover:bg-sky-600 transition">
              <Linkedin size={18} />
            </a>
            <a className="bg-sky-800/50 p-3 rounded-lg hover:bg-sky-600 transition">
              <Github size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-sky-600 py-6 text-center text-sm text-sky-200">
        © 2026 JatraPath – Your Route Friend. All rights reserved.

        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
