
import React from 'react';
import { Button } from "@/components/ui/button";

interface CityCardProps {
  title: string;
  count: number;
}

const CityCard: React.FC<CityCardProps> = ({ title, count }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-gray-300">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-400">City Image</div>
      </div>
      <div className="p-3 flex justify-between items-center bg-white">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{count} listings</p>
        </div>
        <Button variant="ghost" size="sm" className="text-sm">
          Explore
        </Button>
      </div>
    </div>
  );
};

const CitiesSection: React.FC = () => {
  const cities = [
    { title: "New York", count: 225 },
    { title: "Los Angeles", count: 198 },
    { title: "Chicago", count: 175 },
    { title: "Miami", count: 154 },
    { title: "San Francisco", count: 142 }
  ];

  return (
    <div className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 md:mb-0">Most Visited Cities</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cities.map((city, index) => (
            <CityCard key={index} title={city.title} count={city.count} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitiesSection;
