import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#problem-criteria', label: 'المشكلة والهدف' },
  { href: '#simulator', label: 'المحاكي التفاعلي' },
  { href: '#hardware', label: 'المكونات' },
  { href: '#results-cost', label: 'النتائج والتكلفة' },
  { href: '#safety-future', label: 'الأمان والتطوير' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0F172A]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#hero"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-orange-400 transition-colors"
        >
          نظام الإنقاذ الذكي
        </a>

        {/* Zone 2: 5 concise single-line text links (desktop) */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-white underline-offset-8 hover:underline decoration-orange-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#simulator"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-500 transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
          >
            جرّب المحاكي
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="inline-flex lg:hidden items-center justify-center rounded-lg border border-slate-700 bg-slate-800/70 p-2.5 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors min-h-[44px] min-w-[44px]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="قائمة الجوال"
          className="lg:hidden border-t border-slate-800 bg-[#0F172A] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors min-h-[44px]"
            >
              <span>{link.label}</span>
            </a>
          ))}
          <div className="pt-2 sm:hidden">
            <a
              href="#simulator"
              onClick={handleLinkClick}
              className="flex w-full items-center justify-center rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-colors min-h-[44px]"
            >
              جرّب المحاكي التفاعلي
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
