import { ArrowDownLeft, FileDown } from 'lucide-react';
import { HERO_METRICS } from '../data/projectData';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative bg-[#0F172A] text-white border-b border-slate-800 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        {/* 2-Column Hero Split with balanced alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Primary Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-orange-400 mb-5">
              <span>مشروع إنقاذ هندسي</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">إعداد: عبد الله محمد فهمي عبدالنبي</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-slate-300">ISEF Standard</span>
            </div>

            <h1
              className="font-bold tracking-tight text-white leading-[1.2] mb-5"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.35rem)',
                textWrap: 'balance',
              }}
            >
              نظام الإنقاذ الذكي من تسريب الغاز
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              ابتكار هندسي يتجاوز الإنذار السلبي إلى التدخل الآلي المباشر لإغلاق مصدر الغاز
              وتفعيل التهوية الميكانيكية وتأمين بيئة المنزل خلال{' '}
              <span className="font-semibold text-white font-mono tabular-nums">3</span> ثوانٍ.
            </p>

            {/* Primary CTA + Secondary Clean Link */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-orange-500 transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <span>تشغيل محاكي الطوارئ</span>
                <ArrowDownLeft className="h-4 w-4" />
              </a>

              <a
                href="/assets/aistudio/Smart_Gas_Leak_Rescue_System_Presentation_ecad2a87.pdf"
                download="Smart_Gas_Leak_Rescue_System_Presentation.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-5 py-3.5 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <FileDown className="h-4 w-4 text-orange-400" />
                <span>تحميل العرض التقديمي (PDF)</span>
              </a>
            </div>
          </div>

          {/* Visual Schematic Column (Crisp technical architectural diagram) */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-medium text-slate-400">
                  مخطط التدخل الآلي المباشر
                </span>
                <span className="text-xs font-mono tabular-nums text-orange-400">
                  Threshold &gt; 400 PPM
                </span>
              </div>

              {/* Clean Technical Schematic SVG */}
              <svg
                viewBox="0 0 400 240"
                className="w-full h-auto my-auto"
                role="img"
                aria-label="مخطط توضيحي لتوصيل حساس الغاز والمتحكم ومحرك قفل المحبس والشفاط"
              >
                {/* Background Grid */}
                <defs>
                  <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="400" height="240" rx="8" fill="#0B1221" />
                <rect width="400" height="240" rx="8" fill="url(#heroGrid)" />

                {/* Connection Lines */}
                {/* MQ-2 -> Arduino */}
                <path d="M 110 70 L 160 70 L 160 110 L 170 110" fill="none" stroke="#38BDF8" strokeWidth="2" />
                {/* Arduino -> SG90 */}
                <path d="M 230 95 L 270 95 L 270 65 L 290 65" fill="none" stroke="#EA580C" strokeWidth="2" />
                {/* Arduino -> Relay/Fan */}
                <path d="M 230 135 L 270 135 L 270 175 L 290 175" fill="none" stroke="#10B981" strokeWidth="2" />
                {/* Power Supply -> Arduino */}
                <path d="M 110 175 L 160 175 L 160 135 L 170 135" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />

                {/* Node 1: MQ-2 Sensor */}
                <g transform="translate(20, 42)">
                  <rect width="90" height="56" rx="6" fill="#162033" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="22" cy="28" r="10" fill="#0EA5E9" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="58" y="25" fill="#F8FAFC" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    MQ-2
                  </text>
                  <text x="58" y="41" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                    حساس الغاز
                  </text>
                </g>

                {/* Node 2: 9V/5V Power */}
                <g transform="translate(20, 147)">
                  <rect width="90" height="56" rx="6" fill="#162033" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="45" y="25" fill="#FBBF24" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    9V / 5V
                  </text>
                  <text x="45" y="42" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                    تغذية وطوارئ
                  </text>
                </g>

                {/* Center Node: Arduino UNO */}
                <g transform="translate(170, 82)">
                  <rect width="60" height="76" rx="6" fill="#1E293B" stroke="#F8FAFC" strokeWidth="1.5" />
                  <rect x="16" y="14" width="28" height="16" rx="2" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
                  <text x="30" y="48" fill="#FFFFFF" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    UNO
                  </text>
                  <text x="30" y="63" fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    16 MHz
                  </text>
                </g>

                {/* Node 3: SG90 Servo Valve */}
                <g transform="translate(290, 37)">
                  <rect width="90" height="56" rx="6" fill="#162033" stroke="#EA580C" strokeWidth="1.5" />
                  <text x="45" y="24" fill="#FB923C" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    SG90 90°
                  </text>
                  <text x="45" y="41" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                    قفل المحبس
                  </text>
                </g>

                {/* Node 4: 5V Relay + Exhaust */}
                <g transform="translate(290, 147)">
                  <rect width="90" height="56" rx="6" fill="#162033" stroke="#10B981" strokeWidth="1.5" />
                  <text x="45" y="24" fill="#34D399" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                    5V Relay
                  </text>
                  <text x="45" y="41" fill="#94A3B8" fontSize="9.5" textAnchor="middle">
                    شفاط طرد الغاز
                  </text>
                </g>
              </svg>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>قراءة مستمرة عبر A0</span>
                <span className="font-mono tabular-nums text-emerald-400">ATmega328P · Fail-Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 3-Column Empirical Metric Strip Below Hero */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 border border-slate-800 rounded-xl bg-slate-900/60 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-800">
          {HERO_METRICS.map((item) => (
            <div key={item.label} className="p-5 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
                {item.value}
              </div>
              <div className="mt-1.5 text-sm font-semibold text-orange-400">
                {item.label}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
