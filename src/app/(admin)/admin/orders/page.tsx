'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OrdersTable } from './orders-table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { api } from '@/trpc/react';
import { useState } from 'react';
import { OrderStatus } from '@prisma/client';

export default function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus | string>('');
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'ALL' | 'PAID' | 'UNPAID'>(
    'ALL',
  );

  const { data, isLoading } = api.order.getAllOrders.useQuery({
    status: status != '' ? (status as OrderStatus) : undefined,
    search,
    paymentStatus,
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="border-b bg-white px-8 py-4">
        <h1 className="text-xl font-semibold">Захиалгууд</h1>
      </div>

      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <Tabs
            value={status}
            onValueChange={(value) => setStatus(value as OrderStatus)}
            className="w-full"
          >
            <TabsList className="bg-transparent p-0 text-muted-foreground">
              <TabsTrigger
                value={''}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Бүгд
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                  {data?.count ?? 0}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value={OrderStatus.DELIVERED}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Биелсэн
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                  {data?.count ?? 0}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value={OrderStatus.CANCELLED}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                Цуцалсан
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                  {data?.count ?? 0}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Хайх"
                className="w-[250px] pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button variant="outline" className="h-9 px-4 text-sm font-normal">
              Өнөөдөр
            </Button>

            <Select
              value={paymentStatus}
              onValueChange={(value) =>
                setPaymentStatus(value as typeof paymentStatus)
              }
            >
              <SelectTrigger className="h-9 w-[180px] text-sm font-normal">
                <SelectValue placeholder="Төлсөн" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Бүгд</SelectItem>
                <SelectItem value="PAID">Төлсөн</SelectItem>
                <SelectItem value="UNPAID">Төлөөгүй</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border bg-white">
          <OrdersTable
            totalOrders={data?.count ?? 0}
            currentPage={1}
            onPageChange={() => {}}
            orders={data?.orders ?? []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
