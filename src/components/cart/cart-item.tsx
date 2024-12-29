"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  onToggleSelect: () => void;
  isSelected: boolean;
}

export function CartItem({
  id,
  title,
  price,
  image,
  quantity,
  size,
  onUpdateQuantity,
  onRemove,
  onToggleSelect,
  isSelected,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      <Checkbox
        checked={isSelected}
        onCheckedChange={onToggleSelect}
        className="h-5 w-5"
      />
      <div className="relative h-24 w-24 overflow-hidden rounded-lg">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-medium">{title}</h3>
        <Select defaultValue={size}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100cm">100см, Ган</SelectItem>
            <SelectItem value="110cm">110см, Ган</SelectItem>
            <SelectItem value="120cm">120см, Ган</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-24 text-right font-medium">
        {price.toLocaleString()}₮
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
