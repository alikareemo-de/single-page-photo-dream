
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  title: string;
  subtitle: string;
}

const Banner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const slides: BannerSlide[] = [
    {
      title: "Home",
      subtitle: "Carousel"
    },
    {
      title: "Find Your Dream",
      subtitle: "Vacation Home"
    },
    {
      title: "Explore Nature",
      subtitle: "Eco-Friendly Stays"
    }
  ];
  
  const totalSlides = slides.length;
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeSlide]);
  
  const goToSlide = (index: number) => {
    setIsAnimating(true);
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const nextSlide = () => {
    const next = (activeSlide + 1) % totalSlides;
    goToSlide(next);
  };
  
  const prevSlide = () => {
    const prev = (activeSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  };

  return (
    <div className="relative w-full h-[450px] bg-gradient-to-r from-[#e6e9f0] to-[#eef1f5] overflow-hidden">
      {/* Background diagonal lines */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full border-b border-gray-300">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full border-r border-gray-300 transform rotate-45 origin-top-left"></div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full border-b border-gray-300">
          <div className="absolute top-0 right-0 w-full h-full">
            <div className="absolute top-0 right-0 w-full h-full border-l border-gray-300 transform -rotate-45 origin-top-right"></div>
          </div>
        </div>
      </div>

      {/* Slide content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md">
            <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <h1 className="text-5xl font-medium text-gray-700">{slides[activeSlide].title}</h1>
              <h2 className="text-4xl font-normal text-gray-600 mt-2">{slides[activeSlide].subtitle}</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Now button */}
      <div className="absolute bottom-16 right-12 md:right-24">
        <Button className="bg-gray-600 hover:bg-gray-700 text-white text-xl py-6 px-8 rounded">
          Booking Now
        </Button>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeSlide ? 'bg-gray-800 scale-125' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows - hidden on mobile */}
      <div className="hidden md:block">
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
