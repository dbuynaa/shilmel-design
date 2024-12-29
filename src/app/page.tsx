"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const categories = [
    { icon: "🏢", label: "Ажлын хувцас" },
    { icon: "👔", label: "Өрөөс хувцас" },
    { icon: "👕", label: "Пальто" },
    { icon: "🧥", label: "Хантааз" },
    { icon: "👖", label: "Нэхий хувцас" },
    { icon: "🦺", label: "Дэгжин хэрэгсэл" },
  ];

  const products = [
    {
      id: 1,
      name: "T1 Navy Shirt T.B Ти-1 хар",
      price: "96,000₮",
      image: "/placeholder.svg",
    },
    // Repeat similar products...
  ];

  return (
    <div className="bg-pink-50/30">
      <section className="container mx-auto px-4 py-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-4 text-3xl font-bold">
              Захиалгат хувцас,
              <br />
              Дэгжин байдал
            </h1>
            <p className="mb-6 text-gray-600">
              Ажлын хувцасны төрөл бүрийн загвар, өнгө үйлдвэрлэл хийж байна
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700">
              Захиалах өдөр
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex aspect-square items-center justify-center rounded-full bg-white p-4">
              <Image
                src="/icons/safety.svg"
                alt="Safety Icon"
                width={40}
                height={40}
                className="opacity-60"
              />
            </div>
            <div className="row-span-2 overflow-hidden rounded-[2rem]">
              <Image
                src="/placeholder.svg"
                alt="Model"
                width={300}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex aspect-square items-center justify-center rounded-full bg-pink-200 p-4">
              <Image
                src="/icons/helmet.svg"
                alt="Helmet Icon"
                width={40}
                height={40}
                className="opacity-60"
              />
            </div>
            <div className="row-span-2 overflow-hidden rounded-[2rem]">
              <Image
                src="/placeholder.svg"
                alt="Safety Wear"
                width={300}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex aspect-square items-center justify-center rounded-full bg-pink-100 p-4">
              <Image
                src="/icons/jacket.svg"
                alt="Jacket Icon"
                width={40}
                height={40}
                className="opacity-60"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-xl font-semibold">Ангилал</h2>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/category/${index}`}
              className="flex flex-col items-center gap-2 rounded-full border bg-white p-4 transition-colors hover:border-pink-200"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-center text-sm">{category.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ажлын хувцас</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Үнэ
            </Button>
            <Button variant="outline" size="sm">
              Хэмжээ
            </Button>
            <Button variant="outline" size="sm">
              Өнгө
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Link key={i} href={`/products/${i}`} className="group">
              <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-white">
                <Image
                  src="/placeholder.svg"
                  alt="Product"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 text-sm font-medium">
                T1 Navy Shirt T.B Ти-1 хар
              </h3>
              <p className="font-semibold">96,000₮</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
