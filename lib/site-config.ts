export const SITE_NAME = 'שמלה בקליק';

/** כותרת ברירת מחדל לדפדפן ולתוצאות חיפוש */
export const SITE_SEO_TITLE = 'שמלה בקליק | שמלות ערב צנועות — תיווך השכרה ומכירה';

export const SITE_SEO_DESCRIPTION =
  'תיווך שמלות ערב בין בנות — השכרה ומכירה. פרסמי שמלה מהארון או מצאי שמלת ערב לאירוע שלך.';

export const SITE_SEO_KEYWORDS = [
  'שמלות ערב צנועות',
  'שמלת ערב צנועה',
  'השכרת שמלות ערב',
  'מכירת שמלות ערב',
  'שמלות צנועות',
  'תיווך שמלות',
  'השכרת שמלות',
  'מכירת שמלות',
  'שמלה בקליק',
];

export const SITE_HERO_TAGLINE = 'שמלות ערב צנועות — תיווך השכרה ומכירה';

export const DEFAULT_ADMIN_EMAIL = 'dressbclick@gmail.com';

export const LEGACY_ADMIN_EMAIL = 'hodayaka1212@gmail.com';

export function resolveSiteEmail(email?: string | null) {
  const value = (email || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
  if (
    !value ||
    value === LEGACY_ADMIN_EMAIL ||
    value.includes('hodayaka1212')
  ) {
    return DEFAULT_ADMIN_EMAIL;
  }
  return value;
}

/** כתובת המייל הראשית של האתר — תמיד dressbclick אלא אם הוגדר מייל חדש במפורש */
export function getSiteAdminEmail() {
  return resolveSiteEmail(process.env.ADMIN_EMAIL);
}

export const CONTACT_EMAIL = getSiteAdminEmail();

export const CONTACT_PHONE = '053-420-1133';

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '972534201133';

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('היי, אשמח לפרטים על שמלה מהאתר')}`;

function withScheme(value: string) {
  const trimmed = value.trim().replace(/\/$/, '');
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/** כתובת אתר הבדיקות. לא משתמשים בכתובת של האתר החי. */
export function getServerAppUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) return withScheme(configured);

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) return withScheme(productionHost);

  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost) return withScheme(vercelHost);

  return 'http://localhost:3002';
}

/** נתיב סודי לפאנל הניהול — לא מופיע בתפריט */
export const ADMIN_PANEL_PATH = 'hodaya0527640';

export function adminPanelUrl() {
  return `${getServerAppUrl()}/${ADMIN_PANEL_PATH}`;
}

export function getPublicAppUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/$/, '');
  }
  return getServerAppUrl();
}

export function accountReservationsUrl() {
  return `${getServerAppUrl()}/account?section=reservations`;
}

export function accountRentalsUrl() {
  return `${getServerAppUrl()}/account?section=rentals`;
}

export function accountAddDressUrl() {
  return `${getServerAppUrl()}/account?section=add`;
}

export function completeBookingUrl(bookingId: number | string) {
  return `${getServerAppUrl()}/account?section=reservations&completeBooking=${bookingId}`;
}

export function dressShareUrl(dressName: string, dressId: string) {
  const base = getPublicAppUrl();
  return `${base}/dress/${encodeURIComponent(dressId)}?text=${encodeURIComponent(`שמתי לב לשמלה "${dressName}" באתר ${SITE_NAME}`)}`;
}

export function dressPageUrl(dressId: string) {
  return `${getPublicAppUrl()}/dress/${encodeURIComponent(dressId)}`;
}

export function ownerWhatsAppLink(phone: string, dressName: string) {
  const digits = phone.replace(/\D/g, '');
  const wa = digits.startsWith('972')
    ? digits
    : digits.startsWith('0')
      ? `972${digits.slice(1)}`
      : `972${digits}`;
  const text = encodeURIComponent(`היי, מעוניינת בשמלה "${dressName}" מהאתר ${SITE_NAME}`);
  return `https://wa.me/${wa}?text=${text}`;
}
