import Image from 'next/image';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';
import type { OrderFormData } from '../page';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

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

const formSchema = z.object({
  sizes: z
    .record(z.string(), z.number())
    .refine((sizes) => Object.values(sizes).reduce((a, b) => a + b, 0) > 0, {
      message: 'Please select at least one size',
    }),
  color: z.string({
    required_error: 'Please select a primary color',
  }),
  secondaryColor: z.string().optional(),
  material: z.enum(['standard', 'premium']),
  logoPosition: z.string().optional(),
  notes: z.string().max(100).optional(),
  logo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return ['image/png', 'image/svg+xml'].includes(file.type);
      },
      {
        message: 'Only PNG and SVG files are allowed',
      },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB
      },
      {
        message: 'File size must be less than 5MB',
      },
    ),
});

export function StepThree({ onBack, onSubmit, isSubmitting }: StepThreeProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sizes: Object.fromEntries(SIZES.map((size) => [size, 0])),
      color: '',
      secondaryColor: undefined,
      material: 'standard',
      notes: '',
      logo: undefined,
    },
  });

  const [preview, setPreview] = useState<string>();

  const handleColorToggle = (color: (typeof COLORS)[0]) => {
    const currentColor = form.getValues('color');
    const currentSecondary = form.getValues('secondaryColor');

    if (color.id === currentColor) {
      form.setValue('color', '');
    } else if (color.id === currentSecondary) {
      form.setValue('secondaryColor', undefined);
    } else if (!currentColor) {
      form.setValue('color', color.id);
    } else if (!currentSecondary) {
      form.setValue('secondaryColor', color.id);
    } else {
      toast({
        title: 'Maximum 2 colors allowed',
        variant: 'destructive',
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Update form
    form.setValue('logo', file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    form.setValue('logo', undefined);
    setPreview(undefined);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-2xl font-bold">Шинээр захиалга үүсгэх</h1>
        <p className="text-muted-foreground">Хувцасны төрлөө сонгоно уу?</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Image
            src="/placeholder.svg"
            alt="Product preview"
            width={400}
            height={400}
            className="aspect-square w-full rounded-lg border object-cover"
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8">
              {/* Colors */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Өнгө (2)</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          className={`h-8 w-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            field.value === color.id ||
                            form.getValues('secondaryColor') === color.id
                              ? 'ring-2'
                              : ''
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleColorToggle(color)}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Material */}
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Материал (эмнэлгийн стандарт)</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4"
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sizes */}
              <FormItem>
                <FormLabel>Хэмжээ (5)</FormLabel>
                <div className="grid grid-cols-5 gap-4">
                  {SIZES.map((size) => (
                    <FormField
                      key={size}
                      control={form.control}
                      name={`sizes.${size}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="text-center">
                            <div className="font-medium">{size}</div>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                className="w-full text-center"
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>

              {/* Logo Upload */}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Байгууллагын лого хадгалах (заавал биш)
                    </FormLabel>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Зөвхөн PNG, SVG хувилбараар оруулна уу.
                    </p>
                    {preview ? (
                      <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                        <Image
                          src={preview}
                          alt="Logo preview"
                          fill
                          className="object-contain p-2"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={removeLogo}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/png,image/svg+xml"
                          className="hidden"
                          id="logo-upload"
                          onChange={handleFileUpload}
                          name={field.name}
                          ref={field.ref}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="h-32 w-full"
                          onClick={() => {
                            document.getElementById('logo-upload')?.click();
                          }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-6 w-6" />
                            <span>Зураг оруулах</span>
                          </div>
                        </Button>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Logo Position */}
              <FormField
                control={form.control}
                name="logoPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Лого байрлуулах</FormLabel>
                    <div className="grid grid-cols-3 gap-4">
                      {POSITIONS.map((position) => (
                        <Button
                          key={position.id}
                          type="button"
                          variant="outline"
                          className={`h-auto py-4 ${
                            field.value === position.id ? 'ring-2' : ''
                          }`}
                          onClick={() => field.onChange(position.id)}
                        >
                          {position.name}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нэмэлт тайлбар</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <div className="mt-2 text-right text-sm text-muted-foreground">
                      {field.value?.length || 0}/100
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Буцах
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Захиалга илгээх'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
