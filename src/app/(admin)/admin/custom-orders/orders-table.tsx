import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from 'date-fns';
import { RouterOutputs } from '@/trpc/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRightCircle } from 'lucide-react';

type Order = RouterOutputs['customOrder']['getAll'][0];

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
}

export function CustomOrdersTable({ orders, isLoading }: OrdersTableProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Захиалгын ID</TableHead>
          <TableHead>Захиалагч</TableHead>
          <TableHead>Огноо</TableHead>
          <TableHead>Төлөв</TableHead>
          <TableHead>Тоо хэмжээ</TableHead>
          <TableHead className="text-right">Дүн</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.orderedBy.name}</TableCell>
            <TableCell>{formatDate(order.createdAt, 'yyyy-MM-dd')}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
              {order.sizes
                .map((size) => `${size.size}: ${size.quantity}`)
                .join(', ')}
            </TableCell>
            <TableCell className="text-right">
              {order.totalAmount.toLocaleString()}₮
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Link href={`/admin/custom-orders/${order.id}`}>
                  <ArrowRightCircle className="h-8 w-8" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
    </div>
  );
}
