import React, { useState, useRef, useEffect } from "react";
import "./style.css";
const ProductViewerUsingImage = ({ images }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameCount = images.length;
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const sensitivity = 5;

  useEffect(() => {
    const preloadImages = () => {
      let loadedImages = 0;
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            setImagesLoaded(true);
          }
        };
      });
    };
    preloadImages();
  }, [images]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  /* Touch screen events */
  const handleTouchStart = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    e.preventDefault();
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  /* ---- */

  const handleMove = (currentPoint) => {
    if (isDragging.current) {
      currentX.current = currentPoint;
      const delta = currentX.current - startX.current;

      if (Math.abs(delta) >= sensitivity) {
        const frameChange = Math.floor(delta / sensitivity);
        const newFrameIndex =
          (frameIndex + frameChange + frameCount) % frameCount;
        setFrameIndex(newFrameIndex);
        startX.current = currentX.current;
      }
    }
  };

  if (!imagesLoaded) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div
        className="viewer-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[frameIndex % frameCount]}
          alt="Product View"
          className="viewer-image "
        />
      </div>
    </div>
  );
};

export default function ProductViewer() {
  const images = new Array(74)
    .fill(0)
    .map(
      (_, i) =>
        `https://fastly-production.24c.in/webin/360/output_${i + 1}.jpeg`
    );

  return <ProductViewerUsingImage images={images} />;
}
