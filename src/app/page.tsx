"use client";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar token={null} />
      <Hero />
      <Footer />
    </main>
  );
}