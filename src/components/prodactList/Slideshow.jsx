import React, { useEffect, useState } from 'react';

const Slideshow = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  return (
    <div className="relative h-[580px] overflow-hidden rounded-2xl">
      {mediaItems.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
        >
          {item.type === 'image' ? (
            <img src={item.file} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          ) : (
            <video src={item.file} autoPlay loop muted className="w-full h-full object-cover" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
