'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Dress } from '@/lib/types';

type DressRating = {
  id: string;
  customer_name: string;
  stars: number;
  review_text: string;
};

type Props = {
  dress: Dress;
};

export default function DressRatingsSection({ dress }: Props) {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState<DressRating[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const loadRatings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/dress-ratings?dressId=${encodeURIComponent(dress.id)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאה בטעינת דירוגים');
      setRatings(Array.isArray(data) ? data : []);
      setLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת דירוגים');
    } finally {
      setLoading(false);
    }
  }, [dress.id]);

  useEffect(() => {
    if (open && !loaded && !loading) {
      loadRatings();
    }
  }, [open, loaded, loading, loadRatings]);

  if (dress.rating_count <= 0) return null;

  return (
    <div className="bg-white border border-[#e6e2d8] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 p-4 text-right cursor-pointer transition-colors hover:bg-[#fffafb]"
      >
        <span className="text-[10px] font-black text-[#111111]">דירוגים</span>
        <span className="text-xs text-[#111111] font-bold flex items-center gap-1.5">
          ⭐ {dress.rating_avg} · {dress.rating_count} דירוגים
          <span className="text-[10px] text-[#6f6c66]">{open ? '▲' : '▼ צפי'}</span>
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#e6e2d8]">
          {loading && <p className="text-xs text-[#111111] text-center py-3">טוענת דירוגים...</p>}
          {!loading && error && <p className="text-xs text-red-700 text-center py-3">{error}</p>}
          {!loading && !error && ratings.length === 0 && (
            <p className="text-xs text-[#6f6c66] text-center py-3">עדיין אין דירוגים עם טקסט לשמלה זו.</p>
          )}
          {!loading &&
            !error &&
            ratings.map((rating) => (
              <article
                key={rating.id}
                className="bg-[#fffafb] border border-[#e6e2d8] rounded-lg p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-black text-[#161513]">{rating.customer_name}</p>
                  <p className="text-xs text-[#111111] font-bold" aria-label={`${rating.stars} כוכבים`}>
                    {'⭐'.repeat(rating.stars)}
                  </p>
                </div>
                <p className="text-sm text-[#6f6c66] leading-relaxed whitespace-pre-wrap">
                  {rating.review_text?.trim() || 'ללא טקסט — רק דירוג כוכבים'}
                </p>
              </article>
            ))}
        </div>
      )}
    </div>
  );
}
