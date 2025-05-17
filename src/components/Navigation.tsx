
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserRound, Settings, HomeIcon } from "lucide-react";
import RegisterModal from './RegisterModal';
import SignInModal from './SignInModal';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation: React.FC = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <nav className="w-full bg-white py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-8">
        <div className="font-bold text-xl italic text-gray-800">Fantasia Tourism</div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link>
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
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6b7d65]"
          />
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Select>
            <SelectTrigger className="w-[120px] bg-gray-100">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">UK</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[100px] bg-gray-100">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="la">Los Angeles</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[120px] bg-gray-100">
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
        <Button 
          variant="outline" 
          className="bg-gray-200 hover:bg-gray-300 text-sm h-9"
          onClick={() => setShowRegisterModal(true)}
        >
          Sign Up
        </Button>
        <Button 
          variant="outline" 
          className="bg-gray-300 hover:bg-gray-400 text-sm h-9"
          onClick={() => setShowSignInModal(true)}
        >
          Sign In
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300">
              <UserRound size={18} className="text-gray-600" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white shadow-md">
            <div className="flex items-center p-3 border-b">
              <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center mr-3">
                <UserRound size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium">User name</p>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
            </div>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/properties" className="cursor-pointer">Properties</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
      />
      
      <SignInModal
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)}
      />
    </nav>
  );
};

export default Navigation;
