"use client";

import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { ProductCard } from "@/components/product-card";

const cartItems = [
  {
    id: "1",
    title: "TALISHKO Striped Color Block Sweater - Black/White / L",
    price: 4699900,
    image: "/placeholder.svg",
    quantity: 1,
    size: "100cm",
    isSelected: true,
  },
  {
    id: "2",
    title: "TALISHKO Striped Color Block Sweater - Black/White / L",
    price: 4699900,
    image: "/placeholder.svg",
    quantity: 1,
    size: "100cm",
    isSelected: true,
  },
];

const relatedProducts = [
  {
    id: "1",
    title: "T1 Navy Shirt T.B Ти-1 Хөх ажлын цамц",
    price: 96000,
    image: "/placeholder.svg",
    category: "shirts",
  },
  {
    id: "2",
    title: "T1 Navy Shirt T.B Ти-1 Хөх ажлын цамц",
    price: 96000,
    image: "/placeholder.svg",
    category: "shirts",
  },
  {
    id: "3",
    title: "T1 Navy Shirt T.B Ти-1 Хөх ажлын цамц",
    price: 96000,
    image: "/placeholder.svg",
    category: "shirts",
  },
  {
    id: "4",
    title: "T1 Navy Shirt T.B Ти-1 Хөх ажлын цамц",
    price: 96000,
    image: "/placeholder.svg",
    category: "shirts",
  },
];

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col px-[12%]">
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Миний сагс (2)</h1>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="divide-y">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onUpdateQuantity={() => {}}
                  onRemove={() => {}}
                  onToggleSelect={() => {}}
                />
              ))}
            </div>
            <CartSummary totalItems={2} totalPrice={9399800} />
          </div>
          <div className="mt-16 space-y-4">
            <h2 className="text-2xl font-bold">Хадгалсан</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
