'use client';

import type { ReactNode } from 'react';
import DressImageFill from '@/components/DressImageFill';
import type { AdminDressRow } from '@/lib/admin-types';

type AdminDressGridCardProps = {
  dress: AdminDressRow;
  onSelect: () => void;
  badge?: ReactNode;
  disabled?: boolean;
};

export default function AdminDressGridCard({ dress, onSelect, badge, disabled }: AdminDressGridCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-right border rounded-xl overflow-hidden transition-all hover:border-[#111111] hover:shadow-md bg-white ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      } border-[#e6e2d8]`}
    >
      {dress.images?.[0] ? (
        <DressImageFill src={dress.images[0]} alt="" className="w-full h-24 sm:h-28" />
      ) : (
        <div className="w-full h-24 sm:h-28 bg-[#f7f6f3] flex items-center justify-center text-2xl text-[#ddd8ce]">
          👗
        </div>
      )}
      <div className="p-2 space-y-1">
        <div className="flex items-start justify-between gap-1">
          <p className="font-bold text-[11px] sm:text-xs text-[#161513] line-clamp-2 leading-tight flex-1">
            {dress.name}
          </p>
          {badge}
        </div>
        <p className="text-[10px] sm:text-[11px] font-black text-[#111111]">₪{dress.price}</p>
        <p className="text-[9px] text-[#6f6c66] truncate" dir="ltr">
          {dress.owner_phone || dress.city || '—'}
        </p>
        <p className="text-[9px] font-bold text-[#111111]">לחצי לפרטים ›</p>
      </div>
    </button>
  );
}
