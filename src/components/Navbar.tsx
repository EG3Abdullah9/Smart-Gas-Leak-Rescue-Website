import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#problem-criteria', label: 'Overview' },
  { href: '#simulator', label: 'Simulator' },
  { href: '#hardware', label: 'Architecture' },
  { href: '#results-cost', label: 'Validation' },
  { href: '#safety-future', label: 'Safety' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#03050C]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#hero"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-blue-400 transition-colors"
        >
          Smart Gas Rescue
        </a>

        {/* Zone 2: 5 concise single-line text links (desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-white underline-offset-8 hover:underline decoration-[#3B5BFF] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 glowing cobalt primary CTA + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#simulator"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#3B5BFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2F4DF0] shadow-[0_0_24px_rgba(59,91,255,0.35)] transition-all whitespace-nowrap shrink-0 min-h-[40px]"
          >
            Launch Simulator
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-slate-200 hover:bg-white/[0.08] hover:text-white transition-colors min-h-[44px] min-w-[44px]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Animated Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-white/[0.08] bg-[#050814] px-4 py-4 space-y-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/[0.06] hover:text-white transition-colors min-h-[44px]"
              >
                <span>{link.label}</span>
              </a>
            ))}
            <div className="pt-2 sm:hidden">
              <a
                href="#simulator"
                onClick={handleLinkClick}
                className="flex w-full items-center justify-center rounded-lg bg-[#3B5BFF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2F4DF0] shadow-[0_0_24px_rgba(59,91,255,0.35)] transition-colors min-h-[44px]"
              >
                Launch Simulator
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
