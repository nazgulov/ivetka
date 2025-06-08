import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#3b2c3f] text-white pt-10 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
        {/* Logo vlevo */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={140}
            className="w-36 h-auto object-contain"
          />
        </div>

        {/* Certifikát uprostřed */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <a
            href="/img/certifikat.avif"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/img/certifikat.avif"
              alt="Certifikát"
              width={300}
              height={300}
              className="w-[300px] h-auto object-contain hover:opacity-90 transition"
            />
          </a>
        </div>

        {/* Text vpravo */}
        <div className="w-full lg:w-1/3 text-center lg:text-right leading-relaxed text-sm">
          <p className="font-semibold text-base mb-2">Iveta Jakubíková</p>
          <p>Certifikovaný makléř</p>
          <p>IČO 47808331</p>
          <p>Zapsaná u ŽU Česká Lípa</p>

          <div className="mt-4">
            <p className="font-medium">Sídlo firmy</p>
            <p>Bezděz 20</p>
            <p>472 01 Doksy</p>
          </div>

          <div className="mt-4">
            <p className="font-medium">Adresa kanceláře</p>
            <p>Tyršova 72</p>
            <p>294 21 Bělá pod Bezdězem</p>
          </div>

          <div className="mt-4">
            <p>Tel.: <a href="tel:+420608263732" className="underline">+420 608 263 732</a></p>
            <p>E-mail: <a href="mailto:info@ivetajakubikova.com" className="underline">info@ivetajakubikova.com</a></p>
          </div>
        </div>
      </div>

      {/* Spodní pruh */}
      <div className="text-center text-xs text-gray-300 mt-8">
        &copy; {new Date().getFullYear()} Iveta Jakubíková. Všechna práva vyhrazena.
      </div>
    </footer>
  );
}
