import type { SupabaseClient } from '@supabase/supabase-js';

const SANDBOX_MESSAGE =
  'מאגר ניסוי (dress_rental) — אין חיבור ל-Supabase. הקטלוג נטען משמלות לדוגמה בקוד.';

/**
 * מאגר ניסוי: תמיד מנותק ממסד הייצור.
 * גם אם יש מפתחות ב-.env — לא מתחברים.
 */
export function getSupabaseAdmin(): SupabaseClient {
  throw new Error(SANDBOX_MESSAGE);
}

export function isSupabaseConfigured(): boolean {
  return false;
}

export function supabaseEnvStatus() {
  return {
    hasUrl: false,
    hasServiceKey: false,
    configured: false,
    urlHost: null as string | null,
    keyLength: 0,
    sandbox: true,
    hint: SANDBOX_MESSAGE,
  };
}

