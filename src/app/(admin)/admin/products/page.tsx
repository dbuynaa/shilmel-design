'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ProductsTable } from './[id]/_components/products-table';
import { api } from '@/trpc/react';
import { useCallback, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('');

  const { data: categories, isLoading: loadingCategories } =
    api.category.getAll.useQuery();
  const { data: products, isLoading: loadingProducts } =
    api.product.getAll.useQuery({
      limit: 50,
      categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
    });

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);

  const handlePriceSortChange = useCallback((value: string) => {
    setPriceSort(value);
  }, []);

  if (loadingCategories) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

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
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ангилал" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүгд</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceSort} onValueChange={handlePriceSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Үнэ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүгд</SelectItem>
            <SelectItem value="asc">Бага - Их</SelectItem>
            <SelectItem value="desc">Их - Бага</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="2024.09.12 - 2024.09.14"
          className="w-[200px]"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        />
      </div>

      <ProductsTable
        products={products?.items}
        isLoading={loadingProducts}
        priceSort={priceSort}
      />
    </div>
  );
}
