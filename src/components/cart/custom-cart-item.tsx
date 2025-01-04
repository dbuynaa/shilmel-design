import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface SizeOption {
  [key: string]: number;
}

interface ColorOption {
  id: string;
  value: string;
  name?: string;
}

interface CustomCartItemProps {
  id: string;
  title: string;
  price: number;
  customization: {
    sizes: SizeOption;
    colors: ColorOption[];
    material: 'premium' | 'standard';
    logoPosition?: string;
    notes?: string;
  };
  onRemove: () => void;
}

export function CustomCartItem({
  title,
  price,
  customization,
  onRemove,
}: CustomCartItemProps) {
  const totalQuantity = Object.values(customization.sizes).reduce(
    (a, b) => a + b,
    0,
  );
  const totalPrice = price * totalQuantity;

  const renderCustomizationDetail = (
    label: string,
    content: React.ReactNode,
  ) => (
    <div className="flex items-center gap-1">
      <span className="font-medium">{label}:</span>
      {content}
    </div>
  );

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div className="flex gap-4">
        <div className="space-y-2">
          <h4 className="text-lg font-medium">{title}</h4>
          <div className="space-y-1 text-sm">
            {renderCustomizationDetail(
              'Хэмжээ',
              <span>
                {Object.entries(customization.sizes)
                  .filter(([, qty]) => qty > 0)
                  .map(([size, qty]) => `${size} (${qty})`)
                  .join(', ')}
              </span>,
            )}
            {renderCustomizationDetail(
              'Өнгө',
              <div className="flex gap-1.5">
                {customization.colors.map((color) => (
                  <div
                    key={color.id}
                    className="h-5 w-5 rounded-full border shadow"
                    style={{ backgroundColor: color.value }}
                    title={color.name || color.value}
                  />
                ))}
              </div>,
            )}
            {renderCustomizationDetail(
              'Материал',
              <span>
                {customization.material === 'premium' ? 'Премиум' : 'Энгийн'}
              </span>,
            )}
            {customization.logoPosition &&
              renderCustomizationDetail(
                'Лого байрлал',
                customization.logoPosition,
              )}
            {customization.notes && (
              <div className="mt-1 text-xs italic text-muted-foreground">
                Тэмдэглэл: {customization.notes}
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
