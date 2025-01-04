'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { StepOne } from './_components/step-one';
import { StepTwo } from './_components/step-two';
import { StepThree } from './_components/step-three';
import { useToast } from '@/hooks/use-toast';

export type OrderFormData = {
  sizes: Record<string, number>;
  colors: Array<{ id: string; value: string }>; // Updated type
  material: 'standard' | 'premium';
  logoPosition?: string;
  notes?: string;
};

export default function CustomOrderPage() {
  const [step, setStep] = useState(1);
  const [workBranchId, setWorkBranchId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const createCartItem = api.cart.addCustomItem.useMutation({
    onSuccess: () => {
      toast({ title: 'Added to cart successfully' });
      router.push('/cart');
    },
    onError: (error) => {
      toast({
        title: 'Error adding to cart',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleStepOne = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId);
    setStep(2);
  };

  const handleStepTwo = (selectedWorkBranch: string) => {
    setWorkBranchId(selectedWorkBranch);
    setStep(3);
  };

  const handleSubmit = (formData: OrderFormData) => {
    if (!workBranchId) return;

    // Validate total quantity
    const totalQuantity = Object.values(formData.sizes).reduce(
      (a, b) => a + b,
      0,
    );
    if (totalQuantity === 0) {
      toast({
        title: 'Please select sizes',
        variant: 'destructive',
      });
      return;
    }

    if (formData.colors.length === 0) {
      toast({
        title: 'Please select at least one color',
        variant: 'destructive',
      });
      return;
    }

    createCartItem.mutate({
      workBranchId,
      ...formData,
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mx-auto mb-12 max-w-3xl">
        <div className="relative flex justify-between">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= 1
                  ? 'bg-primary text-primary-foreground'
                  : 'border-2 border-muted-foreground bg-background'
              }`}
            >
              1
            </div>
            <span className="mt-2 text-sm font-medium">Хувцасны төрөл</span>
          </div>
          <div className="absolute left-[20%] right-[20%] top-5 h-[2px] bg-border" />
          <div className="z-30 flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= 2
                  ? 'bg-primary text-primary-foreground'
                  : 'border-2 border-muted-foreground bg-background'
              }`}
            >
              2
            </div>
            <span className="mt-2 text-sm font-medium">
              Хувцасны загвар төхөөрөмж
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step === 3
                  ? 'bg-primary text-primary-foreground'
                  : 'border-2 border-muted-foreground bg-background'
              }`}
            >
              3
            </div>
            <span className="mt-2 text-sm font-medium">Захиалга илгээх</span>
          </div>
        </div>
      </div>

      <Card className="mx-auto max-w-5xl">
        <CardContent className="p-6">
          {step === 1 && <StepOne onNext={handleStepOne} />}
          {step === 2 && categoryId && (
            <StepTwo onBack={() => setStep(1)} onNext={handleStepTwo} />
          )}
          {step === 3 && workBranchId && (
            <StepThree
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
              isSubmitting={createCartItem.isPending}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
