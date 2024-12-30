'use client';

import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';
import { LoginModal } from '@/components/login-modal';
import { FilterDialog } from '@/components/filter-dialog';
import { UserNav } from '@/components/user-nav';

export default function Header() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === UserRole.ADMIN;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white px-14">
      <div className="container flex h-16 items-center justify-between">
        <FilterDialog />
        <Link href="/" className="mx-auto">
          <Image
            src="https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/shilmel-logo-1FunPpIFesznfNbIsounohyaLIYdFo"
            alt="Logo"
            width={120}
            height={120}
            className="h-14 w-full"
          />
        </Link>
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/account">Захиалга үүсгэх</Link>
          </Button>
          <Link href="/wishlist" className="p-2 hover:text-pink-600">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="p-2 hover:text-pink-600">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          {isAdmin && (
            <Button variant="default" size="sm" asChild>
              <Link href="/admin/dashboard">Админ</Link>
            </Button>
          )}
          {session ? <UserNav /> : <LoginModal />}
        </div>
      </div>
    </header>
  );
}