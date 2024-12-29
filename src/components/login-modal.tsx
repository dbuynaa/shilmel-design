"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { User } from "lucide-react";
import { Separator } from "./ui/separator";

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

  //   const openModal = () => setIsOpen(true);
  //   const closeModal = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-14 w-14" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Нэвтрэх</DialogTitle>
          <DialogDescription>
            Нэвтрэх хамгийн хялбар бөгөөд аюулгүй арга - нууц үг шаардлагагүй
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="space-y-4">
            <Input type="email" placeholder="И-мэйл" required />
            <Button type="submit" className="w-full">
              Үргэлжлүүлэх
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center gap-4 mt-4 relative overflow-hidden">
          <Separator />
          <span className="text-gray-500 text-sm">Эсвэл</span>
          <Separator />
        </div>

        <Button variant={"outline"} className="w-full">
          Байгууллагаар нэвтрэх
        </Button>
      </DialogContent>
    </Dialog>
  );
}
