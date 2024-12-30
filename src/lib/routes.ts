/**
 * Default redirect path for authenticated users
 */
export const DEFAULT_REDIRECT = '/';

/**
 * List of public routes that don't require authentication
 */
export const PUBLIC_ROUTES = ['/', '/about', '/contact', '/privacy', '/terms'];

export const PRIVATE_ROUTES = [
  '/admin',
  '/admin/users',
  '/admin/products',
  '/admin/orders',
  '/admin/settings',
];
