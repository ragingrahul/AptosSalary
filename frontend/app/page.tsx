"use client";

import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { NavbarDemo } from "@/components/ui/NavBar";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectOrganization, selectRole } from "@/state/selectors";
import { useWallet } from "@aptos-labs/wallet-adapter-react";


export default function Home() {
  const dispatch = useAppDispatch()
  const {account, connected}=useWallet();
  const role =useAppSelector(selectRole);
  const org = useAppSelector(selectOrganization);
  const isEmployer = role === 'employer'

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
