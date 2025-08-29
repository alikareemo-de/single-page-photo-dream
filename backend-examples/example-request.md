# Example POST Request

## Frontend Request Structure

```javascript
// How the frontend sends the request
const formData = new FormData();

// Property data
formData.append('id', '123');
formData.append('title', 'Beautiful Beach House');
formData.append('location', 'Miami Beach, FL');
formData.append('price', '250');
formData.append('description', 'Stunning oceanfront property...');
formData.append('features', JSON.stringify(['WiFi', 'Pool', 'Kitchen']));
formData.append('userId', 'user123');

// Old images to keep (JSON stringified array)
formData.append('oldImages', JSON.stringify(['image1.jpg', 'image3.jpg']));

// New image files (actual File objects)
newImageFiles.forEach((file) => {
  formData.append('newImages', file);
});

// Final order of all images (JSON stringified array)
formData.append('imageNames', JSON.stringify(['image1.jpg', 'newfile1.jpg', 'image3.jpg', 'newfile2.jpg']));

// Send request
const response = await axios.post('/api/properties/123/update', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

## Raw HTTP Request Example

```http
POST /api/properties/123/update HTTP/1.1
Host: your-api.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="id"

123
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="title"

Beautiful Beach House
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="location"

Miami Beach, FL
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="price"

250
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="description"

Stunning oceanfront property with amazing views...
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="features"

["WiFi","Pool","Kitchen","Ocean View"]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="userId"

user123
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="oldImages"

["image1.jpg","image3.jpg"]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="newImages"; filename="beach-view.jpg"
Content-Type: image/jpeg

[Binary image data]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="newImages"; filename="pool-area.jpg"
Content-Type: image/jpeg

[Binary image data]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="imageNames"

["image1.jpg","beach-view.jpg","image3.jpg","pool-area.jpg"]
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

## Expected Response

```json
{
  "success": true,
  "message": "Property updated successfully",
  "property": {
    "id": "123",
    "title": "Beautiful Beach House",
    "location": "Miami Beach, FL",
    "price": 250,
    "description": "Stunning oceanfront property with amazing views...",
    "features": ["WiFi", "Pool", "Kitchen", "Ocean View"],
    "images": ["image1.jpg", "beach-view-1640123456789.jpg", "image3.jpg", "pool-area-1640123456790.jpg"],
    "userId": "user123",
    "updatedAt": "2024-12-29T10:30:00.000Z"
  }
}
```
