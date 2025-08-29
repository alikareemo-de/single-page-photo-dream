// DTO/Model for Property Update Request
export interface PropertyUpdateDTO {
  // Property basic data
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  features: string[];
  userId: string;

  // Images data
  oldImages: string[];        // Array of existing image names to keep
  newImages: File[];          // Array of new image files
  imageNames: string[];       // Array of all image names in order (for preserving order)
}

// Alternative DTO using separate arrays for clarity
export interface PropertyUpdateRequestDTO {
  // Property data
  propertyData: {
    id: string;
    title: string;
    location: string;
    price: number;
    description: string;
    features: string[];
    userId: string;
  };

  // Image management
  imagesToKeep: string[];     // Existing images to preserve
  newImageFiles: File[];      // New images as files
  finalImageOrder: string[];  // Final order of all images
}

// Response DTO
export interface PropertyUpdateResponseDTO {
  success: boolean;
  message: string;
  property?: {
    id: string;
    title: string;
    location: string;
    price: number;
    description: string;
    features: string[];
    images: string[];
    userId: string;
    updatedAt: Date;
  };
  errors?: string[];
}