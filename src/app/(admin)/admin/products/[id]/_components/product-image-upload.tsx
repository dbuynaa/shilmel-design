'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Image from 'next/image';

export function ProductImageUpload() {
  return (
    <div className="mt-1.5 grid grid-cols-6 gap-4">
      <div className="relative aspect-square rounded-lg border-2 border-dashed border-gray-200 p-4">
        <Image
          src="/placeholder.svg"
          alt="Product preview"
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <Button variant="outline" className="aspect-square" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
