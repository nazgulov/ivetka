"use client";
import { useState } from "react";

export default function AboutSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="about" className="bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center rounded-xl shadow-lg p-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-6 tracking-tight">
          Iveta Jakubíková
        </h2>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
          Jsem realitní makléřka s osobním přístupem a zkušenostmi v oblasti prodeje a pronájmu nemovitostí.
          Pomáhám klientům najít místo, které jim bude vyhovovat nejen podle parametrů, ale i pocitově.
          Spolehlivost, důvěra a férové jednání jsou pro mě základem každé spolupráce.
        </p>
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="mx-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-200"
          aria-expanded={showMore}
        >
          {showMore ? "Méně informací" : "Více informací"}
          <span
            className={`transform transition-transform duration-300 ${
              showMore ? "rotate-180" : ""
            }`}
          >
            {/* SVG šipka dolů */}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showMore ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-lg shadow-inner p-6 text-left text-gray-700">
            <h3 className="text-xl font-bold mb-2 text-blue-800">Více o mně</h3>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Mám více než 10 let zkušeností v realitách a desítky spokojených klientů.</li>
              <li>Specializuji se na prodej i pronájem bytů, domů a komerčních prostor.</li>
              <li>Zakládám si na individuálním přístupu a férové komunikaci.</li>
              <li>Pomohu vám s právními i administrativními náležitostmi.</li>
              <li>Ve volném čase se věnuji rodině, sportu a vzdělávání v oboru.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
