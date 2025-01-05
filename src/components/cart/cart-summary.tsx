'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { api } from '@/trpc/react';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
  const router = useRouter();
  const [status, setStatus] = useState('PENDING');
  const [isLoading, setIsLoading] = useState(false);

  const createCustomOrder = api.customOrder.create.useMutation({
    onSuccess: () => {
      toast({
        title: 'Сагсанд нэмэгдлээ',
        description: 'Таны захиалсан бүтээгдэхүүн амжилттай нэмэгдлээ',
      });
      setIsLoading(false);
      setStatus('COMPLETED');
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

  const createOrder = api.order.create.useMutation({
    onSuccess: () => {
      toast({
        title: 'Сагсанд нэмэгдлээ',
        description: 'Таны сонгосон бүтээгдэхүүн амжилттай нэмэгдлээ',
      });
      setIsLoading(false);
      setStatus('COMPLETED');
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
    setStatus('PENDING');
    createCustomOrder.mutate();
    createOrder.mutate({
      paymentMethod,
    });

    setTimeout(() => {
      if (status === 'PENDING') {
        setStatus('COMPLETED');
        router.refresh();
      }
    }, 3000);
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
          disabled={isLoading || totalItems === 0}
        >
          Картаар төлөх
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleCheckout('qpay')}
          disabled={isLoading || totalItems === 0}
        >
          QPay-ээр төлөх
        </Button>
      </div>
    </div>
  );
}
