import { OWNER_FORM_NOTICE } from '@/lib/commission';

/** באנר קצר למשכירות — בטופס פרסום שמלה בלבד */
export default function OwnerPlatformNotice() {
  return (
    <div className="bg-gradient-to-l from-[#fffafb] to-[#eeece7] border border-[#cfc8bc] rounded-xl p-4 text-[11px] text-[#6f6c66] leading-relaxed">
      <p className="font-black text-[#111111] text-center mb-2">✦ {OWNER_FORM_NOTICE.headline} ✦</p>
      <ul className="space-y-1.5">
        {OWNER_FORM_NOTICE.bullets.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="text-[#111111] shrink-0">✓</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
