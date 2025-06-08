
export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
         
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Reality Iveta Jakubíková
          </h1>
        </div>
        <nav>
          <ul className="flex gap-6 text-sm sm:text-base font-medium text-gray-600">
            <li>
              <a
                href="#about"
                className="hover:text-black transition-colors duration-200"
              >
                O mně
              </a>
            </li>
            <li>
              <a
                href="#properties"
                className="hover:text-black transition-colors duration-200"
              >
                Nemovitosti
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
