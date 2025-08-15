
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/SearchFilters';
import PropertyImageGallery from '@/components/PropertyImageGallery';
import { fetchPropertyById, Property } from '@/services/propertyApi';
import { ArrowLeft, Heart, MapPin, Loader2 } from "lucide-react";

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProperty = async () => {
      if (!id) {
        setError('Property ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const propertyData = await fetchPropertyById(id);
        setProperty(propertyData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load property');
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-6">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Loading property...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {error || 'Property Not Found'}
            </h2>
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
              <PropertyImageGallery 
                images={property.images} 
                propertyTitle={property.title}
              />
              
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
