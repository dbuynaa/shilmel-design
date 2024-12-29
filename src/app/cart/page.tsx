'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'TALISHKO Striped Color Block Sweater - Black/White / L',
      price: 4699900,
      quantity: 1,
      image: '/placeholder.svg'
    }
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({items.length})</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b">
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="text-primary font-semibold mt-1">
                  {item.price.toLocaleString()} ₮
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{total.toLocaleString()} ₮</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold mb-6">
                <span>Total</span>
                <span>{total.toLocaleString()} ₮</span>
              </div>
              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

