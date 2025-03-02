import React from "react";
import { Button } from "../ui/button";
import { Cable, Download, Filter, Images } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";

const Features = () => {
  return (
    <section className="text-gray-400 body-font bg-gradient-to-b from-black to-[#0a0f18]" id="features">
      <motion.div // Animate when this value changes:
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-4 text-white">
              Why Choose Our Platform?
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Discover a world of stunning images with our platform. Search from
              a vast collection of high-quality images, access images from
              various platforms in one unified search, and download images in
              your preferred size and format. Filter by size, orientation,
              color, quality and more.
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
              <div className="mb-5">
                <Images size={40} color="white" />
              </div>
              <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                High Quality Images
              </h2>
              <p className="leading-relaxed text-base mb-4">
                Search from a vast collection of high-quality images
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
              <div className="mb-5">
                <Cable size={40} color="white" />
              </div>
              <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                Multiple Sources
              </h2>
              <p className="leading-relaxed text-base mb-4">
                Access images from various platforms in one unified search
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
              <div className="mb-5">
                <Download size={40} color="white" />
              </div>
              <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                Easy Downloads
              </h2>
              <p className="leading-relaxed text-base mb-4">
                Download images in your preferred size and format
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
              <div className="mb-5">
                <Filter size={40} color="white" />
              </div>
              <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                Advanced Filters
              </h2>
              <p className="leading-relaxed text-base mb-4">
                Filter by size, orientation, color, quality and more
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-20">
            <Link href="/get-started">
              <Button className=" bg-white hover:bg-green-600 text-black hover:text-slate-50 px-6 py-5 text-lg font-semibold">
                Let's Start
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
