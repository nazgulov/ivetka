interface Property {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Rodinný dům v Brně",
    location: "Brno",
    imageUrl: "/img/dum.jpg", // Nahraď dle skutečného souboru
  },
  {
    id: 2,
    title: "Byt 2+kk v Praze",
    location: "Praha",
    imageUrl: "/img/byt.jpg",
  },
];

export default function PropertyList() {
  return (
    <section id="properties" className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          Nejnovější nemovitosti
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProperties.map((property) => (
            <div key={property.id} className="bg-white rounded shadow hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                <p className="text-gray-500">{property.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
