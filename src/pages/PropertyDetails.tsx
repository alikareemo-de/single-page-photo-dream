
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/SearchFilters';
import PropertyImageGallery from '@/components/PropertyImageGallery';
import { fetchPropertyById, Property } from '@/services/propertyApi';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import { ArrowLeft, Heart, MapPin, Loader2, Edit, Save, X, Upload, Trash2, Star, CalendarIcon } from "lucide-react";
import axios from "axios";

enum PropertyType {
  Apartment = 1,
  House = 2,
  Villa = 3
}
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
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [newImageMap, setNewImageMap] = useState<Record<string, File>>({});
  
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
    setNewImages([]);
    setRemovedImages([]);
    setNewImageMap({});
  };

  const handleSave = async () => {
    if (!editedProperty || !id) return;

    try {
      setSaving(true);

      const formData = new FormData();
      
      // Add property data
      formData.append('id', id);
      formData.append('title', editedProperty.title);
      formData.append('location', editedProperty.location);
      formData.append('price', editedProperty.price.toString());
      formData.append('description', editedProperty.description);
      formData.append('features', JSON.stringify(editedProperty.features));
      formData.append('userId', editedProperty.userId);
      
      // Add new fields
      if (editedProperty.type) {
        formData.append('type', editedProperty.type.toString());
      }
      if (editedProperty.expireDate) {
        formData.append('expireDate', editedProperty.expireDate.toISOString());
      }

      // Prepare images data
      const oldImages: string[] = [];
      const newImageFiles: File[] = [];
      const imageNames: string[] = [];

      // Process all images in order
      for (const img of editedProperty.images) {
        if (img.startsWith('blob:')) {
          // New image from this session
          const file = newImageMap[img];
          if (!file) {
            throw new Error('Missing file for a newly added image');
          }
          newImageFiles.push(file);
          imageNames.push(file.name);
        } else {
          // Existing image
          oldImages.push(img);
          imageNames.push(img);
        }
      }

      // Add old images metadata
      formData.append('oldImages', JSON.stringify(oldImages));
      
      // Add new image files
      newImageFiles.forEach((file) => {
        formData.append('newImages', file);
      });

      // Add image names to preserve order
      formData.append('imageNames', JSON.stringify(imageNames));

      // Send single request with all data
      const response = await axios.post(`/api/properties/${id}/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status !== 200) {
        throw new Error('Failed to update property');
      }

      // Reload property data
      const updatedProperty = await fetchPropertyById(id);
      setProperty(updatedProperty);
      setEditedProperty(updatedProperty);
      setIsEditing(false);
      setNewImages([]);
      setRemovedImages([]);
      setNewImageMap({});
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Property, value: string | number | string[] | Date) => {
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !editedProperty) return;

    // Convert FileList to Array and create URLs for preview
    const newImageFiles = Array.from(files);
    const imageUrls = newImageFiles.map(file => URL.createObjectURL(file));
    
    // Track mapping from blob URL to File for later upload
    setNewImageMap((prev) => {
      const next = { ...prev };
      imageUrls.forEach((url, idx) => {
        next[url] = newImageFiles[idx];
      });
      return next;
    });
    
    // Add files to newImages state for upload (optional, kept for reference)
    setNewImages(prev => [...prev, ...newImageFiles]);
    
    setEditedProperty({
      ...editedProperty,
      images: [...editedProperty.images, ...imageUrls]
    });
  };

  const removeImage = (index: number) => {
    if (!editedProperty) return;
    
    const imageToRemove = editedProperty.images[index];
    
    // If it's a newly added blob URL, clean up mapping and revoke the URL
    if (imageToRemove.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(imageToRemove);
      } catch {}
      setNewImageMap((prev) => {
        const { [imageToRemove]: _, ...rest } = prev;
        return rest;
      });
    }
    
    const newImagesList = editedProperty.images.filter((_, i) => i !== index);
    setEditedProperty({
      ...editedProperty,
      images: newImagesList
    });
  };

  const setMainImage = (index: number) => {
    if (!editedProperty) return;
    const newImages = [...editedProperty.images];
    const mainImage = newImages[index];
    newImages.splice(index, 1);
    newImages.unshift(mainImage);
    setEditedProperty({
      ...editedProperty,
      images: newImages
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
              {isEditing && editedProperty && isOwner ? (
                <div className="space-y-4 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800">Property Images</h2>
                  
                  {/* Image Grid with Edit Controls */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {editedProperty.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image.startsWith('blob:') ? image : `/api/images/${image}`}
                          alt={`Property image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        
                        {/* Main image indicator */}
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Main
                          </div>
                        )}
                        
                        {/* Image controls */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <div className="flex space-x-2">
                            {index !== 0 && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setMainImage(index)}
                                className="text-xs"
                              >
                                <Star className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add new image button */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Add Images</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <PropertyImageGallery 
                  images={property.images} 
                  propertyTitle={property.title}
                />
              )}
              
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
                
                {/* Property Type */}
                {(property.type || (isEditing && editedProperty)) && (
                  <div className="mb-4">
                    <span className="text-gray-600 block mb-2">Property Type</span>
                    {isEditing && editedProperty ? (
                      <Select 
                        value={editedProperty.type?.toString() || ''} 
                        onValueChange={(value) => handleInputChange('type', Number(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={PropertyType.Apartment.toString()}>Apartment</SelectItem>
                          <SelectItem value={PropertyType.House.toString()}>House</SelectItem>
                          <SelectItem value={PropertyType.Villa.toString()}>Villa</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-gray-800">
                        {property.type === PropertyType.Apartment && 'Apartment'}
                        {property.type === PropertyType.House && 'House'}
                        {property.type === PropertyType.Villa && 'Villa'}
                      </span>
                    )}
                  </div>
                )}

                {/* Expire Date */}
                {(property.expireDate || (isEditing && editedProperty)) && (
                  <div className="mb-4">
                    <span className="text-gray-600 block mb-2">Expire Date</span>
                    {isEditing && editedProperty ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !editedProperty.expireDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {editedProperty.expireDate ? format(editedProperty.expireDate, "PPP") : "Select expire date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={editedProperty.expireDate}
                            onSelect={(date) => handleInputChange('expireDate', date)}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <span className="text-gray-800">
                        {property.expireDate ? format(new Date(property.expireDate), "PPP") : 'Not set'}
                      </span>
                    )}
                  </div>
                )}
                
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
