'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const sizes = ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S'];

export function SizeSelector() {
  return (
    <div className="mt-1.5 grid grid-cols-7 gap-4">
      <RadioGroup name="size" defaultValue="M" className="flex gap-6">
        {sizes.map((size) => (
          <div key={size} className="text-center">
            <RadioGroupItem
              value={size}
              className="h-10 w-10 rounded-none border-2 border-gray-200 hover:border-primary/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10"
              id={`size-${size}`}
            />
            <label
              htmlFor={`size-${size}`}
              className="mt-2 block text-sm font-medium"
            >
              {size}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
