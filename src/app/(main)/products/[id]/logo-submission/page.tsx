'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InfoIcon, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const positions = [
  { id: 'front', label: 'Зүүн тал' },
  { id: 'left', label: 'Зүүн ханцуй' },
  { id: 'back', label: 'Ар тал' },
  { id: 'right-sleeve', label: 'Баруун ханцуй' },
  { id: 'right', label: 'Баруун тал' },
];

export default function LogoSubmissionPage() {
  const [selectedPosition, setSelectedPosition] = useState('back');
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Update form
    // form.setValue('logo', file);

    setUploadedLogo(URL.createObjectURL(file));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    // form.setValue('logo', undefined);
    setUploadedLogo(null);
  };

  return (
    <div className="container grid gap-6 px-[5%] pb-16 pt-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Лого хадуулах</h1>
            <Button variant="ghost" size="icon">
              <InfoIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 space-y-8">
            {/* Step 1 */}
            <div className="relative border-l-2 border-pink-500 pb-8 pl-8">
              <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                1
              </div>
              <div className="space-y-4">
                <h2 className="font-medium">Байгууллагын мэдээлэл</h2>
                <p className="text-sm text-muted-foreground">
                  Зөвхөн PNG, SVG хувилбараар оруулна уу.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm">
                      Байгууллагын регистрийн дугаар
                    </label>
                    <Input placeholder="577906" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm">Байгууллагын нэр</label>
                      <Input placeholder="Елиевайт" />
                    </div>
                    <div>
                      <label className="text-sm">Үйл ажиллагааны чиглэл</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Барилга байгууламж" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">
                            Барилга байгууламж
                          </SelectItem>
                          <SelectItem value="trade">Худалдаа</SelectItem>
                          <SelectItem value="service">Үйлчилгээ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative border-l-2 border-pink-500 pb-8 pl-8">
              <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                2
              </div>
              <div className="space-y-4">
                <h2 className="font-medium">Лого файл оруулах</h2>
                <p className="text-sm text-muted-foreground">
                  Зөвхөн PNG, SVG хувилбараар оруулна уу.
                </p>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8">
                  {uploadedLogo ? (
                    <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                      <Image
                        src={uploadedLogo}
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
                        // name={field.name}
                        // ref={field.ref}
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
                  {/* {uploadedLogo ? (
                    <div className="relative h-32 w-32">
                      <Image
                        src={uploadedLogo}
                        alt="Uploaded logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2">Зураг оруулах</p>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative border-l-2 border-pink-500 pb-8 pl-8">
              <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                3
              </div>
              <div className="space-y-4">
                <h2 className="font-medium">Лого байршуулах</h2>
                <p className="text-sm text-muted-foreground">
                  Эдгээрээс хамгийн ихдээ 2 нэг сонгоно уу.
                </p>
                <div className="grid grid-cols-5 gap-4">
                  {positions.map((position) => (
                    <button
                      key={position.id}
                      onClick={() => setSelectedPosition(position.id)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-lg border p-4 text-sm hover:border-pink-500',
                        selectedPosition === position.id && 'border-pink-500',
                      )}
                    >
                      <div className="relative h-20 w-16">
                        <Image
                          src="/placeholder.svg"
                          alt={position.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>{position.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative border-l-2 border-pink-500 pl-8">
              <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                4
              </div>
              <div className="space-y-4">
                <h2 className="font-medium">Нэмэлт тайлбар</h2>
                <p className="text-sm text-muted-foreground">
                  Зөвхөн PNG, SVG хувилбараар оруулна уу.
                </p>
                <div>
                  <Textarea
                    placeholder="Placeholder"
                    className="min-h-[120px]"
                  />
                  <div className="mt-1 text-right text-sm text-muted-foreground">
                    0/100
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Product Summary Sidebar */}
      <div className="space-y-6">
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src="/placeholder.svg"
                alt="Product"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">Blue Winter Bomber Jacket</h3>
              <p className="text-sm text-muted-foreground">
                Хаттамалийн нэг жийн үнэ
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <span className="text-sm">4XL:</span>
                <Button variant="outline" size="sm" className="h-6 px-2">
                  1x
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">XL:</span>
                <Button variant="outline" size="sm" className="h-6 px-2">
                  2x
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">L:</span>
                <Button variant="outline" size="sm" className="h-6 px-2">
                  1x
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Бүтээгдэхүүний дүн</span>
                <span className="font-medium">199,600₮</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Хаттамалийн дүн</span>
                <span className="font-medium">32,000₮</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Хямдрал</span>
                <span className="font-medium">0₮</span>
              </div>
              <div className="flex justify-between pt-2 font-medium">
                <span>Нийт дүн</span>
                <span>231,600₮</span>
              </div>
            </div>

            <Button className="w-full">Захиалах</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
