"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductFilters() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select defaultValue="newest">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Сүүлд нэмэгдсэн</SelectItem>
          <SelectItem value="price-asc">Үнэ ⬆</SelectItem>
          <SelectItem value="price-desc">Үнэ ⬇</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
