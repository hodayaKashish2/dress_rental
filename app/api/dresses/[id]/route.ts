import { NextResponse } from 'next/server';
import { getSandboxDressById } from '@/lib/sandbox-catalog';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dress = getSandboxDressById(id);
  if (!dress) {
    return NextResponse.json({ error: 'שמלה לא נמצאה' }, { status: 404 });
  }

  return NextResponse.json(dress, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
  });
}
