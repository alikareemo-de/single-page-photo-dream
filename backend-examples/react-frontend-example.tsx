// Complete React Frontend Example
import React, { useState } from 'react';
import axios from 'axios';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
  userId: string;
}

const PropertyEditForm: React.FC<{ property: Property }> = ({ property }) => {
  const [editedProperty, setEditedProperty] = useState<Property>(property);
  const [newImageMap, setNewImageMap] = useState<Record<string, File>>({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editedProperty) return;

    try {
      setSaving(true);

      const formData = new FormData();
      
      // Add property data
      formData.append('id', editedProperty.id);
      formData.append('title', editedProperty.title);
      formData.append('location', editedProperty.location);
      formData.append('price', editedProperty.price.toString());
      formData.append('description', editedProperty.description);
      formData.append('features', JSON.stringify(editedProperty.features));
      formData.append('userId', editedProperty.userId);

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
      const response = await axios.post(`/api/properties/${editedProperty.id}/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        console.log('Property updated successfully:', response.data);
        // Handle success (reload property, show toast, etc.)
      }

    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    } finally {
      setSaving(false);
    }
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Property</h2>
      
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={editedProperty.title}
            onChange={(e) => setEditedProperty({...editedProperty, title: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={editedProperty.location}
            onChange={(e) => setEditedProperty({...editedProperty, location: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            value={editedProperty.price}
            onChange={(e) => setEditedProperty({...editedProperty, price: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={editedProperty.description}
            onChange={(e) => setEditedProperty({...editedProperty, description: e.target.value})}
            className="w-full p-2 border rounded h-32"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">Images</label>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {editedProperty.images.map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={image.startsWith('blob:') ? image : `/api/images/${image}`}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Add Images */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default PropertyEditForm;
