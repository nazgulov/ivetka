"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Property = {
  id: number;
  title: string;
  city: string;
  price: number;
  imageUrl: string;
  [key: string]: unknown; // pro další pole, pokud nějaká jsou
};

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data: props, error } = await supabase.from("properties").select("*");
      if (error) {
        console.error("Chyba při načítání nemovitostí:", error.message);
        return;
      }
      if (!props || props.length === 0) {
        setProperties([]);
        return;
      }

      const propertiesWithImages: Property[] = await Promise.all(
        props.map(async (property: Record<string, unknown>) => {
          const { data: images } = await supabase
            .from("property_images")
            .select("image_url")
            .eq("property_id", property.id as number);

          return {
            ...property,
            imageUrl:
              images && images.length > 0
                ? images[0].image_url
                : "/img/no-image.png",
          } as Property;
        })
      );

      setProperties(propertiesWithImages);
    };

    fetchProperties();
  }, []);

  return (
    <section id="properties" className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          Nejnovější nemovitosti
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              Žádné nemovitosti nebyly nalezeny.
            </div>
          ) : (
            properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded shadow hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {property.title}
                  </h3>
                  <p className="text-gray-500">{property.city}</p>
                  <p className="text-gray-700 font-bold mt-2">
                    {property.price} Kč
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}