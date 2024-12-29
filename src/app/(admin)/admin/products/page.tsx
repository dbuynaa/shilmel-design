import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductsTable } from "./[id]/_components/products-table";

export default function ProductsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Бүтээгдэхүүн</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Бүтээгдэхүүн нэмэх
          </Link>
        </Button>
      </div>

      <div className="flex gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ангилал" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүгд</SelectItem>
            <SelectItem value="jackets">Куртик</SelectItem>
            <SelectItem value="pants">Өмд</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Үнэ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүгд</SelectItem>
            <SelectItem value="low">Бага - Их</SelectItem>
            <SelectItem value="high">Их - Бага</SelectItem>
          </SelectContent>
        </Select>

        <Input placeholder="2024.09.12 - 2024.09.14" className="w-[200px]" />
      </div>

      <ProductsTable />
    </div>
  );
}
