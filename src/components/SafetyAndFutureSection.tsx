import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BatteryCharging,
  ChevronDown,
  Factory,
  FileDown,
  Power,
  RotateCcw,
  ShieldCheck,
  Sun,
  Wifi,
} from 'lucide-react';
import {
  FAIL_SAFE_PROTOCOLS,
  JUDGE_QA,
  SCALE_UP_ROADMAP,
} from '../data/projectData';

const FAILSAFE_ICONS = {
  isolation: Power,
  'backup-battery': BatteryCharging,
  'manual-reset': RotateCcw,
};

const SCALEUP_ICONS = {
  'esp32-iot': Wifi,
  'industrial-valve': Factory,
  'solar-power': Sun,
};

export default function SafetyAndFutureSection() {
  const [openQaIndex, setOpenQaIndex] = useState<number | null>(0);

  return (
    <div id="safety-future">
      {/* 10, 11 & 12: Fail-Safe, Scale-Up & Societal Impact */}
      <section className="bg-[#03050C] border-b border-white/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-20 sm:space-y-24">
          {/* 10. Fail-Safe Safety Protocols */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mb-8 sm:mb-10"
            >
              <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
                10. Safety Protocols
              </p>
              <h2
                className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Fail-Safe Engineering Standards
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {FAIL_SAFE_PROTOCOLS.map((item, idx) => {
                const Icon = FAILSAFE_ICONS[item.id as keyof typeof FAILSAFE_ICONS];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-white/[0.09] bg-[#080D1B] p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#3B5BFF]/30 bg-[#3B5BFF]/15 text-blue-300">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 11. Scale-Up Roadmap */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mb-8 sm:mb-10"
            >
              <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
                11. Future Scale-Up Vision
              </p>
              <h2
                className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Commercialization &amp; IoT Expansion
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {SCALE_UP_ROADMAP.map((item, idx) => {
                const Icon = SCALEUP_ICONS[item.id as keyof typeof SCALEUP_ICONS];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-white/[0.09] bg-[#080D1B] p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-500/15 text-sky-300">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 12. Societal Impact & ISEF Judge Q&A */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
                  12. Societal Impact
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Protecting Lives &amp; Property at Scale
                </h2>
              </div>

              <div className="rounded-xl border border-[#3B5BFF]/30 bg-[#09122B] p-6">
                <h3 className="text-base font-bold text-white mb-1.5">
                  Accessible Household Protection
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Delivers a practical engineering solution that eliminates residential asphyxiation and fire hazards from gas leaks at an affordable sub-400 EGP price point.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/25 p-6">
                <h3 className="text-base font-bold text-white mb-1.5">
                  Instant Mechanical Response
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Transitions directly from passive audio warnings—ineffective during human absence—to deterministic mechanical isolation within 3 seconds.
                </p>
              </div>
            </div>

            {/* Interactive ISEF Judging Q&A with AnimatePresence */}
            <div className="lg:col-span-7 rounded-xl border border-white/[0.09] bg-[#080D1B] p-6 sm:p-8">
              <div className="mb-5 pb-4 border-b border-white/[0.08]">
                <h3 className="text-lg font-bold text-white">
                  Engineering Review &amp; ISEF Jury Q&amp;A
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Technical answers addressing spark isolation, calibration thresholds, and power outages
                </p>
              </div>

              <div className="divide-y divide-white/[0.08]">
                {JUDGE_QA.map((item, idx) => {
                  const isOpen = openQaIndex === idx;
                  return (
                    <div key={item.q} className="py-3.5 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenQaIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 text-left py-2 font-bold text-sm sm:text-base text-white hover:text-blue-400 transition-colors min-h-[44px]"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-blue-400' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pt-1 pb-2 text-sm text-slate-400 leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing & Footer */}
      <footer className="relative bg-[#03050C] text-white py-16 sm:py-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[320px] w-[720px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,91,255,0.16)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#3B5BFF]/20 border border-[#3B5BFF]/40 text-blue-300 mx-auto">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Smart Gas Leak Rescue System
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Engineered to ISEF standards — ready for technical evaluation and residential deployment.
          </p>

          <div className="inline-block rounded-xl border border-white/10 bg-[#080D1B] px-6 py-3.5 text-sm font-semibold text-slate-200">
            Designed &amp; Engineered by Abdallah Mohamed Fahmy Abdelnaby
          </div>

          <div className="pt-2">
            <a
              href="/assets/aistudio/Smart_Gas_Leak_Rescue_System_Presentation_ecad2a87.pdf"
              download="Smart_Gas_Leak_Rescue_System_Presentation.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5BFF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2F4DF0] shadow-[0_0_28px_rgba(59,91,255,0.38)] transition-all min-h-[44px]"
            >
              <FileDown className="h-4 w-4" />
              <span>Download Original Presentation (PDF)</span>
            </a>
          </div>

          <div className="pt-10 mt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>Smart Gas Leak Rescue System · ISEF Engineering Project</span>
            <div className="flex items-center gap-6">
              <a href="#hero" className="hover:text-white transition-colors">
                Top
              </a>
              <a href="#simulator" className="hover:text-white transition-colors">
                Simulator
              </a>
              <a href="#results-cost" className="hover:text-white transition-colors">
                Validation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
