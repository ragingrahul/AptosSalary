"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { ShimmerButton } from "./ShimmerButton";
import { CiCircleChevDown } from "react-icons/ci";
import { MdArrowCircleDown } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 w-full px-8 py-6 z-50", className)}
    >

      <div className="flex justify-between items-center w-full">
        <img 
            src="/logo.png"
            alt="logo"
            className="w-[180px] h-[30px]"
        />
        <ShimmerButton 
            title="Connect"
            icon={<IoIosArrowDropdown />}
            position="right"
            handleClick={() => alert("Clicked!")}
        />
      </div>
    </div>
  );
}
