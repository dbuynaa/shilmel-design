'use client'

import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import Image from "next/image"

export function ProductImageUpload() {
  return (
    <div className="grid grid-cols-6 gap-4 mt-1.5">
      <div className="relative aspect-square rounded-lg border-2 border-dashed border-gray-200 p-4">
        <Image
          src="/placeholder.svg"
          alt="Product preview"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <Button variant="outline" className="aspect-square" size="icon">
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}

