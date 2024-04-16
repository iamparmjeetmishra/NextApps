"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";


function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
    className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50", className)}
  >
    <Menu setActive={setActive}>
      <Link href='/'>
          <MenuItem setActive={setActive} active={active} item="Home" />
      </Link>
      <MenuItem setActive={setActive} active={active} item="Our Courses">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/courses">All Courses</HoveredLink>
          <HoveredLink href="/musictheory">Basic Music Theory</HoveredLink>
          <HoveredLink href="/advancedcomposition">Advanced Composition</HoveredLink>
          <HoveredLink href="/songwriting">Songwriting</HoveredLink>
          <HoveredLink href="/Musci Production">Music Production</HoveredLink>
        </div>
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="Contact">
      </MenuItem>
    </Menu>
  </div>
  )
}

export default Navbar