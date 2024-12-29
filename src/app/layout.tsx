import { Inter } from "next/font/google";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import "./globals.css";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className={inter.className}>
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
        <main>{children}</main>
        <footer className="mt-16 border-t bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 font-semibold">Холбоо барих</h3>
                <p className="text-sm text-gray-600">+976 7533 5599</p>
                <p className="text-sm text-gray-600">
                  Даваа - Баасан, 9:00 - 18:00
                </p>
              </div>
              <div>
                <h3 className="mb-4 font-semibold">Компани</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-gray-600 hover:text-pink-600"
                    >
                      Бидний тухай
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-gray-600 hover:text-pink-600"
                    >
                      Холбоо барих
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold">Үйлчилгээ</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/shipping"
                      className="text-sm text-gray-600 hover:text-pink-600"
                    >
                      Тээвэр
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/returns"
                      className="text-sm text-gray-600 hover:text-pink-600"
                    >
                      Буцаалт
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold">Сошиал</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-pink-600">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-pink-600">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
