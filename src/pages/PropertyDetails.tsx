
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/SearchFilters';
import { ArrowLeft, Heart, MapPin } from "lucide-react";

interface PropertyDetailData {
  id: number;
  title: string;
  location: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
}

// Mock data - in a real app this would come from an API
const mockProperties: Record<string, PropertyDetailData> = {
  "1": {
    id: 1,
    title: "Luxury Villa",
    location: "Miami / USA",
    price: 299,
    description: "Experience the ultimate in luxury living with this stunning villa. Featuring panoramic ocean views, a private pool, and lush gardens, this property offers the perfect retreat for those seeking privacy and comfort.",
    features: ["4 Bedrooms", "3 Bathrooms", "Private Pool", "Ocean View", "Garden", "Parking", "Wi-Fi", "Air Conditioning"],
    images: ["villa1.jpg", "villa2.jpg", "villa3.jpg"]
  },
  "2": {
    id: 2,
    title: "Beach House",
    location: "Barcelona / Spain",
    price: 199,
    description: "Enjoy the Mediterranean lifestyle in this charming beach house. Just steps away from the golden sands, this property features a spacious terrace perfect for watching the sunset over the sea.",
    features: ["3 Bedrooms", "2 Bathrooms", "Terrace", "Sea View", "Beach Access", "Parking", "Wi-Fi", "Air Conditioning"],
    images: ["beach1.jpg", "beach2.jpg", "beach3.jpg"]
  },
  "3": {
    id: 3,
    title: "Downtown Loft",
    location: "New York / USA",
    price: 249,
    description: "Modern urban living at its finest in this spacious downtown loft. High ceilings, exposed brick, and floor-to-ceiling windows offer a stylish space in the heart of the city.",
    features: ["2 Bedrooms", "2 Bathrooms", "Open Plan", "City View", "Gym Access", "Security", "Wi-Fi", "Heating"],
    images: ["loft1.jpg", "loft2.jpg", "loft3.jpg"]
  },
  "4": {
    id: 4,
    title: "Mountain Cabin",
    location: "Aspen / USA",
    price: 179,
    description: "Escape to the mountains in this cozy cabin. Surrounded by nature yet equipped with modern amenities, it's the perfect base for outdoor adventures or peaceful retreats.",
    features: ["3 Bedrooms", "1 Bathroom", "Fireplace", "Mountain View", "Hiking Trails", "Parking", "Wi-Fi", "Heating"],
    images: ["cabin1.jpg", "cabin2.jpg", "cabin3.jpg"]
  },
  "5": {
    id: 5,
    title: "Modern Apartment",
    location: "London / UK",
    price: 159,
    description: "Contemporary living in this sleek apartment in a prime London location. Elegant design meets functionality with high-end finishes and smart home features.",
    features: ["1 Bedroom", "1 Bathroom", "Balcony", "City View", "Concierge", "Security", "Wi-Fi", "Heating"],
    images: ["apartment1.jpg", "apartment2.jpg", "apartment3.jpg"]
  },
  "6": {
    id: 6,
    title: "Historic Townhouse",
    location: "Boston / USA",
    price: 219,
    description: "Step back in time with this beautifully preserved historic townhouse. Original features blend seamlessly with modern updates for comfortable contemporary living.",
    features: ["4 Bedrooms", "2.5 Bathrooms", "Garden", "Period Features", "Central Location", "Parking", "Wi-Fi", "Heating"],
    images: ["townhouse1.jpg", "townhouse2.jpg", "townhouse3.jpg"]
  },
  "7": {
    id: 7,
    title: "Seaside Cottage",
    location: "Cape Cod / USA",
    price: 189,
    description: "Charming seaside cottage with character and comfort. Wake up to the sound of waves and enjoy easy access to sandy beaches and coastal walks.",
    features: ["2 Bedrooms", "1 Bathroom", "Porch", "Sea View", "Beach Access", "Parking", "Wi-Fi", "Air Conditioning"],
    images: ["cottage1.jpg", "cottage2.jpg", "cottage3.jpg"]
  },
  "8": {
    id: 8,
    title: "City View Penthouse",
    location: "Chicago / USA",
    price: 279,
    description: "Luxury penthouse offering spectacular city views. Floor-to-ceiling windows, premium finishes, and an expansive terrace make this the ultimate urban retreat.",
    features: ["3 Bedrooms", "3 Bathrooms", "Terrace", "City View", "Gym Access", "Security", "Wi-Fi", "Climate Control"],
    images: ["penthouse1.jpg", "penthouse2.jpg", "penthouse3.jpg"]
  }
};

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  const property = id && mockProperties[id] ? mockProperties[id] : null;
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Not Found</h2>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-grow bg-[#f9f7f3]">
        {/* Back button */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Button 
            variant="outline" 
            className="mb-6 border-[#6b7d65] text-[#6b7d65] hover:bg-[#f2f4ef]"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Property images */}
            <div className="lg:col-span-2">
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-500">Main Property Image</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500 text-xs">Image 1</div>
                </div>
                <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500 text-xs">Image 2</div>
                </div>
                <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500 text-xs">Image 3</div>
                </div>
              </div>
              
              {/* Property description */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>
              
              {/* Property features */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-[#6b7d65] rounded-full mr-2"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - Property details */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-800">{property.title}</h1>
                  <button 
                    onClick={toggleFavorite} 
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Heart 
                      className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center mb-4 text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                
                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <div className="mb-2">
                    <span className="text-gray-600">Price per night</span>
                  </div>
                  <div className="text-3xl font-bold text-[#6b7d65]">${property.price}</div>
                </div>
                
                <Button className="w-full bg-[#6b7d65] hover:bg-[#5a6b55]">
                  Book Now
                </Button>
              </div>
              
              <div className="bg-[#f2f4ef] p-6 rounded-lg border border-[#e0e4da]">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Host</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about this property? Reach out to the host directly.
                </p>
                <Button variant="outline" className="w-full border-[#6b7d65] text-[#6b7d65] hover:bg-[#f2f4ef]">
                  Message Host
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchFilters />
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
