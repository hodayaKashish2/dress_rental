import type { SupabaseClient } from '@supabase/supabase-js';

export type SiteUserProfileRow = {
  id: string;
  username: string;
  display_name: string;
  phone: string;
  email: string;
  marketing_emails_opt_in: boolean;
};

const PROFILE_COLUMNS =
  'id, username, display_name, phone, email, marketing_emails_opt_in';
const PROFILE_COLUMNS_LEGACY = 'id, username, display_name, phone, email';

export function isMissingMarketingOptInColumn(message: string) {
  const normalized = message.toLowerCase();
  return normalized.includes('marketing_emails_opt_in');
}

export function marketingOptInUpgradeHint() {
  return 'חסרה עמודת marketing_emails_opt_in. הריצי את supabase/upgrade-v15-marketing-opt-in.sql ב-Supabase SQL Editor.';
}

export const EMAIL_ALREADY_USED_MESSAGE =
  'כתובת האימייל הזו כבר רשומה אצל משתמשת אחרת';

export async function isEmailUsedByAnotherUser(
  supabase: SupabaseClient,
  email: string,
  exceptUserId?: string
) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;

  const pattern = normalized.replace(/[%_\\]/g, '\\$&');
  let query = supabase.from('site_users').select('id').ilike('email', pattern).limit(5);
  if (exceptUserId) query = query.neq('id', exceptUserId);

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).some((row) => String(row.id) !== String(exceptUserId || ''));
}

function mapProfileRow(
  row: Record<string, unknown>,
  hasMarketingColumn: boolean
): SiteUserProfileRow {
  return {
    id: String(row.id),
    username: String(row.username ?? ''),
    display_name: String(row.display_name ?? ''),
    phone: String(row.phone ?? ''),
    email: String(row.email ?? ''),
    marketing_emails_opt_in: hasMarketingColumn
      ? Boolean(row.marketing_emails_opt_in)
      : false,
  };
}

export async function selectSiteUserProfile(
  supabase: SupabaseClient,
  userId: string
): Promise<{ profile: SiteUserProfileRow | null; hasMarketingColumn: boolean }> {
  const withMarketing = await supabase
    .from('site_users')
    .select(PROFILE_COLUMNS)
    .eq('id', userId)
    .maybeSingle();

  if (!withMarketing.error && withMarketing.data) {
    return {
      profile: mapProfileRow(withMarketing.data as Record<string, unknown>, true),
      hasMarketingColumn: true,
    };
  }

  if (withMarketing.error && !isMissingMarketingOptInColumn(withMarketing.error.message)) {
    throw withMarketing.error;
  }

  const legacy = await supabase
    .from('site_users')
    .select(PROFILE_COLUMNS_LEGACY)
    .eq('id', userId)
    .maybeSingle();

  if (legacy.error) throw legacy.error;
  if (!legacy.data) return { profile: null, hasMarketingColumn: false };

  return {
    profile: mapProfileRow(legacy.data as Record<string, unknown>, false),
    hasMarketingColumn: false,
  };
}

export async function updateSiteUserProfile(
  supabase: SupabaseClient,
  userId: string,
  updates: {
    display_name: string;
    phone: string;
    email: string;
    marketing_emails_opt_in?: boolean;
  }
) {
  const basePayload = {
    display_name: updates.display_name,
    phone: updates.phone,
    email: updates.email,
  };

  const payloadWithMarketing =
    updates.marketing_emails_opt_in !== undefined
      ? { ...basePayload, marketing_emails_opt_in: updates.marketing_emails_opt_in }
      : basePayload;

  const withMarketing = await supabase
    .from('site_users')
    .update(payloadWithMarketing)
    .eq('id', userId)
    .select(PROFILE_COLUMNS)
    .single();

  if (!withMarketing.error && withMarketing.data) {
    return {
      profile: mapProfileRow(withMarketing.data as Record<string, unknown>, true),
      hasMarketingColumn: true,
    };
  }

  if (
    withMarketing.error &&
    isMissingMarketingOptInColumn(withMarketing.error.message)
  ) {
    const legacy = await supabase
      .from('site_users')
      .update(basePayload)
      .eq('id', userId)
      .select(PROFILE_COLUMNS_LEGACY)
      .single();

    if (legacy.error) throw legacy.error;
    return {
      profile: mapProfileRow(legacy.data as Record<string, unknown>, false),
      hasMarketingColumn: false,
      marketingOptInSkipped: updates.marketing_emails_opt_in !== undefined,
    };
  }

  if (withMarketing.error) throw withMarketing.error;
  throw new Error('עדכון פרופיל נכשל');
}
