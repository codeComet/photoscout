"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const imageUrls = [
  "https://picsum.photos/id/287/300/300",
  "https://picsum.photos/id/1001/300/300",
  "https://picsum.photos/id/1025/300/300",
  "https://picsum.photos/id/1026/300/300",
  "https://picsum.photos/id/1027/300/300",
  "https://picsum.photos/id/1028/300/300",
  "https://picsum.photos/id/1029/300/300",
];

export default function ImageTrail() {
  const [isClient, setIsClient] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const trailRefs = useRef([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const [trailImages, setTrailImages] = useState([...imageUrls]);

  useEffect(() => {
    setIsClient(true);

    const onMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      setIsMoving(true);

      // Reset timeout to detect when movement stops
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 200);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (isMoving) {
      const animateTrail = () => {
        trailRefs.current.forEach((el, index) => {
          if (el) {
            gsap.to(el, {
              duration: 0.5,
              x: cursorRef.current.x,  // All images move to cursor position
              y: cursorRef.current.y,
              scale: 1,
              ease: "power2.out",
              delay: index * 0.05,
            });
          }
        });
        animationRef.current = requestAnimationFrame(animateTrail);
      };
      animateTrail();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      trailRefs.current.forEach((el) => {
        if (el) {
          gsap.to(el, {
            duration: 0.3,
            scale: 0,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isMoving]);

  useEffect(() => {
    const changeRandomImage = () => {
      if (isMoving) {
        setTrailImages((prevImages) => {
          const newImages = [...prevImages];
          // Only update the first image
          newImages[0] = imageUrls[Math.floor(Math.random() * imageUrls.length)];
          return newImages;
        });
      }
    };

    const intervalId = setInterval(changeRandomImage, 100);

    return () => clearInterval(intervalId);
  }, [isMoving]);

  if (!isClient) return null;
  console.log(isMoving);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {trailImages.map((src, index) => (
        <div
          key={index}
          ref={(el) => (trailRefs.current[index] = el)}
          className="absolute"
          style={{
            transform: `scale(0)`,
            zIndex: trailImages.length - index,
          }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Trail image ${index + 1}`}
            width={200}
            height={200}
            className="w-[300px] h-[300px] rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
}
