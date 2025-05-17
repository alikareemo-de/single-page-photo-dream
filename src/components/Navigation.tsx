
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Settings, HomeIcon, Compass, Map } from "lucide-react";
import RegisterModal from './RegisterModal';
import SignInModal from './SignInModal';
import AuthNav from './AuthNav';

const Navigation: React.FC = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <nav className="w-full bg-white py-4 px-6 flex items-center justify-between shadow-md sticky top-0 z-20">
      <div className="flex items-center space-x-8">
        <div className="font-bold text-xl italic gradient-heading flex items-center gap-2">
          <Compass className="text-tourism-ocean" size={24} />
          <span>Fantasia Tourism</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-tourism-ocean hover:text-tourism-teal transition-colors flex items-center gap-1">
            <HomeIcon size={18} />
            <span>Home</span>
          </Link>
          <a href="#" className="text-tourism-ocean hover:text-tourism-teal transition-colors flex items-center gap-1">
            <Map size={18} />
            <span>Destinations</span>
          </a>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 flex-1 max-w-xl justify-end md:justify-center">
        <div className="relative w-full max-w-md hidden md:flex">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-tourism-teal" />
          </div>
          <input 
            type="text" 
            placeholder="Search destinations..." 
            className="pl-10 pr-4 py-2 w-full rounded-full border border-tourism-light-blue focus:outline-none focus:ring-2 focus:ring-tourism-teal"
          />
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Select>
            <SelectTrigger className="w-[120px] bg-tourism-light-blue/30 border-tourism-light-blue rounded-full">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">UK</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[100px] bg-tourism-light-blue/30 border-tourism-light-blue rounded-full">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[120px] bg-tourism-light-blue/30 border-tourism-light-blue rounded-full">
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
      
      <AuthNav />
    </nav>
  );
};

export default Navigation;
