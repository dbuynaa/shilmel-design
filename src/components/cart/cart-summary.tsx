"use client"

import { Button } from "@/components/ui/button"

interface CartSummaryProps {
  totalItems: number
  totalPrice: number
}

export function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-lg font-medium">Сагс хооослох</h2>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between text-sm">
          <span>Нийт дүн ({totalItems}x)</span>
          <span className="font-medium">{totalPrice.toLocaleString()}₮</span>
        </div>
        <Button className="w-full">Худалдан авах</Button>
        <Button variant="outline" className="w-full">
          Худалж төлөх
        </Button>
      </div>
      <div className="mt-4 text-center">
        <Button variant="link" className="text-sm text-muted-foreground">
          Бонус оноогоор хөнгөлөх
        </Button>
      </div>
    </div>
  )
}

