import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  Cpu,
  Fan,
  FileDown,
  Gauge,
  ShieldCheck,
} from 'lucide-react';
import { HERO_METRICS, LAB_TEST_RESULTS } from '../data/projectData';

type PreviewTab = 'telemetry' | 'calibration' | 'valve' | 'purge';

const PREVIEW_TABS: { id: PreviewTab; label: string; Icon: typeof Activity }[] = [
  { id: 'telemetry', label: 'Telemetry', Icon: Activity },
  { id: 'calibration', label: 'MQ-2 Sensor', Icon: Gauge },
  { id: 'valve', label: 'SG90 Valve', Icon: Cpu },
  { id: 'purge', label: 'Relay Purge', Icon: Fan },
];

const TAB_DETAILS: Record<
  PreviewTab,
  { title: string; subtitle: string; readout: string; metricLabel: string }
> = {
  telemetry: {
    title: 'Autonomous Rescue Loop',
    subtitle: 'Sub-3s intervention verified across all LPG/Methane trials',
    readout: '1.7s – 2.7s',
    metricLabel: 'Total Actuation Window',
  },
  calibration: {
    title: 'SnO₂ Chemiresistive Array',
    subtitle: 'Continuous analog sampling on A0 with 400 PPM hard trigger',
    readout: '200 – 10,000',
    metricLabel: 'Detection Range (PPM)',
  },
  valve: {
    title: 'SG90 90° Mechanical Shutoff',
    subtitle: '2.5 kg/cm torque seals residential ball valves immediately',
    readout: '90° LOCKED',
    metricLabel: 'Fail-Safe Valve Angle',
  },
  purge: {
    title: '5V Opto-Isolated Relay',
    subtitle: '10A/250V AC switching clears gas without spark exposure',
    readout: '250V AC',
    metricLabel: 'Isolated Exhaust Control',
  },
};

