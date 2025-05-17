
import React from 'react';
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

interface CityCardProps {
  title: string;
  count: number;
  image?: string;
}

const CityCard: React.FC<CityCardProps> = ({ title, count, image }) => {
  return (
    <div className="tourism-card hover-scale group">
      <div className="h-48 bg-tourism-light-blue relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Map size={40} className="text-tourism-teal" />
            <div className="text-tourism-ocean/70 absolute inset-0 flex items-center justify-center">Destination Image</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-white/80">{count} listings</p>
        </div>
      </div>
      <div className="p-3 flex justify-between items-center bg-white">
        <Button variant="ghost" size="sm" className="text-sm text-tourism-ocean hover:text-tourism-teal hover:bg-tourism-light-blue/30">
          Explore Destinations
        </Button>
      </div>
    </div>
  );
};

const CitiesSection: React.FC = () => {
  const cities = [
    { title: "New York", count: 225, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&w=500&h=250" },
    { title: "Los Angeles", count: 198, image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&w=500&h=250" },
    { title: "Chicago", count: 175, image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&w=500&h=250" },
    { title: "Miami", count: 154, image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&w=500&h=250" },
    { title: "San Francisco", count: 142, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&w=500&h=250" }
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-white to-tourism-light-blue/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="section-heading text-tourism-ocean">Popular Destinations</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cities.map((city, index) => (
            <CityCard key={index} title={city.title} count={city.count} image={city.image} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button className="tourism-btn">
            View All Destinations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CitiesSection;
