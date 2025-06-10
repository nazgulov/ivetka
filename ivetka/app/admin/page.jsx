'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminPage() {
  const [form, setForm] = useState({
    title: '',
    city: '',
    size: '',
    price: '',
    status: '',
    matterportUrl: '',
    description: '',
    mapUrl: '',
    images: [],
  });

  const [properties, setProperties] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data: props, error } = await supabase.from('properties').select('*');

      if (error) {
        console.error('Chyba při načítání nemovitostí:', error.message);
        return;
      }

      const propertiesWithImages = await Promise.all(
        props.map(async (property) => {
          const { data: images } = await supabase
            .from('property_images')
            .select('image_url')
            .eq('property_id', property.id);

          return {
            ...property,
            imagePreviews: images?.map((img) => img.image_url) || [],
          };
        })
      );

      setProperties(propertiesWithImages);
    };

    fetchProperties();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const uploadImagesToSupabase = async (propertyId, files) => {
    const uploadedUrls = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('property-gallery')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from('property-gallery')
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData?.publicUrl;
      if (imageUrl) {
        uploadedUrls.push(imageUrl);

        await supabase.from('property_images').insert([
          {
            property_id: propertyId,
            image_url: imageUrl,
          },
        ]);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // EDITACE
      const property = properties[editIndex];
      const { error } = await supabase.from('properties').update({
        title: form.title,
        city: form.city,
        size: form.size,
        price: form.price,
        status: form.status,
        matterport_url: form.matterportUrl,
        description: form.description,
        map_url: form.mapUrl,
      }).eq('id', property.id);

      let uploadedImages = property.imagePreviews || [];
      if (form.images.length > 0) {
        uploadedImages = [
          ...uploadedImages,
          ...(await uploadImagesToSupabase(property.id, form.images)),
        ];
      }

      if (!error) {
        const updated = { ...property, ...form, imagePreviews: uploadedImages };
        setProperties(properties.map((p, i) => (i === editIndex ? updated : p)));
        setEditIndex(null);
        setForm({
          title: '',
          city: '',
          size: '',
          price: '',
          status: '',
          matterportUrl: '',
          description: '',
          mapUrl: '',
          images: [],
        });
        setImagePreviews([]);
      } else {
        alert('Chyba při úpravě nemovitosti');
      }
      return;
    }

    // NOVÁ NEMOVITOST
    const { data: newProperty, error } = await supabase.from('properties').insert([
      {
        title: form.title,
        city: form.city,
        size: form.size,
        price: form.price,
        status: form.status,
        matterport_url: form.matterportUrl,
        description: form.description,
        map_url: form.mapUrl,
      },
    ]).select().single();

    if (error) {
      console.error('Chyba při ukládání nemovitosti:', error.message);
      return;
    }

    let uploadedImages = [];
    if (form.images.length > 0) {
      uploadedImages = await uploadImagesToSupabase(newProperty.id, form.images);
    }

    setForm({
      title: '',
      city: '',
      size: '',
      price: '',
      status: '',
      matterportUrl: '',
      description: '',
      mapUrl: '',
      images: [],
    });
    setImagePreviews([]);
    setProperties([...properties, { ...newProperty, imagePreviews: uploadedImages }]);
  };

  // SMAZÁNÍ
  const handleDelete = async (propertyId) => {
    if (!window.confirm('Opravdu chcete smazat tuto nemovitost?')) return;
    const { error } = await supabase.from('properties').delete().eq('id', propertyId);
    if (!error) {
      setProperties(properties.filter((p) => p.id !== propertyId));
    } else {
      alert('Chyba při mazání nemovitosti');
    }
  };

  // EDITACE
  const handleEdit = (property, index) => {
    setEditIndex(index);
    setForm({
      title: property.title || '',
      city: property.city || '',
      size: property.size || '',
      price: property.price || '',
      status: property.status || '',
      matterportUrl: property.matterport_url || '',
      description: property.description || '',
      mapUrl: property.map_url || '',
      images: [],
    });
    setImagePreviews(property.imagePreviews || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin – Přidání nemovitosti</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="title" placeholder="Název" value={form.title} onChange={handleChange} className="border rounded-lg p-3" />
          <input name="city" placeholder="Město" value={form.city} onChange={handleChange} className="border rounded-lg p-3" />
          <input name="size" placeholder="Velikost" value={form.size} onChange={handleChange} className="border rounded-lg p-3" />
          <input name="price" placeholder="Cena" value={form.price} onChange={handleChange} className="border rounded-lg p-3" />
          <input name="status" placeholder="Status" value={form.status} onChange={handleChange} className="border rounded-lg p-3" />
          <input name="matterportUrl" placeholder="Matterport URL" value={form.matterportUrl} onChange={handleChange} className="border rounded-lg p-3" />
          <textarea name="description" placeholder="Popis" value={form.description} onChange={handleChange} className="border rounded-lg p-3 h-24 resize-none" />
          <input name="mapUrl" placeholder="Mapa (iframe HTML)" value={form.mapUrl} onChange={handleChange} className="border rounded-lg p-3" />

          <div>
            <label className="block text-sm font-medium mb-1">Obrázky</label>
            <div className="relative w-full">
              <input
                type="file"
                accept="image/*"
                multiple
                id="file-upload"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer block w-full border rounded-lg p-3 bg-white text-center text-black hover:bg-gray-100"
              >
                {form.images.length > 0
                  ? `${form.images.length} souborů vybráno`
                  : 'Klikněte pro výběr obrázků'}
              </label>
            </div>
          </div>

          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt={`náhled-${i}`} className="w-20 h-20 object-cover rounded-lg" />
              ))}
            </div>
          )}

          <button type="submit" className="bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition">
            {editIndex !== null ? 'Potvrdit úpravy' : 'Uložit nemovitost'}
          </button>
        </form>
      </div>

      {properties.length > 0 && (
        <div className="mt-10 w-full max-w-3xl bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Seznam nemovitostí</h2>
          <ul className="space-y-4">
            {properties.map((prop, index) => (
              <li key={prop.id || index} className="border-b pb-4">
                <p><strong>{prop.title}</strong> – {prop.city}, {prop.size} m², {prop.price} Kč</p>
                <p>Status: {prop.status}</p>
                <p className="text-sm text-gray-600">{prop.description}</p>
                {prop.imagePreviews?.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {prop.imagePreviews.map((src, i) => (
                      <img key={i} src={src} alt={`img-${i}`} className="w-16 h-16 object-cover rounded" />
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
                    onClick={() => handleEdit(prop, index)}
                  >
                    Upravit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(prop.id)}
                  >
                    Smazat
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}