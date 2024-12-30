import { PRIVATE_ROUTES, DEFAULT_REDIRECT } from '@/lib/routes';
import NextAuth from 'next-auth';
import { authConfig } from './server/auth/config';
import { UserRole } from '@prisma/client';

// Initialize auth
const { auth } = NextAuth(authConfig);

export default auth(function middleware(req) {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isAdmin = req.auth?.user?.role === UserRole.ADMIN;
  const isPrivateRoute = PRIVATE_ROUTES.includes(nextUrl.pathname);

  // Redirect to home if user is not admin and tries to access private route
  if (isPrivateRoute && isAdmin && nextUrl.pathname === '/admin') {
    return Response.redirect(new URL('/admin/dashboard'));
  } else if (!isAuthenticated && isPrivateRoute && !isAdmin) {
    return Response.redirect(new URL(DEFAULT_REDIRECT).pathname);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
