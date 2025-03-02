"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAnimate, stagger, motion } from "framer-motion";

const menu = [
  { id: 2, title: "Features", url: "#features" },
  { id: 3, title: "FAQs", url: "#faq" },
  { id: 4, title: "Newsletter", url: "#newsletter" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [scope, animate] = useAnimate();
  const staggerMenuItems = stagger(0.1, { startDelay: 0.25 });

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;

    animate(
      ".mobile-menu",
      {
        height: isOpen ? "calc(100vh - 93px)" : 0,
        opacity: isOpen ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      }
    );

    animate(
      ".menu-item",
      isOpen
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 0.3, y: 50 },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );

    animate(
      ".order-button",
      isOpen
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 0.3, y: 50 },
      {
        duration: 0.2,
        delay: isOpen ? menu.length * 0.1 + 0.2 : 0,
      }
    );
  }, [isOpen, animate, mounted]);

  return (
    <nav
      ref={scope}
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
            <div className="ml-10 flex items-baseline space-x-4">
              {menu.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`px-6 py-3 rounded-none text-md font-bold leading-[14.72px] ${
                    pathname === item.url
                      ? "text-white relative active-link"
                      : "text-white hover:text-white"
                  } flex justify-center items-center`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Link href="/get-started">
              <button className="bg-transparent hover:bg-green-600 text-secondary hover:text-white px-6 py-[9px] rounded-full border border-secondary hover:border-none text-md font-medium">
                Get Started
              </button>
            </Link>
          </div>
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu/>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu md:hidden bg-primary overflow-hidden ${
          !mounted ? "h-0 opacity-0" : ""
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center h-full flex flex-col items-center justify-center">
            {menu.map((item) => (
              <div
                key={item.id}
                className="menu-item opacity-0 scale-75 translate-y-12"
              >
                <Link
                  href={item.url}
                  className={`block px-3 py-8 border-none font-bold text-3xl leading-8 bg-primary ${
                    pathname === item.url
                      ? "text-[#64CC1F] relative active-link-mbl"
                      : "text-[#999D95] hover:text-white"
                  }`}
                  style={{ fontFamily: "League Spartan, sans-serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="py-6 px-5 order-button opacity-0 scale-75 translate-y-12">
            <Link href="/get-started">
              <button className="bg-transparent hover:bg-secondary text-secondary px-6 py-[9px] rounded-full border border-secondary text-sm font-medium w-full">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
