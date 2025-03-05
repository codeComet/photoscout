"use client";
import { useState, useEffect } from "react";
import ImageTrail from "@/components/ImageTrail/ImageTrail";
import Aurora from "./Aurora/Aurora";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [hasApiKey, setHasApiKey] = useState(false);

  const loadServices = () => {
    try {
      const services = JSON.parse(localStorage.getItem("services")) || [];
      if (services.length !== 0) {
        setHasApiKey(true);
        return;
      } else {
        setHasApiKey(false);
        return;
      }
    } catch (error) {
      console.error("Error loading services:", error);
      setHasApiKey(false);
    }
  };

  useEffect(() => {
    loadServices();
    // Listen for custom localStorage change event
    window.addEventListener("localStorageChange", loadServices);

    return () => {
      window.removeEventListener("localStorageChange", loadServices);
    };
  }, []);
  console.log(hasApiKey);

  return (
    <div className="h-screen relative overflow-hidden">
      <Aurora />
      <ImageTrail />

      <div className="container text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 px-4 sm:px-6">
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-open_sans font-bold">
          Welcome to PhotoScout
        </h1>
        <p className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-semibold text-center leading-7 sm:leading-8 w-full sm:w-[85%] md:w-[80%] lg:w-[70%] mx-auto">
          Search millions of high-quality images from Unsplash, Pexels, Pixabay,
          and more - all in one place
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-6 sm:mt-8">
          {!hasApiKey ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <Link href="/get-started">
                <Button className="bg-white hover:bg-green-600 text-black hover:text-slate-50 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/#faq">
                <Button className="bg-transparent hover:bg-transparent text-slate-50 hover:text-slate-50 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold">
                  Learn More{" "}
                  <ArrowRight size={24} className="ml-2 font-semibold sm:w-8 sm:h-8" />
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/search">
                <Button className="bg-white hover:bg-green-600 text-black hover:text-slate-50 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold">
                  Go To Search
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
