import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Extracts the public ID from a Cloudinary URL and deletes the asset
 * from the Cloudinary media library using the Admin API.
 */
export const deleteCloudinaryImage = async (imageUrl: string) => {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return;
  }
  
  try {
    const parts = imageUrl.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) {
      console.warn('Could not extract public ID from Cloudinary URL: no upload segment found');
      return;
    }
    
    const afterUpload = parts.slice(uploadIndex + 1).join('/');
    
    let publicIdWithExtension = afterUpload;
    // Remove version prefix if it exists (e.g., v1234567890)
    if (publicIdWithExtension.match(/^v\d+\//)) {
      publicIdWithExtension = publicIdWithExtension.replace(/^v\d+\//, '');
    }
    
    // Remove file extension
    const lastDotIndex = publicIdWithExtension.lastIndexOf('.');
    const publicId = lastDotIndex !== -1 ? publicIdWithExtension.substring(0, lastDotIndex) : publicIdWithExtension;
    
    if (publicId) {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log(`Cloudinary deletion result for ${publicId}:`, result);
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
