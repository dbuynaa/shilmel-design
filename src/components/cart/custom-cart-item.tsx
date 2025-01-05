import { Button } from '@/components/ui/button';
import { CustomCartItem as ItemType, SizeQuantity } from '@prisma/client';
import { Trash2 } from 'lucide-react';

interface CustomCartItemProps {
  item: ItemType;
  sizes: SizeQuantity[];
  onRemove: () => void;
}

export function CustomCartItem({ item, sizes, onRemove }: CustomCartItemProps) {
  const totalQuantity = sizes.reduce((a, b) => a + b.quantity, 0);

  const totalPrice = item.totalAmount * totalQuantity;

  const renderItemDetail = (label: string, content: React.ReactNode) => (
    <div className="flex items-center gap-1">
      <span className="font-medium">{label}:</span>
      {content}
    </div>
  );

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div className="flex gap-4">
        <div className="space-y-2">
          <h4 className="text-lg font-medium">{item.id}</h4>
          <div className="space-y-1 text-sm">
            {renderItemDetail(
              'Хэмжээ',
              <span>
                {totalQuantity}
                {/* {Object.entries(item.sizes)
                  .filter(([, qty]) => qty > 0)
                  .map(([size, qty]) => `${size} (${qty})`)
                  .join(', ')} */}
              </span>,
            )}
            {renderItemDetail(
              'Өнгө',
              <div className="flex gap-1.5">
                <div
                  key={item.id}
                  className="h-5 w-5 rounded-full border shadow"
                  style={{ backgroundColor: item.color || '' }}
                />
              </div>,
            )}
            {renderItemDetail(
              'Материал',
              <span>{item.material === 'premium' ? 'Премиум' : 'Энгийн'}</span>,
            )}
            {item.logoPosition &&
              renderItemDetail('Лого байрлал', item.logoPosition)}
            {item.notes && (
              <div className="mt-1 text-xs italic text-muted-foreground">
                Тэмдэглэл: {item.notes}
              </div>
            )}
          </div>
          <div className="text-lg font-medium">
            {totalPrice.toLocaleString()}₮
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
