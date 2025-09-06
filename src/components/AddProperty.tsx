import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { format } from 'date-fns';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { X, Upload, Eye, CalendarIcon } from 'lucide-react';

enum PropertyType {
  Apartment = 1,
  House = 2,
  Villa = 3
}

interface PropertyFormData {
  type: PropertyType;
  description: string;
  capacity: number;
  pricePerNight: number;
  status: string;
  city: string;
  country: string;
  location: string;
  rooms: number;
  hasCar: boolean;
  tripPlan: string;
  expireDate: Date;
  features: string[];
}

interface ImageFile extends File {
  preview: string;
  originalName: string;
}

const AddProperty: React.FC = () => {
  const { user } = useUser();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const availableFeatures = [
    'Wi-Fi', 'Parking', 'Pool', 'Gym', 'Air Conditioning', 'Heating',
    'Kitchen', 'Laundry', 'Balcony', 'Garden', 'Pets Allowed', 'Smoking Allowed',
    'Wheelchair Accessible', 'Elevator', 'Security', 'Concierge'
  ];
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<PropertyFormData>({
    defaultValues: {
      hasCar: false,
      features: []
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
      originalName: file.name
    })) as ImageFile[];
    
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const removeImage = (index: number) => {
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const replaceImage = (index: number, newFile: File) => {
    const newImage = Object.assign(newFile, {
      preview: URL.createObjectURL(newFile),
      originalName: newFile.name
    }) as ImageFile;
    
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated[index] = newImage;
      return updated;
    });
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to add a property",
        variant: "destructive"
      });
      return;
    }

    // Check if user info is complete before allowing property addition
    try {
      const { checkUserInfo } = await import('@/services/userApi');
      const userInfoComplete = await checkUserInfo(user.id);
      
      if (!userInfoComplete) {
        toast({
          title: "Incomplete Profile",
          description: "You cannot add a property until you complete your information (e.g., payment method).",
          variant: "destructive"
        });
        return;
      }
    } catch (error) {
      console.error('Error checking user info:', error);
      toast({
        title: "Error",
        description: "Unable to verify user information. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create property
      const propertyResponse = await axios.post('/api/properties', {
        ...data,
        features: selectedFeatures.join(','), // Convert array to comma-separated string
        userId: user.id
      });

      const propertyId = propertyResponse.data.id || propertyResponse.data.propertyId;

      if (!propertyId) {
        throw new Error('Property ID not received from server');
      }

      // Step 2: Upload images if any
      if (images.length > 0) {
        const formData = new FormData();
        const imageNames: string[] = [];
        
        images.forEach((image, index) => {
          formData.append(`images`, image);
          imageNames.push(image.originalName);
        });

        // Send image names along with the files
        formData.append('imageNames', JSON.stringify(imageNames));

        await axios.post(`/api/properties/${propertyId}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      toast({
        title: "Success!",
        description: "Property has been added successfully",
      });

      // Reset form
      reset();
      setImages([]);
      setSelectedFeatures([]);

    } catch (error: any) {
      console.error('Error adding property:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to add property';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup URLs on unmount
  React.useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Property</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Property Type *</Label>
              <Select onValueChange={(value) => setValue('type', Number(value) as PropertyType, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PropertyType.Apartment.toString()}>Apartment</SelectItem>
                  <SelectItem value={PropertyType.House.toString()}>House</SelectItem>
                  <SelectItem value={PropertyType.Villa.toString()}>Villa</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register('type', { required: 'Property type is required', valueAsNumber: true })} />
              {errors.type && <p className="text-sm text-destructive">Property type is required</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your property..."
                className="min-h-[100px]"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            {/* Grid for numeric fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  {...register('capacity', { 
                    required: 'Capacity is required',
                    valueAsNumber: true,
                    min: { value: 1, message: 'Capacity must be at least 1' }
                  })}
                />
                {errors.capacity && <p className="text-sm text-destructive">{errors.capacity.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Price Per Night *</Label>
                <Input
                  id="pricePerNight"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register('pricePerNight', { 
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                />
                {errors.pricePerNight && <p className="text-sm text-destructive">{errors.pricePerNight.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rooms">Rooms *</Label>
                <Input
                  id="rooms"
                  type="number"
                  min="1"
                  {...register('rooms', { 
                    required: 'Number of rooms is required',
                    valueAsNumber: true,
                    min: { value: 1, message: 'Must have at least 1 room' }
                  })}
                />
                {errors.rooms && <p className="text-sm text-destructive">{errors.rooms.message}</p>}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select onValueChange={(value) => setValue('status', value, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register('status', { required: 'Status is required' })} />
              {errors.status && <p className="text-sm text-destructive">Status is required</p>}
            </div>

            {/* Location fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  {...register('country', { required: 'Country is required' })}
                />
                {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Address/Location *</Label>
              <Input
                id="location"
                placeholder="Full address or location description"
                {...register('location', { required: 'Location is required' })}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
            </div>

            {/* Has Car checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasCar"
                checked={watch('hasCar')}
                onCheckedChange={(checked) => setValue('hasCar', !!checked)}
              />
              <Label htmlFor="hasCar">Car available for guests</Label>
            </div>

            {/* Trip Plan */}
            <div className="space-y-2">
              <Label htmlFor="tripPlan">Trip Plan</Label>
              <Textarea
                id="tripPlan"
                placeholder="Describe available activities, attractions, or trip recommendations..."
                className="min-h-[100px]"
                {...register('tripPlan')}
              />
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <Select onValueChange={(value) => {
                if (!selectedFeatures.includes(value)) {
                  const newFeatures = [...selectedFeatures, value];
                  setSelectedFeatures(newFeatures);
                  setValue('features', newFeatures);
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select features" />
                </SelectTrigger>
                <SelectContent>
                  {availableFeatures.filter(feature => !selectedFeatures.includes(feature)).map((feature) => (
                    <SelectItem key={feature} value={feature}>{feature}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Selected Features Display */}
              {selectedFeatures.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedFeatures.map((feature, index) => (
                    <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {feature}
                      <button
                        type="button"
                        onClick={() => {
                          const newFeatures = selectedFeatures.filter((_, i) => i !== index);
                          setSelectedFeatures(newFeatures);
                          setValue('features', newFeatures);
                        }}
                        className="text-primary hover:text-primary/70"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Expire Date */}
            <div className="space-y-2">
              <Label htmlFor="expireDate">Expire Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !watch('expireDate') && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch('expireDate') ? format(watch('expireDate'), "PPP") : "Select expire date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watch('expireDate')}
                    onSelect={(date) => setValue('expireDate', date!, { shouldValidate: true })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" {...register('expireDate', { required: 'Expire date is required' })} />
              {errors.expireDate && <p className="text-sm text-destructive">Expire date is required</p>}
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label>Property Images</Label>
              
              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                {isDragActive ? (
                  <p>Drop the images here...</p>
                ) : (
                  <div>
                    <p className="text-lg font-medium">Drag & drop images here</p>
                    <p className="text-sm text-muted-foreground">or click to select files</p>
                  </div>
                )}
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) replaceImage(index, file);
                            };
                            input.click();
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Property...' : 'Add Property'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProperty;