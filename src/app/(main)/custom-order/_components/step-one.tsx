'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { api } from '@/trpc/react';

interface StepOneProps {
  onNext: (workBranch: string) => void;
}

export function StepOne({ onNext }: StepOneProps) {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const categories = api.category.getAll.useQuery().data;

  if (!categories) return <div>Loading...</div>;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-bold">Шинээр захиалга үүсгэх</h1>
        <p className="text-muted-foreground">Хувцасны төрлөө сонгоно уу?</p>
      </div>

      <section>
        <div className="grid gap-8 md:grid-cols-5">
          {categories?.map((branch) => (
            <Card
              key={branch.id}
              onClick={() => setSelectedBranch(branch.id)}
              className={`cursor-pointer transition-shadow hover:shadow-lg ${
                selectedBranch === branch.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardContent className="p-2">
                <div className="relative mx-auto aspect-square w-[50%] overflow-hidden rounded-t-lg">
                  <Image
                    src={branch.icon}
                    alt={branch.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-0">
                  <h3 className="text-center font-medium">{branch.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <div className="flex justify-end gap-4">
        <Button
          disabled={selectedBranch == null}
          variant="default"
          onClick={() => selectedBranch && onNext(selectedBranch)}
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
}
