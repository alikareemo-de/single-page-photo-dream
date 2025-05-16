
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface PropertyCardProps {
  title: string;
  location: string;
  price: number;
  id: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ title, location, price, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-gray-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-400">Property Image</div>
      </div>
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-sm">
            <span className="font-medium">Price Per Night</span><br />
            <span className="font-bold">${price}</span>
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              More Details
            </Button>
            <button 
              onClick={toggleFavorite} 
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Heart 
                className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OffersSection: React.FC = () => {
  const properties = [
    { id: 1, title: "Luxury Villa", location: "Miami / USA", price: 299 },
    { id: 2, title: "Beach House", location: "Barcelona / Spain", price: 199 },
    { id: 3, title: "Downtown Loft", location: "New York / USA", price: 249 },
    { id: 4, title: "Mountain Cabin", location: "Aspen / USA", price: 179 },
    { id: 5, title: "Modern Apartment", location: "London / UK", price: 159 },
    { id: 6, title: "Historic Townhouse", location: "Boston / USA", price: 219 },
    { id: 7, title: "Seaside Cottage", location: "Cape Cod / USA", price: 189 },
    { id: 8, title: "City View Penthouse", location: "Chicago / USA", price: 279 }
  ];

  return (
    <div className="py-12 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 relative inline-block">
            Offers
            <div className="absolute -left-16 right-full top-1/2 h-px bg-gray-300 transform -translate-y-1/2"></div>
            <div className="absolute -right-16 left-full top-1/2 h-px bg-gray-300 transform -translate-y-1/2"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              location={property.location}
              price={property.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
