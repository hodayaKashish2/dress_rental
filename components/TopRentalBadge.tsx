type Props = {
  rank: number;
  compact?: boolean;
};

const RANK_COPY: Record<number, { icon: string; title: string; subtitle: string }> = {
  1: { icon: '🏆', title: 'הכי מושכרת', subtitle: 'גביע · מקום 1 בקטלוג' },
  2: { icon: '🥈', title: 'מושכרת מאוד', subtitle: 'מקום 2 בקטלוג' },
  3: { icon: '🥉', title: 'פופולרית', subtitle: 'מקום 3 בקטלוג' },
};

export default function TopRentalBadge({ rank, compact = false }: Props) {
  const copy = RANK_COPY[rank];
  if (!copy) return null;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 bg-gradient-to-l from-[#161513] to-[#4a3f2b] text-[#f4ebd4] px-2 py-0.5 rounded-full text-[9px] font-black border border-[#111111]/40">
        <span aria-hidden>{copy.icon}</span>
        <span>{copy.title}</span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#cfc8bc] bg-gradient-to-l from-[#ffffff] via-[#f8efd8] to-[#eeece7] px-2.5 py-2 shadow-sm">
      <span className="text-lg sm:text-xl shrink-0" aria-hidden>
        {copy.icon}
      </span>
      <div className="min-w-0 text-right leading-tight">
        <p className="text-[10px] sm:text-[11px] font-black text-[#161513]">{copy.title}</p>
        <p className="text-[8px] sm:text-[9px] text-[#111111] font-bold">{copy.subtitle}</p>
      </div>
    </div>
  );
}
