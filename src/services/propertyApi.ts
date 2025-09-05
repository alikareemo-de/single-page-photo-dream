export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  features: string[] | string;
  images: string[];
  userId: string;
  type?: number;
  expireDate?: Date;
  propertyName?: string;
  status?: string;
  city?: string;
  country?: string;
  capacity?: number;
  rooms?: number;
  hasCar?: boolean;
  tripPlan?: string;
  createdDate?: string;
}

// Base API URL - you should replace this with your actual API endpoint
const API_BASE_URL = '/api';

export const fetchPropertyById = async (id: string): Promise<Property> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch property: ${response.statusText}`);
    }
    
    const property = await response.json();
    return property;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

export const fetchPropertyImage = async (imageName: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/images/${imageName}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    // Return the URL for the image
    return `${API_BASE_URL}/images/${imageName}`;
  } catch (error) {
    console.error('Error fetching image:', error);
    // Return placeholder on error
    return '/placeholder.svg';
  }
};

export const getImageUrl = (imageName: string): string => {
  return `${API_BASE_URL}/images/${imageName}`;
};