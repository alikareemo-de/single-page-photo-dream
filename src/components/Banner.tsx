
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";

interface BannerSlide {
  title: string;
  subtitle: string;
  cta: string;
}

const Banner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const slides: BannerSlide[] = [
    {
      title: "Discover Paradise",
      subtitle: "Unforgettable destinations await your arrival",
      cta: "Explore Now"
    },
    {
      title: "Adventure Awaits",
      subtitle: "Find your perfect vacation getaway",
      cta: "Book a Trip"
    },
    {
      title: "Explore Nature",
      subtitle: "Eco-Friendly stays that protect our planet",
      cta: "Go Green"
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
    <div className="relative w-full h-[550px] bg-gradient-to-r from-tourism-ocean to-tourism-teal overflow-hidden">
      {/* Animated background dots pattern */}
      <div className="absolute inset-0 w-full h-full opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Overlaid diagonal lines */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-0 w-full h-full border-b border-white">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full border-r border-white transform rotate-45 origin-top-left"></div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full border-b border-white">
          <div className="absolute top-0 right-0 w-full h-full">
            <div className="absolute top-0 right-0 w-full h-full border-l border-white transform -rotate-45 origin-top-right"></div>
          </div>
        </div>
      </div>

      {/* Circular decoration */}
      <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full border-8 border-white/10"></div>
      <div className="absolute -left-20 bottom-0 w-64 h-64 rounded-full border-4 border-white/10"></div>

      {/* Slide content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md md:max-w-lg">
            <div className={`transition-all duration-500 transform ${isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
              <div className="flex items-center mb-3">
                <Compass className="text-white mr-2" size={28} />
                <span className="text-white bg-white/20 px-3 py-1 rounded-full text-sm">Fantasia Tourism</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 text-shadow">{slides[activeSlide].title}</h1>
              <h2 className="text-2xl md:text-3xl font-light text-white/80 mt-2 mb-8">{slides[activeSlide].subtitle}</h2>
              <Button className="tourism-btn bg-white hover:bg-tourism-sunset text-tourism-ocean hover:text-white text-lg py-6 px-8">
                {slides[activeSlide].cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeSlide ? 'bg-white scale-125 w-8' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows - hidden on mobile */}
      <div className="hidden md:block">
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
