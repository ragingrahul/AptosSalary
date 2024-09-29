"use client";

import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { Menu } from "@/components/ui/FloatingNav";
import { NavbarDemo } from "@/components/ui/NavBar";
import { navItems } from "@/data";
import Image from "next/image";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
   <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
    <div className="max-w-7xl w-full">
     <NavbarDemo />
     <Hero />
     <Grid />
     <Footer />
    </div>
   </main>
  );
}
