'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: '01-2002',
    name: 'Waterproof Grey Jacket xcxbcncxbxxxxcbx',
    image: '/placeholder.svg',
    price: '165,000₮',
    discount: '20%',
    status: '963ш'
  },
  // Add more products...
]

export function ProductsTable() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Бүтээгдэхүүн</TableHead>
            <TableHead>Код</TableHead>
            <TableHead>Үнэ</TableHead>
            <TableHead>Хямдрал</TableHead>
            <TableHead>Тоо хэмжээ /нийт/</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="flex items-center gap-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                {product.name}
              </TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.discount}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <PencilIcon className="w-4 h-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

