import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SizeSelector } from "./_components/size-selector";
import { ProductImageUpload } from "./_components/product-image-upload";

export default function ProductPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Шинэ бүтээгдэхүүн нэмэх</h1>
      </div>

      <form className="space-y-8">
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Бүтээгдэхүүны нэр</label>
            <Input
              className="mt-1.5"
              placeholder="Бүтээгдэхүүны нэрийг бичнэ үү"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Ангилал</label>
            <Select>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Ангилал сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jackets">Куртик</SelectItem>
                <SelectItem value="pants">Өмд</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Үнэ</label>
              <Input className="mt-1.5" type="number" placeholder="0.000.00" />
            </div>
            <div>
              <label className="text-sm font-medium">Хямдрал</label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="0%" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="30">30%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Барааны үлдэгдэл /Размерын задаргаа/
            </label>
            <SizeSelector />
          </div>

          <div>
            <label className="text-sm font-medium">Өнгө нэмэх</label>
            <ProductImageUpload />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Хадгалах</Button>
          <Button>Бүтээгдэхүүн нэмэх</Button>
        </div>
      </form>
    </div>
  );
}
