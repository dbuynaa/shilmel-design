import Link from "next/link";
import { BarChart3, Package, Settings, Scissors } from "lucide-react";

export function Sidebar() {
  return (
    <div className="min-h-screen w-64 border-r bg-gray-50/50 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-semibold">Шилмэл дизайн</h1>
        <p className="text-sm text-muted-foreground">dulgun@elevate.studio</p>
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
          href="/admin/products"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          <Package className="h-5 w-5" />
          <span>Захиалгууд</span>
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
