'use client';

import Link from 'next/link';
import {
  BarChart3,
  Package,
  Settings,
  Scissors,
  ShoppingCart,
  Search,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

export function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen w-64 border-r bg-gray-50/50 p-4">
      <div className="mb-8">
        <Link href="/" className="mx-auto">
          <Image
            src="https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/shilmel-logo-1FunPpIFesznfNbIsounohyaLIYdFo"
            alt="Logo"
            width={120}
            height={120}
            className="h-14 w-auto"
          />
        </Link>
        <h1 className="text-xl font-semibold">Шилмэл дизайн</h1>
        <p className="text-sm text-muted-foreground">
          {session && session.user.email}
        </p>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Хайх..." className="pl-8" />
      </div>

      <nav className="space-y-2">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <BarChart3 className="h-5 w-5" />
          <span>Нүүр хуудас</span>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Захиалгууд</span>
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <Package className="h-5 w-5" />
          <span>Бүтээгдэхүүн</span>
        </Link>
        <Link
          href="/admin/reports"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <Scissors className="h-5 w-5" />
          <span>Тайлан</span>
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <Settings className="h-5 w-5" />
          <span>Тохиргоо</span>
        </Link>
      </nav>
    </div>
  );
}
