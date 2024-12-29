import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b bg-pink-50/30">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Bayaryn Degdee" className="h-12" />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/wishlist" className="p-2 hover:text-pink-600">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="p-2 hover:text-pink-600">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/account">Захиалга үүсгэх</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
