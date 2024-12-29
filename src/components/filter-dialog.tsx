"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const categories = [
  { id: "work", name: "Ажлын хувцас" },
  { id: "office", name: "Оффис хувцас" },
  { id: "coat", name: "Пальто" },
  { id: "vest", name: "Хантааз" },
  { id: "accessories", name: "Нэмэлт хэрэгсэл" },
  { id: "safety", name: "Дагалдах хэрэгсэл" },
];

const recentSearches = [
  "Single Line Item",
  "Single Line Item",
  "Single Line Item",
];

export function FilterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Menu className="h-14 w-14" />
          Бүх ангилал
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl gap-0 p-0">
        <VisuallyHidden asChild>
          <DialogTitle />
        </VisuallyHidden>
        <DialogHeader className="p-4">
          <div className="flex items-center gap-2">
            <DialogClose asChild>
              <Button className="shrink-0">
                <X className="h-4 w-4" /> Арилгах
                {/* <span className="sr-only">Арилгах</span> */}
              </Button>
            </DialogClose>
            <Input placeholder="Хайх" className="h-9" />
          </div>
        </DialogHeader>
        <div className="grid grid-cols-[240px_1fr_240px] divide-x">
          <div className="p-4">
            <div className="font-medium">Ангилал</div>
            <div className="mt-4 space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "w-full rounded-md px-2 py-1 text-left text-sm hover:bg-accent",
                    category.id === "work" && "bg-accent"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square rounded-lg bg-muted" />
                  <div className="h-2 w-2/3 rounded-lg bg-muted" />
                  <div className="h-2 w-1/2 rounded-lg bg-muted" />
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4">
            <div className="font-medium">Таны хайлтууд</div>
            <div className="mt-4 space-y-2">
              {recentSearches.map((search, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span>{search}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
