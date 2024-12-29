'use client'

import { Input } from "@/components/ui/input"

const sizes = ['4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'S']

export function SizeSelector() {
  return (
    <div className="grid grid-cols-7 gap-4 mt-1.5">
      {sizes.map((size) => (
        <div key={size} className="text-center">
          <div className="font-medium mb-1">{size}</div>
          <Input placeholder="-" className="text-center" />
        </div>
      ))}
    </div>
  )
}

