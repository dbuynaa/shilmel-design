'use client';

import { HeroSection } from '@/components/hero-section';
import { CategoryNav } from '@/components/category-nav';
import { ProductFilters } from '@/components/product-filters';
import { ProductCard } from '@/components/product-card';
import { api } from '@/trpc/react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { data: products, isLoading } = api.product.getAll.useQuery({
    limit: 10,
    orderby: 'desc',
  });

  return (
    <div className="bg-pink-50/30">
      <HeroSection />
      <CategoryNav />

      <div className="container px-[10%] py-8 md:px-[5%]">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Ажлын цамц</h2>
          <ProductFilters />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading
            ? // Show loading skeletons
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[200px] w-full" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              ))
            : products?.items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    image: product.images[0] ?? '/placeholder.svg',
                    // category: product.category.name,
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
