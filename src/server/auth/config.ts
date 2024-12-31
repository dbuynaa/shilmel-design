// import { PrismaAdapter } from '@auth/prisma-adapter';
import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { DefaultJWT } from 'next-auth/jwt';
import { compare } from 'bcryptjs';
import { db } from '@/server/db';
import { z } from 'zod';
import { UserRole, type User } from '@prisma/client';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    role: UserRole;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: UserRole;
    email: string;
    name: string;
    image: string | null;
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user ?? undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/',
    error: '/',
    signOut: '/',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      if (isOnAdmin) {
        if (!isLoggedIn) return false; // Redirect to login page
        return true; // Allow access to admin
      }

      return true; // Allow access to public pages
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? '';
        token.email = user.email ?? '';
        token.image = user.image ?? null;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (!user) return null;

        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
