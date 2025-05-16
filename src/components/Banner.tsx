
import React, { useState } from 'react';

const Banner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="relative w-full h-64 md:h-80 bg-app-gray overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-600">Banners Section</h2>
          <p className="text-gray-500 mt-2">Discover amazing properties</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === activeSlide ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
