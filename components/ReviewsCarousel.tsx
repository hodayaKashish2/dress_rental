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
            className="flex w-[min(78vw,18rem)] shrink-0 snap-start flex-col items-center rounded-2xl bg-[#fbf3f7] px-6 py-7 text-center"
          >
            <div className="mb-3 flex gap-0.5 text-[#c2185b]">
              {Array.from({ length: review.stars }).map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>
            <p className="text-sm font-bold leading-relaxed text-[#2a1f22]">&quot;{review.text}&quot;</p>
            <p className="mt-4 text-xs text-[#6f6570]">
              {review.name}
              {review.role ? ` · ${review.role}` : ''}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
