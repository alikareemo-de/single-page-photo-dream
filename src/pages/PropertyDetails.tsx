
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/SearchFilters';
import PropertyImageGallery from '@/components/PropertyImageGallery';
import { fetchPropertyById, Property } from '@/services/propertyApi';
import { useUser } from '@/contexts/UserContext';
import { ArrowLeft, Heart, MapPin, Loader2, Edit, Save, X } from "lucide-react";

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState<Property | null>(null);
  const [saving, setSaving] = useState(false);
  
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
        setEditedProperty(propertyData);
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

  const isOwner = user && property && user.id === property.userId;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProperty(property);
  };

  const handleSave = async () => {
    if (!editedProperty || !id) return;
    
    try {
      setSaving(true);
      const response = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProperty),
      });

      if (!response.ok) {
        throw new Error('Failed to update property');
      }

      const updatedProperty = await response.json();
      setProperty(updatedProperty);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Property, value: string | number | string[]) => {
    if (!editedProperty) return;
    setEditedProperty({
      ...editedProperty,
      [field]: value
    });
  };

  const addFeature = () => {
    if (!editedProperty) return;
    setEditedProperty({
      ...editedProperty,
      features: [...editedProperty.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editedProperty) return;
    const newFeatures = [...editedProperty.features];
    newFeatures[index] = value;
    setEditedProperty({
      ...editedProperty,
      features: newFeatures
    });
  };

  const removeFeature = (index: number) => {
    if (!editedProperty) return;
    const newFeatures = editedProperty.features.filter((_, i) => i !== index);
    setEditedProperty({
      ...editedProperty,
      features: newFeatures
    });
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
                {isEditing && editedProperty ? (
                  <Textarea 
                    value={editedProperty.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full min-h-[100px]"
                    placeholder="Property description..."
                  />
                ) : (
                  <p className="text-gray-600">{property.description}</p>
                )}
              </div>
              
              {/* Property features */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
                {isEditing && editedProperty ? (
                  <div className="space-y-3">
                    {editedProperty.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input 
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder="Feature name..."
                          className="flex-1"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      onClick={addFeature}
                      className="w-full"
                    >
                      Add Feature
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#6b7d65] rounded-full mr-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column - Property details */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-start mb-4">
                  {isEditing && editedProperty ? (
                    <Input 
                      value={editedProperty.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="text-2xl font-bold flex-1 mr-4"
                      placeholder="Property title..."
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-800">{property.title}</h1>
                  )}
                  {!isOwner && (
                    <button 
                      onClick={toggleFavorite} 
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <Heart 
                        className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                      />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center mb-4 text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {isEditing && editedProperty ? (
                    <Input 
                      value={editedProperty.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Property location..."
                      className="flex-1"
                    />
                  ) : (
                    <span>{property.location}</span>
                  )}
                </div>
                
                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <div className="mb-2">
                    <span className="text-gray-600">Price per night</span>
                  </div>
                  {isEditing && editedProperty ? (
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-[#6b7d65] mr-2">$</span>
                      <Input 
                        type="number"
                        value={editedProperty.price}
                        onChange={(e) => handleInputChange('price', Number(e.target.value))}
                        className="text-2xl font-bold w-32"
                      />
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-[#6b7d65]">${property.price}</div>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <Button 
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full bg-[#6b7d65] hover:bg-[#5a6b55]"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={handleCancel}
                      variant="outline" 
                      className="w-full border-[#6b7d65] text-[#6b7d65] hover:bg-[#f2f4ef]"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                ) : isOwner ? (
                  <Button 
                    onClick={handleEdit}
                    className="w-full bg-[#6b7d65] hover:bg-[#5a6b55]"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Property
                  </Button>
                ) : (
                  <Button className="w-full bg-[#6b7d65] hover:bg-[#5a6b55]">
                    Book Now
                  </Button>
                )}
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
