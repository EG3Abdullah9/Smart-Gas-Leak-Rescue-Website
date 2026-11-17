import { motion } from 'motion/react';
import { AlertTriangle, Coins, ShieldCheck, Target, Zap } from 'lucide-react';
import { CORE_INSIGHT, DESIGN_CRITERIA, PROBLEM_POINTS } from '../data/projectData';

export default function ProblemAndCriteriaSection() {
  const [primaryCriterion, ...secondaryCriteria] = DESIGN_CRITERIA;

  return (
    <section id="problem-criteria" className="bg-[#050814] border-b border-white/[0.08] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-20 sm:space-y-24">
        {/* 01. Problem Definition — Asymmetric Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Columns: Thesis & Core Engineering Insight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
                01. The Legacy Alarm Gap
              </p>
              <h2
                className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                Why Gas Disasters Still Happen Despite Alarms
              </h2>
            </div>

            <div className="rounded-xl border border-[#3B5BFF]/30 bg-[#0A1024] p-6 space-y-4">
              <div className="flex items-center gap-2 text-blue-400">
                <Target className="h-4 w-4 shrink-0" />
                <span className="text-xs font-bold tracking-wide">Core Engineering Insight</span>
              </div>
              <blockquote className="text-lg font-bold text-white leading-snug">
                “{CORE_INSIGHT}”
              </blockquote>
              <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-white/[0.08]">
                Bridging the gap between passive acoustic alerting and active mechanical shutoff is the decisive factor in preventing residential explosions.
              </p>
            </div>
          </motion.div>

          {/* Right 7 Columns: Hairline-Separated Technical Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-xl border border-white/[0.09] bg-[#080D1B] p-6 sm:p-8"
          >
            <div className="flex items-center gap-2.5 pb-4 mb-2 border-b border-white/[0.08]">
              <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
              <h3 className="text-sm font-bold tracking-wide text-white">
                Critical Shortcomings in Conventional Detectors
              </h3>
            </div>

            <div className="divide-y divide-white/[0.08]">
              {PROBLEM_POINTS.map((point, idx) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="py-5 first:pt-4 last:pb-1 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
                >
                  <span className="font-mono tabular-nums text-xs font-bold text-blue-400 pt-1 shrink-0">
                    {point.index}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {point.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 02. Engineering Design Criteria — Asymmetric Bento Layout */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10"
          >
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
                02. Research Objectives
              </p>
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Engineering Design Criteria
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Three non-negotiable engineering benchmarks guiding hardware selection and firmware logic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Featured Primary Benchmark Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 rounded-xl bg-gradient-to-br from-[#0F1B3D] to-[#080D1B] text-white border border-[#3B5BFF]/40 p-7 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(59,91,255,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B5BFF]/20 border border-[#3B5BFF]/40 text-blue-300">
                    <Zap className="h-5 w-5" />
                  </span>
                  <span className="font-mono tabular-nums text-2xl font-bold text-blue-300">
                    {primaryCriterion.metric}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  {primaryCriterion.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {primaryCriterion.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-blue-200/80">
                Primary Safety Benchmark · LEL Prevention
              </div>
            </motion.div>

            {/* Secondary Two Criteria Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {secondaryCriteria.map((criterion, idx) => {
                const Icon = criterion.id === 'full-automation' ? ShieldCheck : Coins;
                const iconTone =
                  criterion.id === 'full-automation'
                    ? 'bg-sky-500/15 border-sky-400/30 text-sky-300'
                    : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300';

                return (
                  <motion.div
                    key={criterion.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.45, delay: 0.08 * (idx + 1), ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-white/[0.09] bg-[#080D1B] p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${iconTone}`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-mono tabular-nums text-sm font-bold text-white">
                          {criterion.metric}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {criterion.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {criterion.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
