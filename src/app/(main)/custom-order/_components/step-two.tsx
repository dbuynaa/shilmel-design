import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/trpc/react';

interface StepTwoProps {
  onNext: (workBranchId: string) => void;
  onBack: () => void;
}

export function StepTwo({ onNext, onBack }: StepTwoProps) {
  const [selectedParent, setSelectedParent] = useState<string>('');
  const [selectedChild, setSelectedChild] = useState<string>('');

  const { data: parentBranches, isLoading } = api.workBranch.getAll.useQuery();
  const { data: childBranches } = api.workBranch.getSubBranches.useQuery(
    selectedParent ?? '',
    { enabled: !!selectedParent },
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-bold">Шинээр захиалга үүсгэх</h1>
        <p className="text-muted-foreground">Хувцасны төрлөө сонгоно уу?</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {// Show parent branches
        parentBranches?.map((branch) => (
          <Card
            key={branch.id}
            onClick={() => setSelectedParent(branch.id)}
            className={`cursor-pointer transition-shadow hover:shadow-lg ${
              selectedParent === branch.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
                <Image
                  src={branch.icon ?? ''}
                  alt={branch.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-center font-medium">{branch.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-medium">
          {parentBranches?.find((e) => e.id == selectedParent)?.name}
        </h3>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {selectedParent &&
          childBranches?.map((branch) => (
            <Card
              key={branch.id}
              onClick={() => setSelectedChild(branch.id)}
              className={`cursor-pointer transition-shadow hover:shadow-lg ${
                selectedChild === branch.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
                  <Image
                    src={branch.icon}
                    alt={branch.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-center font-medium">{branch.name}</h3>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="secondary"
          onClick={() => {
            if (selectedChild) {
              setSelectedChild('');
            } else if (selectedParent) {
              setSelectedParent('');
            } else {
              onBack();
            }
          }}
        >
          Буцах
        </Button>
        <Button
          disabled={!selectedChild}
          onClick={() => selectedChild && onNext(selectedChild)}
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
}
