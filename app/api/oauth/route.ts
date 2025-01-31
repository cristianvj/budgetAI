import { createAdminClient } from '@/lib/appwrite';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');
  const userAgent = request.headers.get('user-agent');

  const { account } = await createAdminClient(userAgent);
  const session = await account.createSession(userId!, secret!);

  (await cookies()).set('appwrite-session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/sign-in`);
}
