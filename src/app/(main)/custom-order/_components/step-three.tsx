import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import type { OrderFormData } from '../page';
import { useToast } from '@/hooks/use-toast';

interface StepThreeProps {
  onBack: () => void;
  onSubmit: (data: OrderFormData) => void;
  isSubmitting: boolean;
}

const COLORS = [
  { id: 'blue', value: '#1e40af' },
  { id: 'lightblue', value: '#93c5fd' },
  { id: 'pink', value: '#fce7f3' },
  { id: 'red', value: '#dc2626' },
  { id: 'purple', value: '#7e22ce' },
  { id: 'black', value: '#171717' },
  { id: 'navy', value: '#1e3a8a' },
  { id: 'mint', value: '#a7f3d0' },
  { id: 'white', value: '#ffffff' },
];

const SIZES = ['4XL', 'XXL', 'XL', 'L', 'M'];

const POSITIONS = [
  { id: 'front', name: 'Зүүн тал' },
  { id: 'back', name: 'Зүүн дээд' },
  { id: 'left', name: 'Ар тал' },
  { id: 'right', name: 'Баруун дээд' },
  { id: 'bottom', name: 'Баруун тал' },
];

export function StepThree({ onBack, onSubmit, isSubmitting }: StepThreeProps) {
  const [sizes, setSizes] = useState<Record<string, number>>(
    Object.fromEntries(SIZES.map((size) => [size, 0])),
  );
  const [selectedColors, setSelectedColors] = useState<
    Array<(typeof COLORS)[0]>
  >([]);
  const [material, setMaterial] = useState<'standard' | 'premium'>('standard');
  const [logoPosition, setLogoPosition] = useState<string>();
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSizeChange = (size: string, quantity: number) => {
    setSizes((prev) => ({ ...prev, [size]: quantity }));
  };

  const handleColorToggle = (color: (typeof COLORS)[0]) => {
    setSelectedColors((prev) => {
      const exists = prev.find((c) => c.id === color.id);
      if (exists) {
        return prev.filter((c) => c.id !== color.id);
      }
      if (prev.length >= 2) {
        toast({
          title: 'Maximum 2 colors allowed',
          variant: 'destructive',
        });
        return prev;
      }
      return [...prev, color];
    });
  };

  const handleSubmit = () => {
    // Validate form
    if (Object.values(sizes).reduce((a, b) => a + b, 0) === 0) {
      toast({
        title: 'Please select sizes',
        variant: 'destructive',
      });
      return;
    }

    if (selectedColors.length === 0) {
      toast({
        title: 'Please select at least one color',
        variant: 'destructive',
      });
      return;
    }

    onSubmit({
      sizes,
      colors: selectedColors,
      material,
      logoPosition,
      notes: notes || undefined,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-bold">Шинээр захиалга үүсгэх</h1>
        <p className="text-muted-foreground">Хувцасны төрлөө сонгоно уу?</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div>
          <Image
            src="/placeholder.svg"
            alt="Product preview"
            width={400}
            height={400}
            className="aspect-square w-full rounded-lg border object-cover"
          />
        </div>

        {/* Customization Options */}
        <div className="space-y-8">
          {/* Colors */}
          <div>
            <h3 className="mb-4 font-medium">Өнгө (2)</h3>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.id}
                  className="h-8 w-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorToggle(color)}
                />
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <h3 className="mb-4 font-medium">Материал (эмнэлгийн стандарт)</h3>
            <RadioGroup
              defaultValue="standard"
              className="flex gap-4"
              onValueChange={(value) =>
                setMaterial(value as 'standard' | 'premium')
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">Даавуу</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium">Даавуу</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="mb-4 font-medium">Хэмжээ (5)</h3>
            <div className="grid grid-cols-5 gap-4">
              {SIZES.map((size) => (
                <div key={size} className="text-center">
                  <div className="font-medium">{size}</div>
                  <input
                    type="number"
                    min="0"
                    defaultValue="0"
                    className="w-full rounded border p-1 text-center"
                    onChange={(e) =>
                      handleSizeChange(size, Number(e.target.value))
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <h3 className="mb-4 font-medium">
              Байгууллагын лого хадгалах (заавал биш)
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Зөвхөн PNG, SVG үүргэлбэрийг оруулна уу.
            </p>
            <Button variant="outline" className="h-32 w-full">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-6 w-6" />
                <span>Зураг оруулах</span>
              </div>
            </Button>
          </div>

          {/* Logo Positions */}
          <div>
            <h3 className="mb-4 font-medium">Лого байрлуулах</h3>
            <div className="grid grid-cols-3 gap-4">
              {POSITIONS.map((position) => (
                <Button
                  key={position.id}
                  variant="outline"
                  className="h-auto py-4"
                  onClick={() => setLogoPosition(position.id)}
                >
                  {position.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <h3 className="mb-4 font-medium">Нэмэлт тайлбар</h3>
            <Textarea
              placeholder="Type your message here."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="mt-2 text-right text-sm text-muted-foreground">
              {notes.length}/100
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Буцах
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Захиалга илгээх'}
        </Button>
      </div>
    </div>
  );
}
