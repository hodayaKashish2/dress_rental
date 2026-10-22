import { NextResponse } from 'next/server';
import { SANDBOX_REVIEWS } from '@/lib/sandbox-catalog';

export async function GET() {
  return NextResponse.json(SANDBOX_REVIEWS);
}
