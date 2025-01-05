'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const orderStatuses = [
  { id: 'placed', label: 'Захиалга өгөх' },
  { id: 'pending', label: 'Хүлээгдэж буй' },
  { id: 'shipped', label: 'Хүргэлтэнд гарсан' },
  { id: 'delivered', label: 'Хүргэгдсэн' },
];

export default function OrderTrackingPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 px-[5%]">
      <div className="container py-6">
        <h1 className="mb-6 text-2xl font-semibold">Миний захиалгууд</h1>

        <div className="flex items-center justify-between">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start gap-2 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Бүгд
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Хүлээгдэж буй
              </TabsTrigger>
              <TabsTrigger
                value="confirmed"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Баталгаажсан
              </TabsTrigger>
              <TabsTrigger
                value="successful"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Амжилттай захиалга
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Цуцалсан
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Сүүлийн нь эхэндээ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Сүүлийн нь эхэндээ</SelectItem>
              <SelectItem value="oldest">Эхний нь эхэндээ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="mt-6">
          <div className="border-b p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-lg font-medium text-primary">2</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">2 давь төлөлт</h2>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    450,000₮ Төлсөн
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">2023.12.15</p>
              </div>
              <Button variant="ghost" className="ml-auto" asChild>
                <Link href="#" className="flex items-center gap-1">
                  Захиалгын дэлгэрэнгүйг харах
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm">
              <span>Захиалга балан болох хугацаа:</span>
              <span className="font-medium text-primary">
                2024.02.23 - 2024.03.04 хооронд
              </span>
            </div>

            <div className="mb-8">
              <div className="relative flex justify-between">
                {orderStatuses.map((status, index) => (
                  <div key={status.id} className="flex flex-col items-center">
                    <div
                      className={`z-10 h-4 w-4 rounded-full ${
                        index < 2 ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                    <span className="mt-2 text-sm">{status.label}</span>
                  </div>
                ))}
                <div className="absolute left-0 top-2 -z-0 h-[2px] w-full bg-gray-200">
                  <div className="h-full w-1/3 bg-primary" />
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Төрөл</span>
              <span>Захиалгын дугаар:</span>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <span>Лого хадуулах</span>
              <span className="font-medium">R979479225</span>
            </div>

            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <Image
                    src="/placeholder.svg"
                    alt="Blue Winter Bomber Jacket"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">Blue Winter Bomber Jacket</h3>
                    <p className="text-sm text-muted-foreground">Өнгө: Neon</p>
                    <div className="mt-1 flex gap-2 text-sm">
                      <span>4XL: 1x</span>
                      <span>XL: 2x</span>
                      <span>L: 1x</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">4x</div>
                    <div className="font-medium">500,000₮</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
