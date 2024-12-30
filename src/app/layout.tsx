import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { TRPCReactProvider } from '@/trpc/react';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/server/auth';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="mn">
      <body className={inter.className}>
        <TRPCReactProvider>
          <SessionProvider session={session}>
            <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
            <Toaster />
            {children}
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
