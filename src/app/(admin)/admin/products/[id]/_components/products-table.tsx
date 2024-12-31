import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { type Product } from '@prisma/client';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { deleteProduct } from '@/lib/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/trpc/react';

interface ProductsTableProps {
  products?: Product[];
  isLoading: boolean;
  priceSort: string;
}

export function ProductsTable({
  products,
  isLoading,
  priceSort,
}: ProductsTableProps) {
  const { toast } = useToast();
  const utils = api.useUtils();
  const handleDelete = async (id: string) => {
    const result = await deleteProduct(id);
    if (result.success) {
      utils.product.getAll.invalidate();
    }
    toast({
      title: result.success ? 'Success' : 'Error',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  const sortedProducts = products
    ? [...products].sort((a, b) => {
        if (priceSort === 'asc') {
          return a.price - b.price;
        } else if (priceSort === 'desc') {
          return b.price - a.price;
        }
        return 0;
      })
    : [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Зураг</TableHead>
          <TableHead>Нэр</TableHead>
          <TableHead>Үнэ</TableHead>
          <TableHead>Үлдэгдэл</TableHead>
          <TableHead>Үйлдэл</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price.toLocaleString()}₮</TableCell>
            <TableCell>{product.sizes}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link href={`/admin/products/${product.id}`}>
                  <Edit2 className="h-4 w-4" />
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(product.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
