"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

const MasonryGallery = ({ images }) => {
  const [renderedImages, setRenderedImages] = useState([]);

  useEffect(() => {
    const normalizedImages = images.map((image) => ({
      src: normalizeThumbSource(image),
      download: normalizeFullSource(image),
      alt: image.alt || "Image",
      width: 300,
      height: 300,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEyNzA5Ly0wPjQ2OEE6NT9FRWJJPC9ZXldkaW1ubm5GR2dxdmdmcWb/2wBDARUXFx4aHR4eHWZQOkBmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    }));

    setRenderedImages(normalizedImages);
  }, [images]);

  const normalizeThumbSource = (image) => {
    if (typeof image === 'string') return image;
    if (image.thumb || image.full) return image.thumb;
    if (image.src) return image.src.regular || image.src.large;
    return "https://placehold.co/300x500";
  };

  const normalizeFullSource = (image) => {
    if (typeof image === 'string') return image;
    if (image.unsplashDownloadUrl) return image.unsplashDownloadUrl;
    if(image.pexelsDownloadUrl) return image.pexelsDownloadUrl;
    if(image.pixabayDownloadUrl) return image.pixabayDownloadUrl;
    return "https://placehold.co/300x500";
  };

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {renderedImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4 relative"
          >
            <div className="relative w-full">
              <a href={image.download} target="_blank" rel="noopener noreferrer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={index < 4 ? undefined : 'lazy'}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  quality={75}
                  sizes="(max-width: 500px) 100vw,
                         (max-width: 700px) 50vw,
                         (max-width: 1100px) 33vw,
                         25vw"
                  onError={(e) => {
                    e.target.src = image.thumb || "https://placehold.co/300x500";
                  }}
                  priority={index < 4}
                />
              </a>
            </div>
          </motion.div>
        ))}
      </Masonry>
    </motion.div>
  );
};

export default MasonryGallery;
