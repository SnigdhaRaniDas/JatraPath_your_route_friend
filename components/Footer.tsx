import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 w-full bg-gradient-to-b from-sky-700 to-blue-800 text-sky-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex justify-between">
          <div>
            <Image src="/image/JatraLogo.png" alt="logo" width={40} height={40} />
            <p className="text-sm mt-2">Your Route Friend</p>
          </div>

          <Mail className="h-5 w-5 cursor-pointer" />
        </div>

        <div className="mt-6 text-center text-sm text-sky-200">
          © 2026 JatraPath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
