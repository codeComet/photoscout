"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import UserImg from "./UserImg";
import { ApiAddDialogue } from "../dialogues/ApiAddDialogue";
import ApiDeleteDialogue from "../dialogues/ApiDeleteDialogue";

const AuthenticatedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAddDialogue, setShowAddDialogue] = useState(false);
  const [clearApiDialogue, setClearApiDialogue] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled
          ? "bg-[#0000001f] backdrop-blur-md border-[#0F1818] border-b-0"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[93px]">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              PhotoScout
            </Link>
          </div>

          <div className="hidden md:block">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <UserImg />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onSelect={() => setShowAddDialogue(true)}>
                    Add/Update API key
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    className="text-rose-600"
                    onSelect={() => setClearApiDialogue(true)}
                  >
                    Clear Keys
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <ApiAddDialogue
              open={showAddDialogue}
              onOpenChange={setShowAddDialogue}
            />
            <ApiDeleteDialogue
              open={clearApiDialogue}
              onOpenChange={setClearApiDialogue}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthenticatedNavbar;
