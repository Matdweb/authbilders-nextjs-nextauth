import { NextRequest, NextResponse } from 'next/server';
import { verifyUserEmail } from '@/app/lib/(AuthBilders)/dal/queries';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
  }

  try {
    const res = verifyUserEmail(email);
    if (!res) {
      return NextResponse.json({ message: 'Email not found or already verified' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Email verified' });
  } catch {
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
