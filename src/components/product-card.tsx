'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
      onClick={() => (window.location.href = `/products/${product.id}`)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking heart
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <div className="aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-medium">{product.title}</h3>
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold">{product.price.toLocaleString()}₮</p>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking add to cart
            }}
          >
            Сагсанд нэмэх
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
