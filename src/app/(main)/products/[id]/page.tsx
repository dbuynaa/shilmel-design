"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductImage {
  src: string;
  alt: string;
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");

  const images: ProductImage[] = [
    { src: "/placeholder.svg", alt: "Product front view" },
    { src: "/placeholder.svg", alt: "Product side view" },
    { src: "/placeholder.svg", alt: "Product back view" },
    { src: "/placeholder.svg", alt: "Product detail view" },
    { src: "/placeholder.svg", alt: "Product wearing view" },
  ];

  const sizes = ["4XL", "XXL", "XL", "L", "M"];
  const colors = [
    { name: "Yellow/Black", primary: "#EEFF00", secondary: "#000000" },
    { name: "Orange/Black", primary: "#FF6B00", secondary: "#000000" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Thumbnails */}
        <div className="order-2 flex gap-2 lg:order-1 lg:w-24 lg:flex-col">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-lg border",
                selectedImage === i && "ring-2 ring-pink-600",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="order-1 flex-1 lg:order-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={
                images[selectedImage]?.src ??
                images[0]?.src ??
                "/placeholder.svg"
              }
              alt={images[selectedImage]?.alt ?? "Product image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="order-3 lg:w-80">
          <div className="space-y-6">
            <div>
              <div className="mb-1 text-sm text-gray-500">
                Барааны код: #2524
              </div>
              <h1 className="text-xl font-medium">Blue Winter Bomber Jacket</h1>
              <div className="mt-2 text-2xl font-semibold">49,900 ₮</div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Өнгө (2)
                </label>
                <div className="flex gap-2">
                  {colors.map((color, i) => (
                    <button
                      key={i}
                      className="relative h-12 w-12 overflow-hidden rounded border"
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${color.primary} 50%, ${color.secondary} 50%)`,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Хэмжээ (5)
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "rounded border px-3 py-1 text-sm",
                        selectedSize === size
                          ? "border-pink-600 bg-pink-50 text-pink-600"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                Сагсанд хийх
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              >
                Худалдаж авах
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-16 space-y-8">
        <div className="grid gap-8">
          <Image
            src="/placeholder.svg"
            alt="Product usage example"
            width={800}
            height={400}
            className="w-full rounded-lg"
          />
          <Image
            src="/placeholder.svg"
            alt="Product features"
            width={800}
            height={400}
            className="w-full rounded-lg"
          />
        </div>

        {/* Size Chart */}
        <div>
          <h2 className="mb-4 text-xl font-medium">Хэмжээний хүснэгт</h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Chest</th>
                  <th className="px-4 py-2 text-left">Length</th>
                  <th className="px-4 py-2 text-left">Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {["S", "M", "L", "XL", "2XL"].map((size) => (
                  <tr key={size} className="border-t">
                    <td className="px-4 py-2">{size}</td>
                    <td className="px-4 py-2">00</td>
                    <td className="px-4 py-2">00</td>
                    <td className="px-4 py-2">00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="mb-6 text-xl font-medium">Төстэй бараанууд</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Link key={i} href={`/products/${i + 1}`} className="group">
                <div className="mb-2 aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src="/placeholder.svg"
                    alt="Related product"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium">
                  T1 Navy Shirt T.B Ти-1 хар
                </h3>
                <p className="mt-1 text-sm font-semibold">96,000 ₮</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
