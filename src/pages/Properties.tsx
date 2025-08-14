
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Map, Star, Calendar, Plus } from 'lucide-react';
import AddProperty from '@/components/AddProperty';

interface PropertyItemProps {
  title: string;
  location: string;
  dates: string;
  price: number;
  image?: string;
  rating?: number;
}

const PropertyItem: React.FC<PropertyItemProps> = ({ 
  title, 
  location, 
  dates, 
  price, 
  image,
  rating = 4.5
}) => {
  return (
    <Card className="tourism-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto relative bg-tourism-light-blue">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Map size={40} className="text-tourism-teal" />
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/80 rounded-md px-2 py-1 flex items-center">
            <Star className="h-4 w-4 text-tourism-sunset fill-tourism-sunset mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="p-4 md:p-6 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl text-tourism-ocean">{title}</h3>
              <div className="flex items-center mt-1 mb-2">
                <Map className="h-4 w-4 text-gray-500 mr-1" />
                <p className="text-sm text-gray-500">{location}</p>
              </div>
            </div>
            <Button variant="ghost" className="p-2 hover:bg-tourism-light-blue/30">
              <Heart className="h-5 w-5 text-tourism-coral" />
            </Button>
          </div>
          
          <div className="flex items-center mt-1 mb-3">
            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
            <p className="text-sm text-gray-500">{dates}</p>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-xs bg-tourism-light-blue/50 text-tourism-ocean px-2 py-0.5 rounded-md">
              WiFi
            </span>
            <span className="text-xs bg-tourism-light-blue/50 text-tourism-ocean px-2 py-0.5 rounded-md">
              Pool
            </span>
            <span className="text-xs bg-tourism-light-blue/50 text-tourism-ocean px-2 py-0.5 rounded-md">
              Kitchen
            </span>
          </div>
          
          <div className="flex justify-between items-end mt-auto">
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="font-bold text-lg text-tourism-ocean">${price}</p>
            </div>
            
            <div className="space-x-2">
              <Button variant="outline" className="text-sm border-tourism-teal text-tourism-teal hover:bg-tourism-light-blue/30">
                View Details
              </Button>
              <Button className="text-sm tourism-btn">
                Manage Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Properties = () => {
  const [showAddProperty, setShowAddProperty] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-heading">My Properties</h1>
          <Button 
            onClick={() => setShowAddProperty(!showAddProperty)}
            className="tourism-btn flex items-center gap-2"
          >
            <Plus size={20} />
            {showAddProperty ? 'Cancel' : 'Add Property'}
          </Button>
        </div>

        {showAddProperty && (
          <div className="mb-8">
            <AddProperty />
          </div>
        )}
        
        <Tabs defaultValue="upcoming" className="mb-6">
          <TabsList className="bg-tourism-light-blue/30 p-1">
            <TabsTrigger 
              value="upcoming"
              className="data-[state=active]:bg-tourism-teal data-[state=active]:text-white"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className="data-[state=active]:bg-tourism-teal data-[state=active]:text-white"
            >
              Past Stays
            </TabsTrigger>
            <TabsTrigger 
              value="saved"
              className="data-[state=active]:bg-tourism-teal data-[state=active]:text-white"
            >
              Saved
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6 space-y-6">
            <PropertyItem 
              title="Luxury Beachfront Villa" 
              location="Cancun, Mexico" 
              dates="Jun 15 - Jun 22, 2025" 
              price={1299}
              image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&w=600&h=300"
            />
            
            <PropertyItem 
              title="Mountain View Cabin" 
              location="Aspen, USA" 
              dates="Jul 3 - Jul 10, 2025" 
              price={899}
              image="https://images.unsplash.com/photo-1605602626286-73df568d9f8c?auto=format&w=600&h=300" 
            />
          </TabsContent>
          
          <TabsContent value="past" className="mt-6 space-y-6">
            <PropertyItem 
              title="City Center Apartment" 
              location="Paris, France" 
              dates="Mar 5 - Mar 12, 2025" 
              price={1050}
              image="https://images.unsplash.com/photo-1529408632839-a54952c491e5?auto=format&w=600&h=300"
            />
          </TabsContent>
          
          <TabsContent value="saved" className="mt-6 space-y-6">
            <PropertyItem 
              title="Luxury Ocean View Suite" 
              location="Santorini, Greece" 
              dates="Not booked yet" 
              price={1499}
              image="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&w=600&h=300"
            />
            
            <PropertyItem 
              title="Tropical Paradise Villa" 
              location="Bali, Indonesia" 
              dates="Not booked yet" 
              price={799}
              image="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&w=600&h=300"
            />
            
            <PropertyItem 
              title="Historic Downtown Loft" 
              location="Rome, Italy" 
              dates="Not booked yet" 
              price={950}
              image="https://images.unsplash.com/photo-1622866306950-81d17097d458?auto=format&w=600&h=300"
            />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
