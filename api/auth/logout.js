function expiredAuthCookie(request) {
  const host = request.headers.host || '';
  const forwardedProto = request.headers['x-forwarded-proto'];
  const secure = forwardedProto === 'https' || host.endsWith('.vercel.app');
  const parts = [
    'kanimath-auth=',
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0'
  ];

  if (secure) {
    parts.push('Secure');
  }

  return parts.join('; ');
}

module.exports = function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  response.setHeader('Set-Cookie', expiredAuthCookie(request));
  response.status(200).json({ ok: true });
};
