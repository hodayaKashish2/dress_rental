import Link from 'next/link';
import { CATALOG_PLATFORM_NOTICE } from '@/lib/commission';

/** שורת מידע קומפקטית בראש הקטלוג */
export default function CatalogPlatformNotice() {
  const { headline, message, termsLabel } = CATALOG_PLATFORM_NOTICE;

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-[#d4b4bb]/55 bg-gradient-to-l from-[#fffdf9] via-white to-[#faf6ee] shadow-sm">
      <div className="h-0.5 bg-gradient-to-l from-[#6b2340]/80 via-[#6b2340] to-[#4a152c]/80" aria-hidden />

      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-1.5 text-center sm:text-right">
          <p className="text-xs font-bold leading-relaxed text-[#6b2340] sm:text-[13px]">{headline}</p>
          <p className="text-[11px] leading-relaxed text-[#6e5e62] sm:text-xs">{message}</p>
        </div>

        <Link
          href="/terms"
          className="shrink-0 self-center text-[11px] font-bold text-[#4a152c] underline underline-offset-[3px] transition-colors hover:text-[#6b2340] sm:self-start"
        >
          {termsLabel} →
        </Link>
      </div>
    </div>
  );
}
