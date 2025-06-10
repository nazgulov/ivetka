"use client";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [realityOpen, setRealityOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Reality Iveta Jakubíková
          </h1>
        </div>
        {/* Desktop menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-base font-bold text-gray-700">
            <li className="relative group">
              <button
                className="hover:text-blue-700 transition-colors duration-200 focus:outline-none"
                onMouseEnter={() => setRealityOpen(true)}
                onMouseLeave={() => setRealityOpen(false)}
                onClick={() => setRealityOpen((v) => !v)}
              >
                Reality
              </button>
              {/* Submenu */}
              <ul
                className={`absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-lg py-2 w-56 transition-all duration-200 z-50
                  ${realityOpen ? "block" : "hidden"} group-hover:block`}
                onMouseEnter={() => setRealityOpen(true)}
                onMouseLeave={() => setRealityOpen(false)}
              >
                <li>
                  <a href="#properties" className="block px-6 py-2 hover:bg-blue-50 hover:text-blue-700 transition">Nemovitosti na prodej</a>
                </li>
                <li>
                  <a href="#land" className="block px-6 py-2 hover:bg-blue-50 hover:text-blue-700 transition">Pozemky na prodej</a>
                </li>
                <li>
                  <a href="#rent" className="block px-6 py-2 hover:bg-blue-50 hover:text-blue-700 transition">Pronájem</a>
                </li>
                <li>
                  <a href="#sold" className="block px-6 py-2 hover:bg-blue-50 hover:text-blue-700 transition">Prodáno</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#services" className="hover:text-blue-700 transition-colors duration-200">Služby</a>
            </li>
            <li>
              <a href="#valuation" className="hover:text-blue-700 transition-colors duration-200">Tržní odhad</a>
            </li>
            <li>
              <a href="#references" className="hover:text-blue-700 transition-colors duration-200">Reference</a>
            </li>
            <li>
              <a href="#documents" className="hover:text-blue-700 transition-colors duration-200">Dokumenty</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-700 transition-colors duration-200">Kontakt</a>
            </li>
          </ul>
        </nav>
        {/* Hamburger menu button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Otevřít menu"
        >
          <span className={`block w-7 h-1 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-7 h-1 bg-gray-700 rounded my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-7 h-1 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>
      {/* Mobile menu */}
      <nav
        className={`md:hidden bg-white shadow transition-all duration-300 ${
          menuOpen ? "max-h-[600px] py-4" : "max-h-0 overflow-hidden py-0"
        }`}
      >
        <ul className="flex flex-col gap-2 text-base font-bold text-gray-700 px-6">
          <li>
            <button
              className="w-full text-left py-2 hover:text-blue-700 flex justify-between items-center"
              onClick={() => setRealityOpen((v) => !v)}
            >
              Reality
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${realityOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Mobile submenu */}
            {realityOpen && (
              <ul className="pl-4 pb-2">
                <li>
                  <a href="#properties" className="block py-2 hover:text-blue-700">Nemovitosti na prodej</a>
                </li>
                <li>
                  <a href="#land" className="block py-2 hover:text-blue-700">Pozemky na prodej</a>
                </li>
                <li>
                  <a href="#rent" className="block py-2 hover:text-blue-700">Pronájem</a>
                </li>
                <li>
                  <a href="#sold" className="block py-2 hover:text-blue-700">Prodáno</a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="#services" className="block py-2 hover:text-blue-700">Služby</a>
          </li>
          <li>
            <a href="#valuation" className="block py-2 hover:text-blue-700">Tržní odhad</a>
          </li>
          <li>
            <a href="#references" className="block py-2 hover:text-blue-700">Reference</a>
          </li>
          <li>
            <a href="#documents" className="block py-2 hover:text-blue-700">Dokumenty</a>
          </li>
          <li>
            <a href="#contact" className="block py-2 hover:text-blue-700">Kontakt</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}