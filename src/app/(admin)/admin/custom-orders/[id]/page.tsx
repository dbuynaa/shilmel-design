'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/trpc/react';
import { useParams } from 'next/navigation';
import { OrderStatusProgress } from '@/components/order-status-progress';

export default function CustomOrderDetailPage() {
  const { id } = useParams();
  const { data: order, isLoading } = api.customOrder.getById.useQuery(
    id as string,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">#{order.id}</h1>
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            {/* {order.paymentStatus} */}
            Төлсөн
          </Badge>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Төлөв</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderStatusProgress status={order.status} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Бүтээгдэхүүн</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div key={order.id} className="orders-center flex gap-4">
                  <Image
                    src={order.logoFile || '/placeholder.svg'}
                    alt={order.orderNumber}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{order.orderNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.sizes
                        .map((size) => `${size.size}: ${size.quantity}`)
                        .join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.totalAmount}₮</div>
                    <div className="text-sm text-muted-foreground">
                      x
                      {order.sizes
                        .map((size) => size.quantity)
                        .reduce((a, b) => a + b, 0)}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground"> Материал</div>
                  <div className="font-medium">{order.material}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground"> Логотип</div>
                  <div className="font-medium">{order.logoPosition}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Төрөл</div>
                  <div className="font-medium">{order.workBranch.name}</div>
                </div>
                {order.workBranch.children.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Ангилал</div>
                    <div className="font-medium">
                      {order.workBranch.children.map((c) => c.name).join(', ')}
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Ангилал</div>
                  <div className="font-medium">{order.category.name}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Тайлбар</div>
                  <div className="font-medium">{order.notes}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Захиалагчийн мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Нэр</div>
                <div>{order.orderedBy.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Имэйл</div>
                <div>{order.orderedBy.email}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Утасны дугаар
                </div>
                {/* <div>{order.orderedBy.email}</div> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Хүргэлтийн мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4" />
                <div>
                  <div className="font-medium">Хүргэлтийн хаяг</div>
                  <div className="text-sm text-muted-foreground">
                    {/* {order.shippingAddress} */}
                    Баянзүрх дүүрэг, 25-р хороо, Сэлбэ хотхон, 99/1
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-1 h-4 w-4" />
                <div>
                  <div className="font-medium">Хүлээн авах</div>
                  <div className="text-sm text-muted-foreground">
                    {/* {order.deliveryDate} */}
                    12-р сарын 27
                    <br />
                    {/* {order.deliveryTime} */}
                    13:00 - 14:00
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Төлбөрийн дүн</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <div className="text-muted-foreground">
                  {order.sizes.length} бараааны дүн
                </div>
                <div>{order.totalAmount.toLocaleString()}₮</div>
              </div>
              <div className="flex justify-between">
                <div className="text-muted-foreground">Хүргэлт</div>
                <div>{5000}₮</div>
              </div>
              <div className="flex justify-between font-medium">
                <div>Нийт</div>
                <div className="text-pink-600">
                  {order.totalAmount.toLocaleString()}₮
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
