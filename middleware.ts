import { decodeJwt } from 'jose';

declare const process: {
  env: Record<string, string | undefined>;
};

const AUTH_COOKIE = 'kanimath-auth';
const PUBLIC_PATHS = new Set([
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/auth/callback'
]);

function getCookie(request: Request, name: string) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : '';
}

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/auth/') ||
    pathname === '/favicon.ico' ||
    pathname === '/vite.svg' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\.[a-zA-Z0-9]+$/.test(pathname) && !pathname.startsWith('/assessments/')
  );
}

function redirectToLogin(request: Request) {
  const url = new URL(request.url);
  const loginUrl = new URL('/login', url.origin);
  loginUrl.searchParams.set('redirectTo', `${url.pathname}${url.search}${url.hash}`);
  return Response.redirect(loginUrl, 302);
}

function isExpired(token: string) {
  try {
    const decoded = decodeJwt(token);
    return typeof decoded.exp === 'number' && decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

async function isValidSupabaseToken(token: string) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || isExpired(token)) {
    return false;
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token}`
    }
  });

  return response.ok;
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (PUBLIC_PATHS.has(pathname) || isPublicAsset(pathname)) {
    return;
  }

  const token = getCookie(request, AUTH_COOKIE);
  if (!token || !(await isValidSupabaseToken(token))) {
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: ['/((?!.*\\.(?:css|js|map|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf)$).*)']
};
