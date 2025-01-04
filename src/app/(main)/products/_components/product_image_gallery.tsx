'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

export function ProductImageGallery({
  images,
  className,
}: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const showNext = React.useCallback(() => {
    setCurrentImage((current) => (current + 1) % images.length);
  }, [images.length]);

  const showPrevious = React.useCallback(() => {
    setCurrentImage((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance images every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(showNext, 5000);
    return () => clearInterval(timer);
  }, [showNext]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrevious();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showNext, showPrevious]);

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center bg-muted">
        No images available
      </div>
    );
  }

  return (
    <div className={cn('flex gap-4', className)}>
      <div className="hidden w-24 flex-col gap-4 md:flex">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={cn(
              'relative h-24 w-24 overflow-hidden rounded border transition-all duration-200',
              currentImage === index && 'ring-2 ring-primary',
              'hover:opacity-90',
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              onLoadingComplete={() => setIsLoading(false)}
              onError={() => setHasError(true)}
              sizes="96px"
            />
          </button>
        ))}
      </div>
      <div className="relative aspect-square flex-1 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            Loading...
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            Failed to load image
          </div>
        )}
        <Image
          src={images[currentImage]?.src || ''}
          alt={images[currentImage]?.alt || ''}
          fill
          className={cn(
            'rounded-lg object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
          )}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={showPrevious}
            className="h-8 w-8 bg-white/80 transition-colors hover:bg-white/90"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={showNext}
            className="h-8 w-8 bg-white/80 transition-colors hover:bg-white/90"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                'h-2 w-2 rounded-full bg-white/50 transition-all',
                currentImage === index && 'w-4 bg-white',
              )}
            >
              <span className="sr-only">Go to image {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
