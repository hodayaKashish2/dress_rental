import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

export default function ContentPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f6f3] text-[#161513]" dir="rtl">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#161513] sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-3 text-sm leading-relaxed text-[#6f6c66]">{subtitle}</p>}
          <div className="mx-auto mt-4 h-px w-12 bg-[#111111]" />
        </div>
        <div className="space-y-4 rounded-2xl border border-[#e6e2d8] bg-white p-6 text-sm leading-relaxed text-[#4a3d41] shadow-sm sm:p-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
