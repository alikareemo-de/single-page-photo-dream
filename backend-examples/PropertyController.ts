// API Controller for Property Update
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

// Multer configuration for handling multipart/form-data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/properties/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export class PropertyController {
  
  // POST /api/properties/:id/update
  static updateProperty = [
    upload.array('newImages', 10), // Handle up to 10 new images
    async (req: Request, res: Response) => {
      try {
        const propertyId = req.params.id;
        
        // Extract property data from form data
        const {
          title,
          location,
          price,
          description,
          features,
          userId,
          oldImages,
          imageNames
        } = req.body;

        // Parse JSON fields
        const parsedFeatures = JSON.parse(features);
        const parsedOldImages = JSON.parse(oldImages);
        const parsedImageNames = JSON.parse(imageNames);
        
        // Get new image files from multer
        const newImageFiles = req.files as Express.Multer.File[];

        // Validate required fields
        if (!title || !location || !price || !description) {
          return res.status(400).json({
            success: false,
            message: 'Missing required property fields',
            errors: ['Title, location, price, and description are required']
          });
        }

        // Process images
        const finalImages: string[] = [];
        let newImageIndex = 0;

        for (const imageName of parsedImageNames) {
          if (parsedOldImages.includes(imageName)) {
            // Keep existing image
            finalImages.push(imageName);
          } else {
            // This should be a new image
            if (newImageIndex < newImageFiles.length) {
              const newImageFile = newImageFiles[newImageIndex];
              finalImages.push(newImageFile.filename);
              newImageIndex++;
            }
          }
        }

        // Update property in database
        const updatedProperty = await PropertyService.updateProperty({
          id: propertyId,
          title,
          location,
          price: parseFloat(price),
          description,
          features: parsedFeatures,
          images: finalImages,
          userId,
          updatedAt: new Date()
        });

        // Clean up old images that are no longer used
        await PropertyService.cleanupUnusedImages(propertyId, finalImages);

        res.status(200).json({
          success: true,
          message: 'Property updated successfully',
          property: updatedProperty
        });

      } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to update property',
          errors: [error.message]
        });
      }
    }
  ];
}

// Example Service class (implement according to your database)
class PropertyService {
  static async updateProperty(propertyData: any) {
    // Implement your database update logic here
    // Return updated property
  }

  static async cleanupUnusedImages(propertyId: string, currentImages: string[]) {
    // Implement logic to remove old images that are no longer referenced
  }
}
