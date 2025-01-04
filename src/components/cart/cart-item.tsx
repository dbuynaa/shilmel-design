'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color?: { primary: string };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({
  price,
  quantity,
  size,
  color,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Size: {size}</span>
          {color && (
            <div
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: color.primary }}
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {(price * quantity).toLocaleString()}₮
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2"></div>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onUpdateQuantity(parseInt(e.target.value) || 0)}
          className="h-8 w-20"
        />
      </div>
      <Button variant="ghost" size="icon" onClick={onRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
