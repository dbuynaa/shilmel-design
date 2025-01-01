'use client';

import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { ProductCard } from '@/components/product-card';
import { api } from '@/trpc/react';
import { useCallback } from 'react';

export default function CartPage() {
  const { data: cart, refetch: refetchCart } = api.cart.get.useQuery();
  const { data: recommendedProducts } = api.product.getAll.useQuery({
    limit: 4,
    orderby: 'desc',
  });
  const removeItem = api.cart.removeItem.useMutation({
    onSuccess: () => refetchCart(),
  });

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItem.mutate(itemId);
    },
    [removeItem],
  );

  const totalItems = cart?.items.length ?? 0;
  const totalPrice =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) ?? 0;

  return (
    <div className="flex min-h-screen flex-col px-[12%]">
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Миний сагс ({totalItems})</h1>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="divide-y">
              {cart?.items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.product.name}
                  price={item.product.price}
                  image={item.product.images[0] ?? '/placeholder.svg'}
                  quantity={item.quantity}
                  size={item.size}
                  isSelected={true}
                  onUpdateQuantity={() => {}}
                  onRemove={() => handleRemoveItem(item.id)}
                  onToggleSelect={() => {}}
                />
              ))}
            </div>
            <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
          </div>
          <div className="mt-16 space-y-4">
            <h2 className="text-2xl font-bold">Санал болгох</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recommendedProducts?.items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    image: product.images[0] ?? '/placeholder.svg',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
