'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '@/trpc/react';
import { toast } from '@/hooks/use-toast';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = api.order.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: 'Алдаа гарлаа',
        description: error.message,
        variant: 'destructive',
      });
      setIsLoading(false);
    },
  });

  const handleCheckout = (paymentMethod: 'card' | 'qpay') => {
    setIsLoading(true);
    console.log('Checkout with:', paymentMethod);
    try {
      // Create order first
      createOrder.mutate({
        shippingInfo: {
          address: '', // These will be collected on the checkout page
          city: '',
          phone: '',
        },
      });
    } catch (error) {
      setIsLoading(false);
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-lg font-medium">Сагсны дүн</h2>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between text-sm">
          <span>Нийт дүн ({totalItems}x)</span>
          <span className="font-medium">{totalPrice.toLocaleString()}₮</span>
        </div>
        <Button
          className="w-full"
          onClick={() => handleCheckout('card')}
          disabled={isLoading}
        >
          Картаар төлөх
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleCheckout('qpay')}
          disabled={isLoading}
        >
          QPay-ээр төлөх
        </Button>
      </div>
      <div className="mt-4 text-center">
        <Button
          variant="link"
          className="text-sm text-muted-foreground"
          onClick={() => router.push('/bonus')}
          disabled={isLoading}
        >
          Бонус оноогоор хөнгөлөх
        </Button>
      </div>
    </div>
  );
}
