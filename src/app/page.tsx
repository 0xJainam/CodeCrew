import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
    </>
  );
}