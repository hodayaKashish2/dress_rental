'use client';

import { SITE_HERO_TAGLINE, SITE_NAME } from '@/lib/site-config';

const HERO_IMAGE = '/hero.jpg?v=3';

const steps = [
  { n: '1', title: 'מחפשת שמלה', text: 'סנני לפי מידה, עיר ומחיר' },
  { n: '2', title: 'בוחרת מהקטלוג', text: 'פותחות כרטיס ורואות את כל הפרטים' },
  { n: '3', title: 'משריינת באתר', text: 'שולחות בקשה למשכירה במקום אחד' },
];

const readable = {
  textShadow: '0 1px 2px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.35)',
} as const;

type Props = {
  onAddDress: () => void;
};

export default function SiteHero({ onAddDress }: Props) {
  return (
    <section className="relative isolate">
      <div className="relative min-h-[88vh] overflow-hidden sm:min-h-[92vh]">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center blur-xl"
          style={{
            transform: 'scale(1.08)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, transparent 28%, black 62%, black 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, transparent 28%, black 62%, black 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 42%, rgba(0,0,0,0.12) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-3xl flex-col items-center justify-end px-5 pb-28 pt-28 text-center sm:min-h-[92vh] sm:pb-32">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff4b2b]">
            {SITE_HERO_TAGLINE}
          </p>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl">
            {SITE_NAME}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base" style={readable}>
            מחפשת לשכור, או מעוניינת להשכיר?
            <br />
            קטלוג חד, תמונות ברורות, והכול במקום אחד.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#catalog"
              className="rounded-full bg-[#ff4b2b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(255,75,43,0.35)] transition hover:bg-[#e63e22]"
            >
              חיפוש שמלה במאגר
            </a>
            <button
              type="button"
              onClick={onAddDress}
              className="rounded-full border border-white/70 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#111111]"
            >
              פרסום שמלה
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-14 max-w-5xl px-4 pb-4">
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex items-center gap-4 rounded-2xl border border-[#e6e2d8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-sm font-black text-white">
                {step.n}
              </span>
              <div className="text-right">
                <p className="text-sm font-bold text-[#161513]">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#6f6c66]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
