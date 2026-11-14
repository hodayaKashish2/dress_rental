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
    if ((event.target as HTMLElement).closest('[data-review-text]')) return;
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
        className="reviews-scroller flex w-full min-w-0 cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-4 touch-pan-x active:cursor-grabbing sm:gap-4"
      >
        {reviews.map((review) => (
          <article
            key={review.id}
            className="flex w-[62%] max-w-[15rem] shrink-0 snap-start flex-col rounded-2xl border border-[#ead8dc] bg-white p-4 shadow-sm sm:w-60 sm:p-5"
          >
            <div>
              <div className="mb-3 flex gap-0.5 text-[#6b2340]">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
              <div
                data-review-text
                className="max-h-24 overflow-y-auto overscroll-y-contain pe-1 text-sm italic leading-relaxed text-[#6e5e62] touch-pan-y [scrollbar-color:#6b2340_transparent] [scrollbar-width:thin] sm:max-h-28 sm:text-xs"
              >
                <p>&quot;{review.text}&quot;</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-3">
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
