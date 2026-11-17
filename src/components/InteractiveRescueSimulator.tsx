import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Fan,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { FLOWCHART_STEPS, SOLUTION_STAGES } from '../data/projectData';

type SimulatorTab = 'flowchart' | 'wiring';

const PRESETS = [
  { label: 'Safe (120 PPM)', ppm: 120 },
  { label: 'Warning (300 PPM)', ppm: 300 },
  { label: 'Trial 01 (450 PPM)', ppm: 450 },
  { label: 'Trial 02 (650 PPM)', ppm: 650 },
  { label: 'Trial 03 (900 PPM)', ppm: 900 },
];

export default function InteractiveRescueSimulator() {
  const [ppm, setPpm] = useState<number>(120);
  const [valveLocked, setValveLocked] = useState<boolean>(false);
  const [resetWarning, setResetWarning] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SimulatorTab>('flowchart');

  useEffect(() => {
    if (ppm > 400) {
      setValveLocked(true);
      setResetWarning(null);
    }
  }, [ppm]);

  // Physics calibration calculations matching SnO2 equation: Rs / Ro = A * (PPM)^(-B)
  const rsRoRatio = Math.max(0.08, Math.min(4.5, 11.4 * Math.pow(ppm, -0.47)));
  const vout = Math.min(4.85, Math.max(0.45, 0.35 + 4.45 * (1 - rsRoRatio / 4.6)));
  const analogA0 = Math.min(1023, Math.round((vout / 5) * 1023));

  const isDanger = ppm > 400;
  const isWarning = ppm >= 200 && ppm <= 400;

  const handleManualReset = () => {
    if (ppm > 400) {
      setResetWarning(
        'Cannot reopen valve: Ambient gas concentration remains above the 400 PPM danger threshold. Ventilate the area first.'
      );
      return;
    }
    setValveLocked(false);
    setResetWarning(null);
  };

  const statusInfo = isDanger
    ? {
        label: '✖ Critical Threshold: Immediate Actuation',
        description: 'Gas exceeds 400 PPM — SG90 valve sealed 90°, exhaust fan & alarm active.',
        badgeClass: 'bg-rose-950/60 text-rose-200 border-rose-500/30',
        Icon: AlertOctagon,
      }
    : valveLocked
      ? {
          label: '▲ Fail-Safe Latch Active: Valve Locked',
          description: 'Gas dropped below 400 PPM, but the valve remains sealed until Manual Reset.',
          badgeClass: 'bg-amber-950/50 text-amber-200 border-amber-500/30',
          Icon: AlertTriangle,
        }
      : isWarning
        ? {
            label: '▲ Warning Threshold: Air Quality Shift',
            description: 'Early detection between 200 and 400 PPM — sampling analog channel A0.',
            badgeClass: 'bg-amber-950/50 text-amber-200 border-amber-500/30',
            Icon: AlertTriangle,
          }
        : {
            label: '● Normal Environment: Safe',
            description: 'Concentration below 200 PPM — supply valve open in continuous monitoring.',
            badgeClass: 'bg-emerald-950/50 text-emerald-200 border-emerald-500/30',
            Icon: CheckCircle2,
          };

  const StatusIcon = statusInfo.Icon;

  return (
    <section id="simulator" className="relative bg-[#03050C] border-b border-white/[0.08] py-16 sm:py-24 overflow-hidden">
      {/* Subtle Cobalt Ambient Backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[420px] w-[760px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,91,255,0.14)_0%,transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 space-y-14 sm:space-y-16">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-blue-400 mb-2">
              03. Interactive Calibration &amp; Actuation Testbench
            </p>
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Simulate Gas Calibration &amp; Fail-Safe Shutoff
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Adjust the ambient gas concentration to observe the SnO₂ resistance curve, spring-actuated 90° SG90 valve closure, exhaust relay activation, and Fail-Safe manual reset interlock.
          </p>
        </motion.div>

        {/* Interactive Hardware Testbench */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/12 bg-[#070B16] shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden"
        >
          {/* Status Ribbon */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b transition-colors duration-200 ${statusInfo.badgeClass}`}
          >
            <div className="flex items-start sm:items-center gap-3">
              <StatusIcon className="h-5 w-5 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <div className="text-sm font-bold">{statusInfo.label}</div>
                <p className="text-xs sm:text-sm opacity-90">{statusInfo.description}</p>
              </div>
            </div>
            <div className="font-mono tabular-nums text-base font-bold shrink-0">
              {ppm} PPM
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {/* Left Column: Calibration Inputs & SnO2 Telemetry */}
            <div className="lg:col-span-6 p-5 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label
                    htmlFor="ppm-slider"
                    className="text-sm font-bold text-white"
                  >
                    Ambient Gas Concentration (LPG / Methane)
                  </label>
                  <span className="font-mono tabular-nums text-lg font-bold text-blue-400">
                    {ppm} PPM
                  </span>
                </div>

                <input
                  id="ppm-slider"
                  type="range"
                  min={50}
                  max={1000}
                  step={10}
                  value={ppm}
                  onChange={(e) => {
                    setPpm(Number(e.target.value));
                    setResetWarning(null);
                  }}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#3B5BFF]"
                />

                <div className="flex justify-between text-xs font-mono tabular-nums text-slate-400 mt-2">
                  <span>50</span>
                  <span>200 (Warn)</span>
                  <span className="text-rose-400 font-semibold">400 (Trigger)</span>
                  <span>1000 PPM</span>
                </div>
              </div>

              {/* Lab Presets */}
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-2.5">
                  Empirical Lab Presets:
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => {
                    const isActive = ppm === preset.ppm;
                    return (
                      <button
                        key={preset.ppm}
                        type="button"
                        onClick={() => {
                          setPpm(preset.ppm);
                          setResetWarning(null);
                        }}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all min-h-[40px] whitespace-nowrap shrink-0 border ${
                          isActive
                            ? 'bg-[#3B5BFF] text-white border-[#3B5BFF] shadow-[0_0_20px_rgba(59,91,255,0.35)]'
                            : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08] hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Physics Calibration Readout */}
              <div className="rounded-xl border border-white/[0.08] bg-[#0B1122] p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5">
                  <span className="text-xs font-bold text-slate-200">
                    SnO₂ Chemiresistive Calibration
                  </span>
                  <code className="text-xs font-mono text-blue-300 bg-[#060A14] px-2.5 py-1 rounded border border-white/10">
                    Rs / Ro = A × (PPM)^(-B)
                  </code>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-[#060A14] border border-white/[0.08] p-2.5">
                    <div className="text-[11px] text-slate-400 mb-1">Rs / Ro Ratio</div>
                    <div className="font-mono tabular-nums text-sm sm:text-base font-bold text-white">
                      {rsRoRatio.toFixed(2)}
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#060A14] border border-white/[0.08] p-2.5">
                    <div className="text-[11px] text-slate-400 mb-1">Output Vout</div>
                    <div className="font-mono tabular-nums text-sm sm:text-base font-bold text-white">
                      {vout.toFixed(2)} V
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#060A14] border border-white/[0.08] p-2.5">
                    <div className="text-[11px] text-slate-400 mb-1">Analog A0</div>
                    <div className="font-mono tabular-nums text-sm sm:text-base font-bold text-blue-400">
                      {analogA0}
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Reset Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleManualReset}
                  disabled={!valveLocked}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all min-h-[44px] ${
                    valveLocked
                      ? 'bg-[#3B5BFF] text-white hover:bg-[#2F4DF0] shadow-[0_0_24px_rgba(59,91,255,0.4)] cursor-pointer'
                      : 'bg-white/[0.04] text-slate-500 border border-white/[0.08] cursor-not-allowed'
                  }`}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Manual Safety Reset</span>
                </button>
                <AnimatePresence>
                  {resetWarning && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-2.5 text-xs font-medium text-rose-200 bg-rose-950/70 border border-rose-500/30 rounded-lg p-3 leading-relaxed"
                    >
                      {resetWarning}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Live Hardware Actuation Stage */}
            <div className="lg:col-span-6 p-5 sm:p-8 bg-[#050812] text-white flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-bold">Hardware Actuator State</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-400">
                  {valveLocked ? 'VALVE_LOCKED' : 'MONITORING'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. SG90 Servo Valve with Spring Motion */}
                <div className="rounded-xl border border-white/[0.08] bg-[#0B1122] p-4 flex flex-col items-center text-center">
                  <div className="text-xs font-medium text-slate-400 mb-3">
                    Gas Valve (SG90)
                  </div>
                  <div className="relative h-20 w-24 flex items-center justify-center">
                    <div className="h-4 w-24 rounded bg-slate-800 border border-slate-600" />
                    <motion.div
                      animate={{ rotate: valveLocked ? 90 : 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="absolute h-10 w-10 rounded-full border-2 border-slate-500 bg-[#060A14] flex items-center justify-center"
                    >
                      <div
                        className={`h-1.5 w-8 rounded-full transition-colors ${
                          valveLocked ? 'bg-rose-500' : 'bg-emerald-400'
                        }`}
                      />
                    </motion.div>
                  </div>
                  <div className="mt-2 font-mono tabular-nums text-xs font-bold">
                    {valveLocked ? '90° · CLOSED' : '0° · OPEN'}
                  </div>
                </div>

                {/* 2. 5V Relay + Exhaust Fan */}
                <div className="rounded-xl border border-white/[0.08] bg-[#0B1122] p-4 flex flex-col items-center text-center">
                  <div className="text-xs font-medium text-slate-400 mb-3">
                    Exhaust Fan (Relay)
                  </div>
                  <div className="h-20 flex items-center justify-center">
                    <motion.div
                      animate={valveLocked ? { rotate: 360 } : { rotate: 0 }}
                      transition={
                        valveLocked
                          ? { duration: 0.9, repeat: Infinity, ease: 'linear' }
                          : { duration: 0.3 }
                      }
                    >
                      <Fan
                        className={`h-12 w-12 transition-colors ${
                          valveLocked ? 'text-emerald-400' : 'text-slate-600'
                        }`}
                      />
                    </motion.div>
                  </div>
                  <div className="mt-2 font-mono tabular-nums text-xs font-bold">
                    {valveLocked ? 'ON · PURGING' : 'OFF · STANDBY'}
                  </div>
                </div>

                {/* 3. Buzzer & Optical Alert */}
                <div className="rounded-xl border border-white/[0.08] bg-[#0B1122] p-4 flex flex-col items-center text-center">
                  <div className="text-xs font-medium text-slate-400 mb-3">
                    Alarm (Buzzer/LED)
                  </div>
                  <div className="h-20 flex items-center justify-center">
                    {isDanger || valveLocked ? (
                      <motion.div
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Volume2 className="h-12 w-12 text-blue-400" />
                      </motion.div>
                    ) : (
                      <VolumeX className="h-12 w-12 text-slate-600" />
                    )}
                  </div>
                  <div className="mt-2 font-mono tabular-nums text-xs font-bold">
                    {isDanger
                      ? 'ACTIVE SIREN'
                      : valveLocked
                        ? 'LOCK ALERT'
                        : 'SILENT · SAFE'}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#0B1122] p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-white">Fail-Safe Interlock Logic: </span>
                Crossing <span className="font-mono text-blue-400">400 PPM</span> immediately seals the gas valve at <span className="font-mono text-blue-400">90°</span>. Lowering the gas concentration will not reopen the supply line until a manual safety inspection and <span className="font-mono text-white">Reset</span> press.
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4-Stage Rescue Sequence */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mb-6"
          >
            <p className="text-xs font-semibold tracking-wide text-blue-400 mb-1.5">
              04. Four-Stage Intervention Pipeline
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              From Passive Detection to Active Containment
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SOLUTION_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border border-white/[0.09] bg-[#080D1B] p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono tabular-nums text-sm font-bold text-blue-400">
                      {stage.step}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {stage.component}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    {stage.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Flowchart & Circuit Wiring Tabs */}
        <div className="rounded-2xl border border-white/[0.09] bg-[#080D1B] p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <p className="text-xs font-semibold tracking-wide text-blue-400 mb-1">
                05. Firmware Logic &amp; Circuit Architecture
              </p>
              <h3 className="text-xl font-bold text-white">
                Execution Flowchart &amp; System Wiring
              </h3>
            </div>

            <div className="inline-flex items-center gap-1 p-1 bg-[#03050C] border border-white/[0.08] rounded-lg self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab('flowchart')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                  activeTab === 'flowchart'
                    ? 'bg-[#3B5BFF] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Data Flowchart
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wiring')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                  activeTab === 'wiring'
                    ? 'bg-[#3B5BFF] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Circuit Schematic
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'flowchart' ? (
              <motion.div
                key="flowchart-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {FLOWCHART_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-xl border border-white/[0.08] bg-[#050812] p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-blue-400">
                          STEP {item.step}
                        </span>
                        <code className="text-[11px] font-mono text-slate-300 bg-[#0B1122] px-2 py-0.5 rounded border border-white/10">
                          {item.code}
                        </code>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="wiring-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#040711] p-4">
                  <svg
                    viewBox="0 0 560 280"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Wiring schematic connecting Arduino UNO to MQ-2 sensor, SG90 servo, 5V relay, and 9V/5V power management"
                  >
                    <rect width="560" height="280" rx="8" fill="#040711" />
                    <rect x="40" y="55" width="150" height="170" rx="8" fill="#0F2A5E" stroke="#3B5BFF" strokeWidth="1.5" />
                    <rect x="55" y="75" width="40" height="25" rx="2" fill="#090D16" stroke="#64748B" />
                    <text x="115" y="135" fill="#FFFFFF" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                      Arduino UNO
                    </text>
                    <text x="115" y="155" fill="#93C5FD" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                      ATmega328P
                    </text>
                    <text x="180" y="88" fill="#FDE047" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono, monospace">A0</text>
                    <text x="180" y="138" fill="#60A5FA" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono, monospace">D9 (PWM)</text>
                    <text x="180" y="178" fill="#34D399" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono, monospace">D7</text>
                    <text x="180" y="208" fill="#F87171" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono, monospace">5V / GND</text>

                    <path d="M 190 85 L 330 85" stroke="#FDE047" strokeWidth="2.5" fill="none" />
                    <path d="M 190 135 L 330 135" stroke="#60A5FA" strokeWidth="2.5" fill="none" />
                    <path d="M 190 175 L 330 175" stroke="#34D399" strokeWidth="2.5" fill="none" />
                    <path d="M 190 205 L 260 205 L 260 242 L 330 242" stroke="#F87171" strokeWidth="2" strokeDasharray="5 3" fill="none" />

                    <rect x="330" y="55" width="190" height="44" rx="6" fill="#0B1122" stroke="#FDE047" strokeWidth="1.5" />
                    <text x="425" y="75" fill="#FFFFFF" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                      MQ-2 Gas Sensor (A0)
                    </text>
                    <text x="425" y="90" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                      Analog Voltage PPM Sampling
                    </text>

                    <rect x="330" y="112" width="190" height="44" rx="6" fill="#0B1122" stroke="#60A5FA" strokeWidth="1.5" />
                    <text x="425" y="132" fill="#FFFFFF" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                      SG90 Servo Motor (D9)
                    </text>
                    <text x="425" y="147" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                      90° Valve Shutoff Actuator
                    </text>

                    <rect x="330" y="168" width="190" height="44" rx="6" fill="#0B1122" stroke="#34D399" strokeWidth="1.5" />
                    <text x="425" y="188" fill="#FFFFFF" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                      5V Relay + Exhaust (D7)
                    </text>
                    <text x="425" y="203" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                      Isolated High-Voltage Fan Control
                    </text>

                    <rect x="330" y="224" width="190" height="36" rx="6" fill="#0B1122" stroke="#F87171" strokeWidth="1.5" />
                    <text x="425" y="246" fill="#FCA5A5" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                      Power Management 9V / 5V
                    </text>
                  </svg>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-xl border border-white/[0.08] bg-[#050812] p-5">
                    <h4 className="text-base font-bold text-white mb-1.5">
                      Stabilized Power Management
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Dedicated <span className="font-mono font-semibold text-white">9V / 5V</span> regulated power supply prevents voltage sag during high-torque SG90 servo actuation.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-[#050812] p-5">
                    <h4 className="text-base font-bold text-white mb-1.5">
                      High-Voltage Relay Isolation
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Galvanically separates the <span className="font-mono font-semibold text-white">220V AC</span> exhaust fan load from the <span className="font-mono font-semibold text-white">Arduino</span> microcontroller, protecting logic pins and preventing open sparks.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
