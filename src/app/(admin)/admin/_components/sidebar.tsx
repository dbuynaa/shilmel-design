'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Package,
  Settings,
  Scissors,
  ShoppingCart,
  Search,
  Shirt,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', icon: BarChart3, label: 'Нүүр хуудас' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Захиалгууд' },
    { href: '/admin/custom-orders', icon: Shirt, label: 'Шинэ Захиалгууд' },
    { href: '/admin/products', icon: Package, label: 'Бүтээгдэхүүн' },
    { href: '/admin/reports', icon: Scissors, label: 'Тайлан' },
    { href: '/admin/settings', icon: Settings, label: 'Тохиргоо' },
  ];

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
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
              pathname.startsWith(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
