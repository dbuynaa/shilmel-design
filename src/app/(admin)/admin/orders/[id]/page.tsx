import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderDetailPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">#01-2002</h1>
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            Төлсөн
          </Badge>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Хийгдэж байна
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
              <div className="flex items-center">
                <div className="flex w-full items-center">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-green-500 p-2">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm">Захиалга авсан</div>
                  </div>
                  <div className="h-1 flex-1 bg-green-500"></div>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-green-500 p-2">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm">Хүргэлтэд гарсан</div>
                  </div>
                  <div className="h-1 flex-1 bg-gray-200"></div>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-gray-200 p-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm">Хүргэгдсэн</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Бүтээгдэхүүн</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      alt="Product"
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">
                        Waterproof Grey Jacket xcxbcncx...
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Бэлэн болсон
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">22,900₮</div>
                      <div className="text-sm text-muted-foreground">x2</div>
                    </div>
                  </div>
                ))}
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
                <div>Х. Санаа</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Имэйл</div>
                <div>saikhnbayar@gmail.com</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Утасны дугаар
                </div>
                <div>99008800</div>
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
                    Баянзүрх дүүрэг, 25-р хороо, Сэлбэ хотхон, 99/1
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-1 h-4 w-4" />
                <div>
                  <div className="font-medium">Хүлээн авах</div>
                  <div className="text-sm text-muted-foreground">
                    12-р сарын 27
                    <br />
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
                <div className="text-muted-foreground">24 бараааны дүн</div>
                <div>525,900₮</div>
              </div>
              <div className="flex justify-between">
                <div className="text-muted-foreground">Хүргэлт</div>
                <div>5000₮</div>
              </div>
              <div className="flex justify-between font-medium">
                <div>Нийт</div>
                <div className="text-pink-600">525,900₮</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
