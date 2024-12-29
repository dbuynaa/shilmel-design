import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FilterDialog } from "./filter-dialog";

export default function Header() {
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
    // <header className="border-b bg-pink-50/30 p-[10%] md:p-[5%]">
    //   <div className="container mx-auto flex h-16 items-center justify-between px-4">
    //     <div className="flex items-center gap-4">
    //       <button className="lg:hidden">
    //         <svg
    //           className="h-6 w-6"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M4 6h16M4 12h16M4 18h16"
    //           />
    //         </svg>
    //       </button>
    //       <Link href="/" className="flex items-center gap-2">
    //         <img src="/logo.png" alt="Bayaryn Degdee" className="h-12" />
    //       </Link>
    //     </div>
    //     <div className="flex items-center gap-6">
    //       <Link href="/wishlist" className="p-2 hover:text-pink-600">
    //         <Heart className="h-5 w-5" />
    //       </Link>
    //       <Link href="/cart" className="p-2 hover:text-pink-600">
    //         <ShoppingCart className="h-5 w-5" />
    //       </Link>
    //       <Button variant="ghost" size="sm" asChild>
    //         <Link href="/account">Захиалга үүсгэх</Link>
    //       </Button>
    //     </div>
    //   </div>
    // </header>
  );
}
