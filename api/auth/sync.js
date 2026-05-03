const { createClient } = require('@supabase/supabase-js');

function getSupabaseConfig() {
  return {
    url: process.env.VITE_SUPABASE_URL,
    anonKey: process.env.VITE_SUPABASE_ANON_KEY
  };
}

function serializeAuthCookie(token, maxAge, request) {
  const host = request.headers.host || '';
  const forwardedProto = request.headers['x-forwarded-proto'];
  const secure = forwardedProto === 'https' || host.endsWith('.vercel.app');
  const parts = [
    `kanimath-auth=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`
  ];

  if (secure) {
    parts.push('Secure');
  }

  return parts.join('; ');
}

function parseBody(body) {
  if (typeof body !== 'string') {
    return body;
  }

  try {
    return JSON.parse(body || '{}');
  } catch {
    return {};
  }
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    response.status(500).json({ error: 'Supabase environment variables are missing.' });
    return;
  }

  const body = parseBody(request.body);
  const accessToken = body?.accessToken;
  if (!accessToken || typeof accessToken !== 'string') {
    response.status(400).json({ error: 'Missing access token.' });
    return;
  }

  const supabase = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data?.user) {
    response.status(401).json({ error: 'Invalid Supabase session.' });
    return;
  }

  response.setHeader('Set-Cookie', serializeAuthCookie(accessToken, 60 * 60, request));
  response.status(200).json({ ok: true });
};
