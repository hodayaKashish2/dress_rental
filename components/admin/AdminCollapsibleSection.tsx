'use client';

import { useState, type ReactNode } from 'react';

type AdminCollapsibleSectionProps = {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  tone?: 'default' | 'alert';
  action?: ReactNode;
  children: ReactNode;
};

export default function AdminCollapsibleSection({
  title,
  count,
  defaultOpen = false,
  tone = 'default',
  action,
  children,
}: AdminCollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      className={`rounded-2xl border overflow-hidden ${
        tone === 'alert' ? 'border-amber-300 bg-amber-50/80' : 'border-[#e6e2d8] bg-white'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-3 p-4 text-right hover:bg-[#fffafb]/80 transition-colors"
      >
        <span className="text-xs text-[#6f6c66] shrink-0">{open ? '▲' : '▼'}</span>
        <h2
          className={`flex-1 font-black text-base ${
            tone === 'alert' ? 'text-amber-900' : 'text-[#161513]'
          }`}
        >
          {title}
          {count != null && count > 0 && (
            <span className="mr-2 text-sm font-bold text-[#111111]">({count})</span>
          )}
        </h2>
        {action && (
          <span
            className="shrink-0"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {action}
          </span>
        )}
      </button>
      {open && <div className="p-4 pt-0 border-t border-[#e6e2d8]/60">{children}</div>}
    </section>
  );
}

export const ADMIN_DRESS_GRID_CLASS =
  'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-4';
