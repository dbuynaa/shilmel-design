import { put } from '@vercel/blob';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const { url } = await put(file.name, file, {
      access: 'public',
    });

    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
