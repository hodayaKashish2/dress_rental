'use client';

import { useRef } from 'react';
import type { Review } from '@/lib/types';

type Props = {
  reviews: Review[];
};

export default function ReviewsCarousel({ reviews }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; x: number; left: number } | null>(null);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      left: scroller.scrollLeft,
    };
    scroller.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const scroller = scrollerRef.current;
    if (!drag || !scroller || drag.pointerId !== event.pointerId) return;
    scroller.scrollLeft = drag.left + (event.clientX - drag.x);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (dragRef.current?.pointerId === event.pointerId && scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        dir="rtl"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="reviews-scroller flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-4 active:cursor-grabbing"
      >
        {reviews.map((review) => (
          <article
            key={review.id}
            className="flex w-[min(78vw,24rem)] shrink-0 snap-start flex-col justify-between rounded-2xl border border-[#ead8dc] bg-white p-6 shadow-sm"
          >
            <div>
              <div className="mb-3 flex gap-0.5 text-[#6b2340]">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
              <p className="text-xs italic leading-relaxed text-[#6e5e62]">&quot;{review.text}&quot;</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
              <span className="text-xs font-bold text-neutral-900">{review.name}</span>
              {review.role ? (
                <span className="rounded-full bg-[#f6eef1] px-2 py-0.5 text-[10px] font-bold text-[#6b2340]">
                  {review.role}
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
