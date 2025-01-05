import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { formatDate } from 'date-fns';
import { RouterOutputs } from '@/trpc/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Order = RouterOutputs['order']['getAllOrders']['orders'][0];

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  totalOrders: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Төлсөн':
        return 'bg-green-50 text-green-700';
      case 'Хийгдэж байна':
        return 'bg-blue-50 text-blue-700';
      case 'Бэлэн болсон':
        return 'bg-purple-50 text-purple-700';
      case 'Хүргэгдсэн':
        return 'bg-teal-50 text-teal-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        getStatusStyle(status),
        className,
      )}
    >
      {status}
    </span>
  );
}
export function OrdersTable({
  orders,
  isLoading,
  totalOrders,
  currentPage,
  onPageChange,
}: OrdersTableProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium">Код</TableHead>
            <TableHead className="font-medium">Огноо</TableHead>
            <TableHead className="font-medium">Захиалагч</TableHead>
            <TableHead className="font-medium">Үнэ</TableHead>
            <TableHead className="font-medium">Төлбөр</TableHead>
            <TableHead className="font-medium">Бүтээгдэхүүн</TableHead>
            <TableHead className="font-medium">Захиалгын явц</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{formatDate(order.createdAt, 'yyyy.MM.dd')}</TableCell>
              <TableCell>{order.orderedBy.name}</TableCell>
              <TableCell>{order.totalAmount.toLocaleString()}₮</TableCell>
              <TableCell>
                <StatusBadge status={order.paymentStatus} />
              </TableCell>
              <TableCell>{order.items?.length || 0} бүтээгдэхүүн</TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Link href={`/admin/orders/${order.id}`}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-gray-500">
          Showing {orders.length} of {totalOrders} orders
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Буцах
          </Button>
          {[...Array(Math.min(5, Math.ceil(totalOrders / 10)))].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalOrders / 10)}
          >
            Цааш
          </Button>
        </div>
      </div>
    </div>
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
