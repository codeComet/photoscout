"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
import { motion } from "framer-motion";

const AuthenticatedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAddDialogue, setShowAddDialogue] = useState(false);
  const [clearApiDialogue, setClearApiDialogue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="flex items-center justify-between h-[70px] md:h-[93px]">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl md:text-2xl font-bold text-white">
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-white hover:text-gray-300 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <X className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="h-7 w-7" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-primary overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <button
            onClick={() => {
              setShowAddDialogue(true);
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-base font-medium text-white hover:bg-gray-800 rounded-md"
          >
            Add/Update API key
          </button>
          <button
            onClick={() => {
              setClearApiDialogue(true);
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-base font-medium text-rose-600 hover:bg-gray-800 rounded-md"
          >
            Clear Keys
          </button>
        </div>
      </div>

      <ApiAddDialogue
        open={showAddDialogue}
        onOpenChange={setShowAddDialogue}
      />
      <ApiDeleteDialogue
        open={clearApiDialogue}
        onOpenChange={setClearApiDialogue}
      />
    </nav>
  );
};

export default AuthenticatedNavbar;
