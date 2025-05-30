
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { User, MapPin, Mail, Phone, Calendar, Edit } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold gradient-heading mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="tourism-card overflow-hidden">
              <div className="bg-gradient-to-r from-tourism-ocean to-tourism-teal p-6 flex flex-col items-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
                  <User className="h-16 w-16 text-tourism-ocean" />
                </div>
                <h2 className="text-xl font-semibold text-white">John Smith</h2>
                <p className="text-white/80 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  New York, USA
                </p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-medium mb-2 text-tourism-ocean">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span>john.smith@example.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-tourism-ocean">Account Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-500 mr-2" />
                      <span>Member since 2023</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span>15 trips completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="tourism-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-tourism-ocean">Personal Information</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-1 border-tourism-teal text-tourism-teal hover:bg-tourism-light-blue/50">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700">First Name</label>
                  <Input value="John" disabled className="bg-tourism-light-blue/20" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700">Last Name</label>
                  <Input value="Smith" disabled className="bg-tourism-light-blue/20" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700">Email</label>
                  <Input value="john.smith@example.com" disabled className="bg-tourism-light-blue/20" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700">Phone</label>
                  <Input value="+1 (555) 123-4567" disabled className="bg-tourism-light-blue/20" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700">Date of Birth</label>
                  <Input value="1985-06-15" type="date" disabled className="bg-tourism-light-blue/20" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1 text-gray-700">Nationality</label>
                  <Input value="United States" disabled className="bg-tourism-light-blue/20" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium block mb-1 text-gray-700">Address</label>
                <Input value="123 Broadway, Apt 4B" disabled className="bg-tourism-light-blue/20" />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1 text-gray-700">Bio</label>
                <Textarea 
                  disabled 
                  value="Avid traveler with a passion for experiencing new cultures. I've visited 20+ countries across 5 continents. Always looking for my next adventure!"
                  className="bg-tourism-light-blue/20 h-24"
                />
              </div>
            </Card>
            
            <Card className="tourism-card p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-tourism-ocean">Travel Preferences</h2>
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-tourism-light-blue/30 rounded-lg p-3 text-center">
                  <span className="block text-sm font-medium text-tourism-ocean">Preferred Climate</span>
                  <span className="text-gray-600">Tropical</span>
                </div>
                <div className="bg-tourism-light-blue/30 rounded-lg p-3 text-center">
                  <span className="block text-sm font-medium text-tourism-ocean">Travel Style</span>
                  <span className="text-gray-600">Luxury</span>
                </div>
                <div className="bg-tourism-light-blue/30 rounded-lg p-3 text-center">
                  <span className="block text-sm font-medium text-tourism-ocean">Accommodation</span>
                  <span className="text-gray-600">Resort</span>
                </div>
                <div className="bg-tourism-light-blue/30 rounded-lg p-3 text-center">
                  <span className="block text-sm font-medium text-tourism-ocean">Travel With</span>
                  <span className="text-gray-600">Family</span>
                </div>
                <div className="bg-tourism-light-blue/30 rounded-lg p-3 text-center">
                  <span className="block text-sm font-medium text-tourism-ocean">Activities</span>
                  <span className="text-gray-600">Beach, Hiking</span>
                </div>
                <div className="bg-tourism-light-blue/30 rounded-lg p-3 text-center">
                  <span className="block text-sm font-medium text-tourism-ocean">Budget</span>
                  <span className="text-gray-600">$1000-3000</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
