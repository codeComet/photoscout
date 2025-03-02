import React from "react";
import MasonryGallery from "@/components/Masonry/Masonry";
import { Skeleton } from "@/components/ui/skeleton";

const Result = ({ images, loading }) => {

  return (
    <div className="p-4">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-[300px] rounded-xl" />
          ))}
        </div>
      ) : (
        <MasonryGallery images={images} />
      )}

    </div>
  );
};

export default Result;
