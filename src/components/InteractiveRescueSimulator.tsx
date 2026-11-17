import { useEffect, useState } from 'react';
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
  { label: 'طبيعي (120 PPM)', ppm: 120 },
  { label: 'تحذير (300 PPM)', ppm: 300 },
  { label: 'اختبار 1 (450 PPM)', ppm: 450 },
  { label: 'اختبار 2 (650 PPM)', ppm: 650 },
  { label: 'اختبار 3 (900 PPM)', ppm: 900 },
];

export default function InteractiveRescueSimulator() {
  const [ppm, setPpm] = useState<number>(120);
  const [valveLocked, setValveLocked] = useState<boolean>(false);
  const [resetWarning, setResetWarning] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SimulatorTab>('flowchart');

  // Auto-latch Fail-Safe shutoff when concentration crosses > 400 PPM
  useEffect(() => {
    if (ppm > 400) {
      setValveLocked(true);
      setResetWarning(null);
    }
  }, [ppm]);

  // Physics calibration calculations matching SnO2 equation: Rs / Ro = A * (PPM)^(-B)
  const rsRoRatio = Math.max(0.08, Math.min(4.5, 11.4 * Math.pow(ppm, -0.47)));
  const vout = Math.min(4.85, Math.max(0.45, 0.35 + (4.45 * (1 - rsRoRatio / 4.6))));
  const analogA0 = Math.min(1023, Math.round((vout / 5) * 1023));

  const isDanger = ppm > 400;
  const isWarning = ppm >= 200 && ppm <= 400;

  const handleManualReset = () => {
    if (ppm > 400) {
      setResetWarning(
        'لا يمكن إعادة فتح المحبس: تركيز الغاز ما زال أعلى من عتبة الخطر (400 PPM). قم بتهوية المكان أولاً.'
      );
      return;
    }
    setValveLocked(false);
    setResetWarning(null);
  };

  // Explicit non-hue-only status representation
  const statusInfo = isDanger
    ? {
        label: '✖ عتبة الخطر: تدخل آلي فوري',
        description: 'تجاوز الغاز 400 PPM — تم قفل المحبس 90° وتفعيل الشفاط والإنذار.',
        badgeClass: 'bg-red-50 text-red-800 border-red-200',
        Icon: AlertOctagon,
      }
    : valveLocked
      ? {
          label: '▲ وضع التأمين (Fail-Safe): المحبس مقفول',
          description: 'انخفض تركيز الغاز، لكن المحبس يظل مقفولاً حتى الضغط على زر Reset.',
          badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
          Icon: AlertTriangle,
        }
      : isWarning
        ? {
            label: '▲ عتبة التحذير: تغير جودة الهواء',
            description: 'كشف أولي بين 200 و 400 PPM — مراقبة دقيقة عبر الدخل A0.',
            badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
            Icon: AlertTriangle,
          }
        : {
            label: '● الحالة الطبيعية: البيئة آمنة',
            description: 'تركيز الغاز أقل من 200 PPM — المحبس مفتوح والنظام في حالة مراقبة.',
            badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            Icon: CheckCircle2,
          };

  const StatusIcon = statusInfo.Icon;

  return (
    <section id="simulator" className="bg-slate-50 border-b border-slate-200 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
              03. المحاكاة الهندسية ومعادلة المعايرة (MQ-2 &amp; Fail-Safe)
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
              style={{ textWrap: 'balance' }}
            >
              محاكي الاستجابة التلقائية ومعايرة الحساس
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            جرّب تغيير تركيز الغاز لاختبار معادلة المقاومة الكيميائية (SnO₂) ومراقبة قفل المحبس آلياً وتفعيل الشفاط وآلية إعادة الضبط اليدوي.
          </p>
        </div>

        {/* Interactive Simulator Console */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          {/* Status Ribbon */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b ${statusInfo.badgeClass}`}>
            <div className="flex items-start sm:items-center gap-2.5">
              <StatusIcon className="h-5 w-5 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <div className="text-sm sm:text-base font-bold">{statusInfo.label}</div>
                <p className="text-xs sm:text-sm opacity-90">{statusInfo.description}</p>
              </div>
            </div>
            <div className="font-mono tabular-nums text-sm font-bold shrink-0">
              {ppm} PPM
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-200">
            {/* Control & Calibration Column */}
            <div className="lg:col-span-6 p-5 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="ppm-slider"
                    className="text-sm font-bold text-slate-900"
                  >
                    تركيز الغاز المحيط (LPG / Methane)
                  </label>
                  <span className="font-mono tabular-nums text-lg font-bold text-orange-600">
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
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />

                <div className="flex justify-between text-xs font-mono tabular-nums text-slate-500 mt-1.5">
                  <span>50 PPM</span>
                  <span>200 (تحذير)</span>
                  <span className="text-red-600 font-semibold">400 (خطر)</span>
                  <span>1000 PPM</span>
                </div>
              </div>

              {/* Lab Test Presets */}
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-2.5">
                  سيناريوهات الاختبار العملي (اضغط للتجربة):
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
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors min-h-[40px] whitespace-nowrap shrink-0 border ${
                          isActive
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Physics Calibration Telemetry (Slide 6) */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <span className="text-xs font-bold text-slate-800">
                    معادلة معايرة طبقة SnO₂
                  </span>
                  <code className="text-xs font-mono text-slate-700 bg-white px-2 py-1 rounded border border-slate-200" dir="ltr">
                    Rs / Ro = A × (PPM)^(-B)
                  </code>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-md bg-white border border-slate-200 p-2.5">
                    <div className="text-[11px] text-slate-500 mb-1">نسبة المقاومة</div>
                    <div className="font-mono tabular-nums text-sm sm:text-base font-bold text-slate-900">
                      {rsRoRatio.toFixed(2)}
                    </div>
                  </div>
                  <div className="rounded-md bg-white border border-slate-200 p-2.5">
                    <div className="text-[11px] text-slate-500 mb-1">الجهد الخارج Vout</div>
                    <div className="font-mono tabular-nums text-sm sm:text-base font-bold text-slate-900">
                      {vout.toFixed(2)} V
                    </div>
                  </div>
                  <div className="rounded-md bg-white border border-slate-200 p-2.5">
                    <div className="text-[11px] text-slate-500 mb-1">قراءة A0</div>
                    <div className="font-mono tabular-nums text-sm sm:text-base font-bold text-slate-900">
                      {analogA0}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fail-Safe Manual Reset Control */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleManualReset}
                  disabled={!valveLocked}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-colors min-h-[44px] ${
                    valveLocked
                      ? 'bg-orange-600 text-white hover:bg-orange-500 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>إعادة الضبط اليدوي (Manual Reset)</span>
                </button>
                {resetWarning && (
                  <p className="mt-2.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 leading-relaxed">
                    {resetWarning}
                  </p>
                )}
              </div>
            </div>

            {/* Live Hardware Actuator Response Column */}
            <div className="lg:col-span-6 p-5 sm:p-8 bg-slate-900 text-white flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-orange-400" />
                  <span className="text-sm font-bold">استجابة المكونات الميكانيكية</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-400">
                  {valveLocked ? 'STATE: LOCKED_SAFE' : 'STATE: MONITORING'}
                </span>
              </div>

              {/* 3 Actuator Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. SG90 Servo Valve */}
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 flex flex-col items-center text-center">
                  <div className="text-xs font-semibold text-slate-400 mb-3">
                    محبس الغاز (SG90)
                  </div>
                  {/* Valve Pipe + Rotating Handle */}
                  <div className="relative h-20 w-24 flex items-center justify-center">
                    <div className="h-4 w-24 rounded bg-slate-700 border border-slate-600" />
                    <div
                      className="absolute h-10 w-10 rounded-full border-2 border-slate-500 bg-slate-800 flex items-center justify-center transition-transform duration-300"
                      style={{
                        transform: valveLocked ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      <div
                        className={`h-1.5 w-8 rounded-full ${
                          valveLocked ? 'bg-red-500' : 'bg-emerald-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="mt-2 font-mono tabular-nums text-sm font-bold">
                    {valveLocked ? '90° (مغلق كلياً)' : '0° (مفتوح)'}
                  </div>
                </div>

                {/* 2. 5V Relay + Exhaust Fan */}
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 flex flex-col items-center text-center">
                  <div className="text-xs font-semibold text-slate-400 mb-3">
                    شفاط الطرد (Relay)
                  </div>
                  <div className="h-20 flex items-center justify-center">
                    <Fan
                      className={`h-12 w-12 transition-colors ${
                        valveLocked
                          ? 'text-emerald-400 animate-spin'
                          : 'text-slate-600'
                      }`}
                    />
                  </div>
                  <div className="mt-2 font-mono tabular-nums text-sm font-bold">
                    {valveLocked ? 'ON (طرد فعال)' : 'OFF (متوقف)'}
                  </div>
                </div>

                {/* 3. Buzzer & Optical Alert */}
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 flex flex-col items-center text-center">
                  <div className="text-xs font-semibold text-slate-400 mb-3">
                    الإنذار (Buzzer/LED)
                  </div>
                  <div className="h-20 flex items-center justify-center">
                    {isDanger || valveLocked ? (
                      <Volume2 className="h-12 w-12 text-orange-500" />
                    ) : (
                      <VolumeX className="h-12 w-12 text-slate-600" />
                    )}
                  </div>
                  <div className="mt-2 font-mono tabular-nums text-sm font-bold">
                    {isDanger
                      ? 'إنذار نشط'
                      : valveLocked
                        ? 'تنبيه تأمين'
                        : 'صامت (آمن)'}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-white">توضيح آلية الفشل الآمن (Fail-Safe): </span>
                عند ارتفاع القراءة عن <span className="font-mono text-orange-400">400 PPM</span> يدور السيرفو فوراً بزاوية <span className="font-mono text-orange-400">90°</span> لغلق المحبس، ولا يعود للفتح التلقائي عند انخفاض الغاز إلا بعد التحقق البشري والضغط على زر <span className="font-mono text-white">Reset</span>.
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Rescue Pipeline (Slide 4) */}
        <div>
          <div className="max-w-2xl mb-6">
            <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-1.5">
              04. فكرة الحل الهندسي
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              من الإنذار السلبي إلى التدخل الفعلي في 4 مراحل
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SOLUTION_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono tabular-nums text-sm font-bold text-orange-600">
                      {stage.step}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {stage.component}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">
                    {stage.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flowchart & Circuit Wiring Tabs (Slides 5 & 7) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <p className="text-xs font-semibold text-orange-600 mb-1">
                05. المخطط التنفيذي والخوارزمية
              </p>
              <h3 className="text-xl font-bold text-slate-900">
                منطق البرمجة وتوصيلات الدائرة الكهربائية
              </h3>
            </div>

            {/* Segmented Tab Controls */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab('flowchart')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                  activeTab === 'flowchart'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                مخطط تدفق البيانات (Flowchart)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wiring')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                  activeTab === 'wiring'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                المخطط التنفيذي والدائرة
              </button>
            </div>
          </div>

          {activeTab === 'flowchart' ? (
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FLOWCHART_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-orange-600">
                        خطوة {item.step}
                      </span>
                      <code className="text-[11px] font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200" dir="ltr">
                        {item.code}
                      </code>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Crisp Wiring SVG Diagram */}
              <div className="lg:col-span-7 rounded-lg border border-slate-200 bg-slate-950 p-4">
                <svg
                  viewBox="0 0 560 280"
                  className="w-full h-auto"
                  role="img"
                  aria-label="المخطط التنفيذي لتوصيلات Arduino UNO مع حساس الغاز والسيرفو والريلاي"
                >
                  <rect width="560" height="280" rx="8" fill="#0B1221" />
                  {/* Arduino UNO Board */}
                  <rect x="40" y="55" width="150" height="170" rx="8" fill="#0F4C81" stroke="#38BDF8" strokeWidth="1.5" />
                  <rect x="55" y="75" width="40" height="25" rx="2" fill="#1E293B" stroke="#94A3B8" />
                  <text x="115" y="135" fill="#FFFFFF" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    Arduino UNO
                  </text>
                  <text x="115" y="155" fill="#BAE6FD" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    ATmega328P
                  </text>
                  {/* Pins */}
                  <text x="180" y="88" fill="#FDE047" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono, monospace">A0</text>
                  <text x="180" y="138" fill="#FB923C" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono, monospace">D9 (PWM)</text>
                  <text x="180" y="178" fill="#34D399" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono, monospace">D7</text>
                  <text x="180" y="208" fill="#F87171" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono, monospace">5V / GND</text>

                  {/* Wires */}
                  {/* A0 -> MQ-2 */}
                  <path d="M 190 85 L 330 85" stroke="#FDE047" strokeWidth="2.5" fill="none" />
                  {/* D9 -> SG90 */}
                  <path d="M 190 135 L 330 135" stroke="#FB923C" strokeWidth="2.5" fill="none" />
                  {/* D7 -> Relay */}
                  <path d="M 190 175 L 330 175" stroke="#34D399" strokeWidth="2.5" fill="none" />
                  {/* 5V/GND rail */}
                  <path d="M 190 205 L 260 205 L 260 242 L 330 242" stroke="#F87171" strokeWidth="2" strokeDasharray="5 3" fill="none" />

                  {/* MQ-2 Sensor Block */}
                  <rect x="330" y="55" width="190" height="44" rx="6" fill="#162033" stroke="#FDE047" strokeWidth="1.5" />
                  <text x="425" y="75" fill="#FFFFFF" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    MQ-2 Gas Sensor (A0)
                  </text>
                  <text x="425" y="90" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                    كشف تركيز الغاز وإرسال الجهد التناظري
                  </text>

                  {/* SG90 Block */}
                  <rect x="330" y="112" width="190" height="44" rx="6" fill="#162033" stroke="#FB923C" strokeWidth="1.5" />
                  <text x="425" y="132" fill="#FFFFFF" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    SG90 Servo Motor (D9)
                  </text>
                  <text x="425" y="147" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                    غلق محبس الغاز بزاوية 90 درجة
                  </text>

                  {/* Relay + Fan Block */}
                  <rect x="330" y="168" width="190" height="44" rx="6" fill="#162033" stroke="#34D399" strokeWidth="1.5" />
                  <text x="425" y="188" fill="#FFFFFF" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    5V Relay + Exhaust (D7)
                  </text>
                  <text x="425" y="203" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                    عزل وتشغيل شفاط الطرد والإنذار
                  </text>

                  {/* Power Block */}
                  <rect x="330" y="224" width="190" height="36" rx="6" fill="#162033" stroke="#F87171" strokeWidth="1.5" />
                  <text x="425" y="246" fill="#FCA5A5" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    Power Management 9V / 5V
                  </text>
                </svg>
              </div>

              {/* Power & Isolation Notes */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">
                    تغذية الطاقة (Power Management)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    تغذية مستقرة <span className="font-mono font-semibold text-slate-900">9V / 5V</span> لضمان استجابة المحركات (SG90 Servo) بدون أي هبوط في الجهد الكهربائي أثناء لحظة الإغلاق.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">
                    دائرة التحكم والريلاي (Electrical Isolation)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    فصل الدوائر ذات الجهد العالي (الشفاط <span className="font-mono font-semibold text-slate-900">220V AC</span>) عن دائرة التحكم الدقيقة <span className="font-mono font-semibold text-slate-900">Arduino</span> لحماية الشريحة ومنع حدوث أي شرارة كهربائية.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
