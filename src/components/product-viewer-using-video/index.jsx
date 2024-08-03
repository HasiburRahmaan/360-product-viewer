import React, { useRef, useState, useEffect } from "react";
import video from "../../assets/video.mp4";

const ProductViewer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastXRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging && videoRef.current && containerRef.current) {
      const video = videoRef.current;
      const container = containerRef.current;
      const movement = e.clientX - lastXRef.current;
      const containerWidth = container.offsetWidth;

      // Calculate the time change based on movement
      const timeChange = (movement / containerWidth) * video.duration;

      // Update video time
      video.currentTime =
        (video.currentTime - timeChange + video.duration) % video.duration;

      lastXRef.current = e.clientX;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      style={{ width: "100%", position: "relative", cursor: "grab" }}
    >
      <video
        ref={videoRef}
        src={video}
        loop
        muted
        playsInline
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );
};

export default ProductViewer;