export default function HeroSection() {
  const [activePreview, setActivePreview] = useState<PreviewTab>('telemetry');
  const activeDetail = TAB_DETAILS[activePreview];

  return (
    <section
      id="hero"
      className="relative bg-[#03050C] text-white border-b border-white/[0.08] overflow-hidden"
    >
      {/* Volumetric Atmospheric Spotlight Rays matching reference aesthetic */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.42, 0.62, 0.42] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-48 left-1/2 -translate-x-1/2 h-[540px] w-[960px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,91,255,0.28)_0%,rgba(37,99,235,0.09)_45%,transparent_72%)] blur-2xl"
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[620px] w-full max-w-5xl opacity-30"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 0%, transparent 135deg, rgba(59,91,255,0.35) 165deg, rgba(96,165,250,0.18) 180deg, rgba(59,91,255,0.35) 195deg, transparent 225deg)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Centered Hero Statement */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-blue-300/90 mb-5"
          >
            <span>ISEF Engineering Project</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">By Abdallah Mohamed Fahmy Abdelnaby</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="font-extrabold tracking-[-0.03em] text-white leading-[1.08] mb-5"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.85rem)',
              textWrap: 'balance',
            }}
          >
            Protect Every Home with Smart Gas Rescue
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-xl text-sm sm:text-lg text-slate-300 leading-relaxed mb-8"
          >
            An autonomous hardware rescue unit that detects leaks via{' '}
            <span className="font-mono text-white">MQ-2</span>, closes the supply valve{' '}
            <span className="font-mono text-white">90°</span>, and activates exhaust purge
            in under <span className="font-mono text-white">3 seconds</span>.
          </motion.p>

          {/* Centered Dual CTA Pair */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#simulator"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5BFF] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#2F4DF0] shadow-[0_0_32px_rgba(59,91,255,0.45)] transition-all whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <span>Launch Live Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="/assets/aistudio/Smart_Gas_Leak_Rescue_System_Presentation_ecad2a87.pdf"
              download="Smart_Gas_Leak_Rescue_System_Presentation.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-slate-200 hover:bg-white/[0.09] hover:text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <FileDown className="h-4 w-4 text-blue-400" />
              <span>Download PDF Deck</span>
            </a>
          </motion.div>
        </div>

        {/* Interactive 3D Perspective Dashboard Showcase (Echoing Reference Design) */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            initial={{ rotateX: 8 }}
            whileHover={{ rotateX: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/12 bg-[#070B16]/95 shadow-[0_24px_90px_rgba(37,99,235,0.2)] overflow-hidden"
          >
            {/* Preview Top Chrome */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#0A1020] px-4 sm:px-6 py-3.5">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#3B5BFF]" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Smart Gas Rescue · Control Console
                </span>
              </div>
              <div className="text-xs font-mono tabular-nums text-blue-300">
                Threshold &gt; 400 PPM · ATmega328P
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Mini Sidebar Navigation inside Dashboard Frame */}
              <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#060913] p-3 sm:p-4 flex lg:flex-col gap-1.5 overflow-x-auto">
                {PREVIEW_TABS.map((tab) => {
                  const Icon = tab.Icon;
                  const isActive = activePreview === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActivePreview(tab.id)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 min-h-[40px] ${
                        isActive
                          ? 'bg-[#3B5BFF]/20 text-white border border-[#3B5BFF]/40'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? 'text-blue-400' : 'text-slate-500'
                        }`}
                      />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dashboard Main Bento Stage */}
              <div className="lg:col-span-9 p-5 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {activeDetail.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {activeDetail.subtitle}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-[11px] text-slate-400">
                      {activeDetail.metricLabel}
                    </div>
                    <div className="font-mono tabular-nums text-base sm:text-lg font-bold text-blue-400">
                      {activeDetail.readout}
                    </div>
                  </div>
                </div>

                {/* 3-Panel Visual Bento Grid matching reference image */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                  {/* Panel 1: Cobalt Response Latency Bar Chart */}
                  <div className="md:col-span-5 rounded-xl border border-white/[0.08] bg-[#0B1122] p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-slate-300">
                        Shutoff Response Time
                      </span>
                      <span className="text-[11px] font-mono text-blue-400">
                        &lt; 3.0s Limit
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 items-end h-32 pt-2">
                      {LAB_TEST_RESULTS.map((trial, i) => {
                        const heightPct = Math.round((trial.totalTime / 3) * 100);
                        return (
                          <div
                            key={trial.id}
                            className="flex flex-col items-center gap-2 h-full justify-end"
                          >
                            <span className="font-mono tabular-nums text-[11px] text-slate-300">
                              {trial.totalTime.toFixed(1)}s
                            </span>
                            <motion.div
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{
                                duration: 0.65,
                                delay: 0.35 + i * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              style={{ height: `${heightPct}%`, originY: 1 }}
                              className="w-full rounded-t-md bg-gradient-to-t from-[#2541D8] to-[#5271FF] shadow-[0_0_20px_rgba(59,91,255,0.3)]"
                            />
                            <span className="font-mono tabular-nums text-[10px] text-slate-400">
                              {trial.ppm} PPM
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Panel 2: Concentric Radial Sensor Ring (Matching circular centerpiece in reference) */}
                  <div className="md:col-span-4 rounded-xl border border-white/[0.08] bg-[#0B1122] p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[180px]">
                    <div className="text-xs font-semibold text-slate-300 self-start mb-2">
                      MQ-2 Detection Field
                    </div>
                    <div className="relative flex items-center justify-center h-32 w-32 my-auto">
                      {/* Outer Rotating Radar Ring */}
                      <motion.svg
                        viewBox="0 0 120 120"
                        className="absolute inset-0 h-full w-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="rgba(59,91,255,0.22)"
                          strokeWidth="1.5"
                          strokeDasharray="6 6"
                        />
                        <path
                          d="M 60 6 A 54 54 0 0 1 114 60"
                          fill="none"
                          stroke="#3B5BFF"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </motion.svg>

                      {/* Inner Counter-Rotating Ring */}
                      <motion.svg
                        viewBox="0 0 120 120"
                        className="absolute inset-0 h-full w-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="38"
                          fill="none"
                          stroke="rgba(96,165,250,0.25)"
                          strokeWidth="1.25"
                          strokeDasharray="10 8"
                        />
                      </motion.svg>

                      {/* Center Shield Emblem */}
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#3B5BFF]/20 border border-[#3B5BFF]/60 shadow-[0_0_24px_rgba(59,91,255,0.45)]">
                        <ShieldCheck className="h-5 w-5 text-blue-300" />
                      </div>
                    </div>
                  </div>

                  {/* Panel 3: 3 Stacked KPI Readout Tiles */}
                  <div className="md:col-span-3 flex flex-col gap-2.5 justify-between">
                    <div className="rounded-xl border border-white/[0.08] bg-[#0B1122] px-4 py-3 flex flex-col justify-center flex-1">
                      <div className="text-[11px] text-slate-400">Response Target</div>
                      <div className="font-mono tabular-nums text-lg font-bold text-white">
                        &lt; 3.0s
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-[#0B1122] px-4 py-3 flex flex-col justify-center flex-1">
                      <div className="text-[11px] text-slate-400">Verified BOM</div>
                      <div className="font-mono tabular-nums text-lg font-bold text-white">
                        350 EGP
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-[#0B1122] px-4 py-3 flex flex-col justify-center flex-1">
                      <div className="text-[11px] text-slate-400">Valve Angle</div>
                      <div className="font-mono tabular-nums text-lg font-bold text-blue-400">
                        90° SEAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Full-Width 4-Column Specification Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/[0.09] rounded-xl bg-[#070B16] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]"
        >
          {HERO_METRICS.map((item) => (
            <div key={item.label} className="p-5 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
                {item.value}
              </div>
              <div className="mt-1.5 text-sm font-semibold text-blue-400">
                {item.label}
              </div>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                {item.sublabel}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
