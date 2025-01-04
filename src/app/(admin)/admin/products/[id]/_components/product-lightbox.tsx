'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ProductLightboxProps {
  images: string[];
  colors?: string[];
  handleRemoveImage: (index: number) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

export function ProductLightbox({
  images,
  colors,
  handleRemoveImage,
  handleImageUpload,
  isLoading,
}: ProductLightboxProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 py-2 md:flex-row">
      <div className="flex w-full flex-col">
        {/* Main Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={
              images[selectedImage] ||
              'https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/download-YoIESaBHJbj2LZqPAkm5orN5daqa2z.png'
            }
            alt={`view ${selectedImage + 1}`}
            fill
            className="object-cover"
          />
          <div className="absolute right-4 top-4 flex gap-2">
            <Button
              size="icon"
              onClick={() => handleRemoveImage(selectedImage)}
              variant="ghost"
              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <X className="h-4 w-4 text-secondary-foreground" />
            </Button>
          </div>
        </div>

        {/* Colors */}
        <div className="mt-4 px-4">
          <h3 className="mb-2 text-sm font-medium">Өнгөнүүд:</h3>

          <div className="flex gap-2">
            {colors?.map((color, index) => (
              <button
                key={index}
                className="relative h-12 w-12 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={color}
                  alt={`color ${index + 1}`}
                  fill
                  className="rounded-full object-cover"
                />
                <span className="sr-only">{`Өнгө ${index + 1}`}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex flex-col gap-2 px-2 md:flex-col">
        <div className="relative aspect-square">
          <Input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
            id="image-upload"
            disabled={isLoading}
          />
          <label
            htmlFor="image-upload"
            className={cn(
              'flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-center',
              'hover:bg-muted/50',
              isLoading && 'cursor-not-allowed opacity-50',
            )}
          >
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Plus className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Зураг нэмэх
                </span>
              </>
            )}
          </label>
        </div>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square w-16 overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
          >
            <Image
              src={image}
              alt={`thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
