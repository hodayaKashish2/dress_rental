import type { Dress } from '@/lib/types';
import { dressKindLabel, listingTypeLabel } from '@/lib/dress-listing';
import RentalCountBadge from '@/components/RentalCountBadge';

type Props = {
  dress: Dress;
  onShowDetails: () => void;
};

export default function DressCardSummary({ dress, onShowDetails }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 text-[10px]">
        <RentalCountBadge dress={dress} />
        {dress.city && (
          <span className="rounded-full bg-[#f4f3ef] px-2.5 py-0.5 font-bold text-[#111111]">
            {dress.city}
          </span>
        )}
        {dress.listing_type === 'sale' ? (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-bold text-emerald-800">
            {listingTypeLabel(dress.listing_type)}
          </span>
        ) : (
          <span className="rounded-full bg-[#f4f3ef] px-2.5 py-0.5 font-bold text-[#111111]">
            {listingTypeLabel(dress.listing_type)}
          </span>
        )}
        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[#6f6c66]">
          {dressKindLabel(dress.event_type)}
        </span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onShowDetails();
        }}
        className="cursor-pointer text-[11px] font-bold text-[#111111] underline underline-offset-2 transition-colors hover:text-[#2a2a2a]"
      >
        פרטים מלאים
      </button>
    </div>
  );
}
