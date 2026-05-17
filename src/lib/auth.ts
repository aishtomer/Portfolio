import { headers } from 'next/headers';

export async function isAuthenticated() {
  const headersList = await headers();
  const authHeader = headersList.get('authorization');
  if (!authHeader) return false;
  
  const token = authHeader.split(' ')[1];
  return token === process.env.ADMIN_PASSWORD;
}
