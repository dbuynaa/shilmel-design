import { useActionState, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { CircleAlertIcon, User } from 'lucide-react';
import { loginSchema } from '@/lib/schemas';
import { Separator } from './ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { authenticate } from '@/lib/actions';
import { z } from 'zod';

type UserFormValue = z.infer<typeof loginSchema>;

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const form = useForm<UserFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button asChild variant="ghost" size="icon">
          <User className="cursor-pointer p-2 hover:text-pink-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Нэвтрэх</DialogTitle>
          <DialogDescription>
            Нэвтрэх хамгийн хялбар бөгөөд аюулгүй арга - нууц үг шаардлагагүй
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className="w-full space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Үйлчлүүлэгчийн имэйл хаяг..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Нууц үг..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isPending ? ' ' : 'Үргэлжлүүлэх'}
            </Button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <CircleAlertIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </form>
        </Form>
        <div className="relative mt-4 flex items-center justify-center gap-4 overflow-hidden">
          <Separator />
          <span className="text-sm text-gray-500">Эсвэл</span>
          <Separator />
        </div>

        <Button variant={'outline'} className="w-full">
          Байгууллагаар нэвтрэх
        </Button>
      </DialogContent>
    </Dialog>
  );
}
