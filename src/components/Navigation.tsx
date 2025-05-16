
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Navigation: React.FC = () => {
  return (
    <nav className="w-full bg-white py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-8">
        <div className="font-bold text-xl">Logo</div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-800 hover:text-gray-600">Home</a>
          <a href="#" className="text-gray-800 hover:text-gray-600">About Us</a>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 flex-1 max-w-xl justify-end md:justify-center">
        <div className="relative w-full max-w-md hidden md:flex">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search properties..." 
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">UK</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Prop Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="bg-gray-200 hover:bg-gray-300">Sign Up</Button>
        <Button variant="outline" className="bg-gray-300 hover:bg-gray-400">Sign In</Button>
        <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center">
          <span className="text-gray-600">👤</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
