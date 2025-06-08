import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import PropertyList from "@/components/PropertyList";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-10 flex justify-center bg-white">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="w-32 h-auto object-contain"
          />
        </section>
        <AboutSection />
        <PropertyList />
      </main>
      <Footer />
    </div>
  );
}
