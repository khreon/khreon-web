export function verifyAgentAuth(request: Request): boolean {
  const apiKey = process.env.BLOG_AGENT_API_KEY;
  if (!apiKey) return false;

  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  return token === apiKey;
}
