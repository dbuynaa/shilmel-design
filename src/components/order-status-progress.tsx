import { Check } from 'lucide-react';

type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

interface OrderStatusProgressProps {
  status: OrderStatus;
}

const statusSteps: { status: OrderStatus; label: string }[] = [
  { status: 'PENDING', label: 'Захиалга авсан' },
  { status: 'PROCESSING', label: 'Бэлтгэж байна' },
  { status: 'SHIPPED', label: 'Хүргэлтэд гарсан' },
  { status: 'DELIVERED', label: 'Хүргэгдсэн' },
];

export function OrderStatusProgress({ status }: OrderStatusProgressProps) {
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.status === status,
  );

  return (
    <div className="flex w-full items-center">
      {statusSteps.map((step, index) => (
        <div
          key={step.status}
          className="flex flex-1 flex-col items-center last:flex-none"
        >
          <div className="flex w-full items-center">
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                index <= currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <Check
                className={`h-5 w-5 ${
                  index <= currentStepIndex ? 'text-white' : 'text-gray-500'
                }`}
              />
            </div>
            {index < statusSteps.length - 1 && (
              <div
                className={`h-1 flex-1 ${
                  index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
          <div className="mt-2 text-center text-sm">{step.label}</div>
        </div>
      ))}
    </div>
  );
}
