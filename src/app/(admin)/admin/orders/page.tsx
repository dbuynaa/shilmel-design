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
  const [status, setStatus] = useState<OrderStatus | undefined>();
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'ALL' | 'PAID' | 'UNPAID'>(
    'ALL',
  );

  const { data, isLoading } = api.order.getAllOrders.useQuery({
    status,
    search,
    paymentStatus,
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Захиалгууд</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Хайх..."
              className="w-[250px] pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">Өнөөдөр</Button>
          <Select
            value={paymentStatus}
            onValueChange={(value) =>
              setPaymentStatus(value as typeof paymentStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Төлбөрийн төлөв" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Бүгд</SelectItem>
              <SelectItem value="PAID">Төлсөн</SelectItem>
              <SelectItem value="UNPAID">Төлөөгүй</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        value={status}
        onValueChange={(value) => setStatus(value as OrderStatus)}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value={''} className="relative">
            Бүгд
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-sm font-medium">
              {data?.count ?? 0}
            </span>
          </TabsTrigger>
          <TabsTrigger value={OrderStatus.DELIVERED} className="relative">
            Биелсэн
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-sm font-medium">
              {data?.count ?? 0}
            </span>
          </TabsTrigger>
          <TabsTrigger value={OrderStatus.CANCELLED} className="relative">
            Цуцалсан
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-sm font-medium">
              {data?.count ?? 0}
            </span>
          </TabsTrigger>
        </TabsList>
        <OrdersTable orders={data?.orders ?? []} isLoading={isLoading} />
      </Tabs>
    </div>
  );
}
