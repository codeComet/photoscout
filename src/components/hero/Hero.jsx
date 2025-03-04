import ImageTrail from "@/components/ImageTrail/ImageTrail";
import Aurora from "./Aurora/Aurora";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="h-screen relative overflow-hidden">
      <Aurora />
      {/* <ImageTrail /> */}

      <div className="container text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h1 className="text-7xl font-open_sans font-bold">
          Welcome to PhotoScout
        </h1>
        <p className="mt-5 text-2xl font-semibold text-center leading-8 w-[70%] mx-auto">
          Search millions of high-quality images from Unsplash, Pexels, Pixabay,
          and more - all in one place
        </p>
        <div className="flex items-center justify-center gap-5 mt-8">
          <Link href="/get-started">
            <Button className="bg-white hover:bg-green-600 text-black hover:text-slate-50 px-8 py-6 text-lg font-semibold">
              Get Started
            </Button>
          </Link>
          <Link href="/#faq">
            <Button className="bg-transparent hover:bg-transparent text-slate-50 hover:text-slate-50 px-8 py-6 text-lg font-semibold">
              Learn More <ArrowRight size={36} className="ml-2 font-semibold" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
