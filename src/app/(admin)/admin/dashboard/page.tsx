import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "./_components/overview";
import { RecentSales } from "./_components/recent-sales";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Нүүр хуудас</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт орлого</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,231,000₮</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-4 w-4 text-green-500" />
              +20.1% өмнөх сараас
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Захиалга</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowDown className="h-4 w-4 text-red-500" />
              -4% өмнөх сараас
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Бүтээгдэхүүн</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-4 w-4 text-green-500" />
              +8 шинэ нэмэгдсэн
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Хэрэглэгч</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-4 w-4 text-green-500" />
              +201 энэ сард
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Борлуулалт</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Сүүлийн захиалгууд</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
