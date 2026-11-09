'use client';

import { useEffect } from 'react';

export type SiteToastVariant = 'success' | 'info' | 'error';

type Props = {
  message: string;
  variant?: SiteToastVariant;
  onClose: () => void;
  durationMs?: number;
};

const styles: Record<SiteToastVariant, string> = {
  success: 'bg-[#fffafb] border-[#111111] text-[#161513]',
  info: 'bg-white border-[#ddd8ce] text-[#161513]',
  error: 'bg-red-50 border-red-200 text-red-800',
};

const icons: Record<SiteToastVariant, string> = {
  success: '✓',
  info: 'ℹ️',
  error: '!',
};

export default function SiteToast({
  message,
  variant = 'success',
  onClose,
  durationMs = 3200,
}: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timer);
  }, [onClose, durationMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-[90] w-[min(92vw,22rem)] px-4 py-3 rounded-2xl border-2 shadow-2xl backdrop-blur-sm"
      style={{ direction: 'rtl' }}
    >
      <div className={`flex items-start gap-3 rounded-xl px-3 py-2.5 border ${styles[variant]}`}>
        <span className="shrink-0 w-6 h-6 rounded-full bg-[#eeece7] text-[#111111] text-xs font-black flex items-center justify-center">
          {icons[variant]}
        </span>
        <p className="text-xs sm:text-sm leading-relaxed font-medium">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-[#6f6c66] hover:text-[#111111] text-sm font-bold"
          aria-label="סגור"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
