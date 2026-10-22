import { NextResponse } from 'next/server';
import { supabaseEnvStatus } from '@/lib/supabase/server';
import { getEmailConfigStatus } from '@/lib/email';

export async function GET() {
  const supabase = supabaseEnvStatus();
  const hint = 'מאגר ניסוי — אין חיבור ל-Supabase. הקטלוג מ-lib/sandbox-catalog.ts';

  return NextResponse.json({
    ok: true,
    sandbox: true,
    supabase,
    adminSecret: false,
    siteUsersTable: false,
    siteUsersError: null,
    email: getEmailConfigStatus(),
    hint,
  });
}
