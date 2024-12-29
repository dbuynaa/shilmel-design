import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  const categories = [
    { icon: "🏢", label: "Ажлын хувцас" },
    { icon: "👔", label: "Өрөөс хувцас" },
    { icon: "👕", label: "Пальто" },
    { icon: "🧥", label: "Хантааз" },
    { icon: "👖", label: "Нэхий хувцас" },
    { icon: "🦺", label: "Дэгжин хэрэгсэл" }
  ]

  const products = [
    {
      id: 1,
      name: "T1 Navy Shirt T.B Ти-1 хар",
      price: "96,000₮",
      image: "/placeholder.svg"
    },
    // Repeat similar products...
  ]

  return (
    <div className="bg-pink-50/30">
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Захиалгат хувцас,<br/>Дэгжин байдал</h1>
            <p className="text-gray-600 mb-6">
              Ажлын хувцасны төрөл бүрийн загвар, өнгө үйлдвэрлэл хийж байна
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700">
              Захиалах өдөр
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-full p-4 aspect-square flex items-center justify-center">
              <Image
                src="/icons/safety.svg"
                alt="Safety Icon"
                width={40}
                height={40}
                className="opacity-60"
              />
            </div>
            <div className="row-span-2 rounded-[2rem] overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Model"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-pink-200 rounded-full p-4 aspect-square flex items-center justify-center">
              <Image
                src="/icons/helmet.svg"
                alt="Helmet Icon"
                width={40}
                height={40}
                className="opacity-60"
              />
            </div>
            <div className="row-span-2 rounded-[2rem] overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Safety Wear"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-pink-100 rounded-full p-4 aspect-square flex items-center justify-center">
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
        <h2 className="text-xl font-semibold mb-6">Ангилал</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              href={`/category/${index}`}
              className="flex flex-col items-center gap-2 p-4 rounded-full border bg-white hover:border-pink-200 transition-colors"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm text-center">{category.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Link key={i} href={`/products/${i}`} className="group">
              <div className="aspect-square mb-4 bg-white rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt="Product"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-medium text-sm mb-2">T1 Navy Shirt T.B Ти-1 хар</h3>
              <p className="font-semibold">96,000₮</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

