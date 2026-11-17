import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import {
  BOM_ITEMS,
  COMPETITIVE_MATRIX,
  HARDWARE_SPECS,
  LAB_TEST_RESULTS,
} from '../data/projectData';

const HARDWARE_TOP_ACCENTS: Record<string, string> = {
  arduino: 'border-t-[#3B5BFF]',
  mq2: 'border-t-sky-400',
  sg90: 'border-t-emerald-400',
  relay: 'border-t-indigo-400',
};

export default function EngineeringDataSection() {
  const totalCalculated = BOM_ITEMS.reduce((sum, item) => sum + item.costEgp, 0);

  return (
    <section className="bg-[#050814] border-b border-white/[0.08] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-20 sm:space-y-24">
        {/* 06. Hardware Architecture */}
        <div id="hardware">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10"
          >
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
                06. Hardware Architecture
              </p>
              <h2
                className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Core Electronic Specifications
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Compact, high-reliability embedded components engineered for instant actuation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HARDWARE_SPECS.map((hw, idx) => (
              <motion.div
                key={hw.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-xl border border-white/[0.09] border-t-4 ${
                  HARDWARE_TOP_ACCENTS[hw.id] ?? 'border-t-[#3B5BFF]'
                } bg-[#080D1B] p-6 flex flex-col justify-between`}
              >
                <div>
                  <div className="text-xs font-medium text-slate-400 mb-1">
                    {hw.subtitle}
                  </div>
                  <h3 className="text-lg font-bold font-mono text-white mb-3">
                    {hw.name}
                  </h3>
                  <div className="text-xs font-semibold font-mono tabular-nums text-blue-300 bg-[#3B5BFF]/15 border border-[#3B5BFF]/30 rounded-md px-2.5 py-1 inline-block mb-3">
                    {hw.spec}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {hw.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 07. Lab Test Validation & Response Time Visualization */}
        <div id="results-cost" className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
              07. Empirical Lab Validation
            </p>
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Experimental Trials &amp; Response Latency
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Table / Mobile Cards */}
            <div className="lg:col-span-7">
              <div className="space-y-3 md:hidden">
                {LAB_TEST_RESULTS.map((test) => (
                  <div
                    key={test.id}
                    className="rounded-xl border border-white/[0.09] bg-[#080D1B] p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                      <span className="font-bold text-white">{test.name}</span>
                      <span className="font-mono tabular-nums text-sm font-bold text-blue-400">
                        {test.ppm} PPM
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">Detection Time</span>
                        <span className="font-mono tabular-nums font-semibold text-white">
                          {test.detectionTime.toFixed(1)} s
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Valve Shutoff Time</span>
                        <span className="font-mono tabular-nums font-semibold text-white">
                          {test.shutoffTime.toFixed(1)} s
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-400">
                        ✓ {test.result}
                      </span>
                      <span className="font-mono tabular-nums font-bold text-slate-200">
                        Total: {test.totalTime.toFixed(1)} s
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block rounded-xl border border-white/[0.09] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0B1226] text-slate-200 text-xs font-semibold tracking-wide border-b border-white/[0.08]">
                      <th className="py-3.5 px-4">Trial</th>
                      <th className="py-3.5 px-4">Concentration</th>
                      <th className="py-3.5 px-4">Detection</th>
                      <th className="py-3.5 px-4">Shutoff</th>
                      <th className="py-3.5 px-4">Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.07] text-sm">
                    {LAB_TEST_RESULTS.map((test, idx) => (
                      <tr
                        key={test.id}
                        className={idx % 2 === 1 ? 'bg-[#070B17]' : 'bg-[#080D1B]'}
                      >
                        <td className="py-3.5 px-4 font-bold text-white">
                          {test.name}
                        </td>
                        <td className="py-3.5 px-4 font-mono tabular-nums font-semibold text-blue-300">
                          {test.ppm} PPM
                        </td>
                        <td className="py-3.5 px-4 font-mono tabular-nums text-slate-300">
                          {test.detectionTime.toFixed(1)} s
                        </td>
                        <td className="py-3.5 px-4 font-mono tabular-nums text-slate-300">
                          {test.shutoffTime.toFixed(1)} s
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-400">
                          ✓ {test.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Animated Response Time vs 3.0s Safety Ceiling */}
            <div className="lg:col-span-5 rounded-xl border border-white/[0.09] bg-[#080D1B] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <h3 className="text-sm font-bold text-white">
                  Total Latency vs. 3.0s Safety Ceiling
                </h3>
                <span className="text-xs font-mono tabular-nums text-emerald-400 font-semibold">
                  100% Within Limit
                </span>
              </div>

              <div className="space-y-4">
                {LAB_TEST_RESULTS.map((test, i) => {
                  const detectPct = (test.detectionTime / 3) * 100;
                  const shutoffPct = (test.shutoffTime / 3) * 100;

                  return (
                    <div key={test.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">
                          {test.name} · {test.ppm} PPM
                        </span>
                        <span className="font-mono tabular-nums font-bold text-white">
                          {test.totalTime.toFixed(1)}s / 3.0s
                        </span>
                      </div>
                      <div className="h-4 w-full rounded-md bg-slate-900 border border-white/[0.06] overflow-hidden flex">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-sky-500 origin-left"
                          style={{ width: `${detectPct}%` }}
                          title={`Detection: ${test.detectionTime}s`}
                        />
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-[#3B5BFF] origin-left"
                          style={{ width: `${shutoffPct}%` }}
                          title={`Valve Shutoff: ${test.shutoffTime}s`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-sky-500 inline-block" />
                  <span>Leak Detection Time</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#3B5BFF] inline-block" />
                  <span>90° Valve Shutoff Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 08. Competitive Comparison */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
              08. Competitive Analysis
            </p>
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Smart Rescue vs. Commercial Detectors
            </h2>
          </motion.div>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {COMPETITIVE_MATRIX.map((row) => (
              <div
                key={row.aspect}
                className="rounded-xl border border-white/[0.09] bg-[#080D1B] p-4 space-y-3"
              >
                <div className="font-bold text-white border-b border-white/[0.08] pb-2">
                  {row.aspect}
                </div>
                <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/25 p-3">
                  <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" />
                    <span>Smart Rescue System</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{row.smartRescue}</p>
                </div>
                <div className="rounded-lg bg-rose-950/30 border border-rose-500/25 p-3">
                  <div className="text-xs font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                    <X className="h-3.5 w-3.5" />
                    <span>Conventional Commercial Systems</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{row.traditional}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-xl border border-white/[0.09] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B1226] text-slate-200 text-xs font-semibold tracking-wide border-b border-white/[0.08]">
                  <th className="py-4 px-5 w-1/4">Evaluation Criterion</th>
                  <th className="py-4 px-5 w-3/8">Smart Rescue System</th>
                  <th className="py-4 px-5 w-3/8">Conventional Commercial Systems</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07] text-sm">
                {COMPETITIVE_MATRIX.map((row, idx) => (
                  <tr
                    key={row.aspect}
                    className={idx % 2 === 1 ? 'bg-[#070B17]' : 'bg-[#080D1B]'}
                  >
                    <td className="py-4 px-5 font-bold text-white">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-5 font-semibold text-emerald-400">
                      ✓ {row.smartRescue}
                    </td>
                    <td className="py-4 px-5 text-rose-400">
                      ✕ {row.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 09. Bill of Materials & Economic Cost */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
                09. Economic Feasibility
              </p>
              <h2
                className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Bill of Materials &amp; Production Cost
              </h2>
            </div>
            <div className="text-sm font-bold font-mono tabular-nums text-blue-400">
              Verified BOM Total: {totalCalculated} EGP (&lt; 400 EGP Target)
            </div>
          </div>

          {/* Mobile Stacked Cost Cards */}
          <div className="space-y-2.5 md:hidden">
            {BOM_ITEMS.map((item) => (
              <div
                key={item.component}
                className="rounded-lg border border-white/[0.09] bg-[#080D1B] p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-mono text-sm font-semibold text-white">
                    {item.component}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Qty: <span className="font-mono">{item.quantity}</span>
                  </div>
                </div>
                <div className="font-mono tabular-nums text-sm font-bold text-white shrink-0">
                  {item.costEgp} EGP
                </div>
              </div>
            ))}
            <div className="rounded-lg border border-[#3B5BFF]/40 bg-[#0D1838] p-4 flex items-center justify-between">
              <span className="font-bold text-white">Total System Cost</span>
              <span className="font-mono tabular-nums font-bold text-blue-300">
                &lt; 350 – 400 EGP
              </span>
            </div>
          </div>

          {/* Desktop Cost Table */}
          <div className="hidden md:block rounded-xl border border-white/[0.09] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B1226] text-slate-200 text-xs font-semibold tracking-wide border-b border-white/[0.08]">
                  <th className="py-3.5 px-5">Component / Module</th>
                  <th className="py-3.5 px-5 text-center">Quantity</th>
                  <th className="py-3.5 px-5 text-right">Estimated Cost (EGP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07] text-sm">
                {BOM_ITEMS.map((item, idx) => (
                  <tr
                    key={item.component}
                    className={idx % 2 === 1 ? 'bg-[#070B17]' : 'bg-[#080D1B]'}
                  >
                    <td className="py-3.5 px-5 font-mono font-medium text-white">
                      {item.component}
                    </td>
                    <td className="py-3.5 px-5 text-center font-mono tabular-nums text-slate-300">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono tabular-nums font-semibold text-white">
                      {item.costEgp} EGP
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#0D1838] font-bold text-white border-t border-[#3B5BFF]/40">
                  <td className="py-4 px-5">Total System Cost</td>
                  <td className="py-4 px-5 text-center font-mono">—</td>
                  <td className="py-4 px-5 text-right font-mono tabular-nums text-blue-300">
                    Under 350 – 400 EGP
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
