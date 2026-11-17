import { useState } from 'react';
import {
  BatteryCharging,
  ChevronDown,
  Factory,
  FileDown,
  Power,
  RotateCcw,
  ShieldAlert,
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
      {/* 10 & 11: Fail-Safe Protocols + Scale-Up Roadmap (Light Lab Canvas) */}
      <section className="bg-slate-50 border-b border-slate-200 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16 sm:space-y-20">
          {/* 10. Fail-Safe Protocols (Slide 11) */}
          <div>
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
                10. بروتوكولات الأمان
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
                style={{ textWrap: 'balance' }}
              >
                معايير السلامة وآلية الفشل الآمن (Fail-Safe)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {FAIL_SAFE_PROTOCOLS.map((item) => {
                const Icon = FAILSAFE_ICONS[item.id as keyof typeof FAILSAFE_ICONS];
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-orange-600">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 11. Scale-Up Roadmap (Slide 13) */}
          <div>
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
                11. التطوير المستقبلي
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
                style={{ textWrap: 'balance' }}
              >
                رؤية التحديث والتطوير المستقبلي (Scale-Up)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {SCALE_UP_ROADMAP.map((item) => {
                const Icon = SCALEUP_ICONS[item.id as keyof typeof SCALEUP_ICONS];
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sky-700">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 12. Societal Impact & ISEF Judge Q&A (Slide 14) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
                  12. الخلاصة والأثر المجتمعي
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
                  style={{ textWrap: 'balance' }}
                >
                  الأثر المجتمعي والنتيجة النهائية للمشروع
                </h2>
              </div>

              <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-5 sm:p-6">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  حماية الأرواح والممتلكات
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  يقدم المشروع حلاً هندسياً تطبيقياً ينهي خطر الاختناقات والحرائق المنزلية الناتجة عن تسريب الغاز بتكلفة بسيطة جداً متناسبة مع كافة الفئات.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 sm:p-6">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  الاستجابة الميكانيكية الفورية
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  الانتقال المباشر من التنبيهات الصوتية التي لا تجدي نفعاً في غياب الإنسان، إلى الاستجابة الميكانيكية التلقائية في زمن قياسي (3 ثوانٍ).
                </p>
              </div>
            </div>

            {/* Interactive ISEF Judging Q&A Accordion */}
            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="mb-5 pb-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  أسئلة لجنة التحكيم الهندسي (ISEF Q&amp;A)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  إجابات هندسية موثقة حول أمان الدائرة الكهربائية ومنطق التشغيل
                </p>
              </div>

              <div className="divide-y divide-slate-200">
                {JUDGE_QA.map((item, idx) => {
                  const isOpen = openQaIndex === idx;
                  return (
                    <div key={item.q} className="py-3.5 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenQaIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 text-right py-2 font-bold text-sm sm:text-base text-slate-900 hover:text-orange-600 transition-colors min-h-[44px]"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-orange-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="pt-1 pb-2 text-sm text-slate-600 leading-relaxed">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 15: Closing & Footer */}
      <footer className="bg-[#0F172A] text-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/20 border border-orange-500/40 text-orange-400 mx-auto">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            شكراً لحسن استماعكم
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            نظام الإنقاذ الذكي من تسريب الغاز — جاهزون لاستقبال أسئلة واستفسارات لجنة تحكيم{' '}
            <span className="font-mono text-white">ISEF</span>.
          </p>

          <div className="inline-block rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm sm:text-base font-semibold text-slate-100">
            إعداد وتنفيذ: عبد الله محمد فهمي عبدالنبي
          </div>

          <div className="pt-4">
            <a
              href="/assets/aistudio/Smart_Gas_Leak_Rescue_System_Presentation_ecad2a87.pdf"
              download="Smart_Gas_Leak_Rescue_System_Presentation.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/70 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors min-h-[44px]"
            >
              <FileDown className="h-4 w-4 text-orange-400" />
              <span>تحميل ملف العرض التقديمي الكامل (PDF)</span>
            </a>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>نظام الإنقاذ الذكي من تسريب الغاز · Smart Gas Leak Rescue System</span>
            <div className="flex items-center gap-5">
              <a href="#hero" className="hover:text-white transition-colors">
                الرئيسية
              </a>
              <a href="#simulator" className="hover:text-white transition-colors">
                المحاكي التفاعلي
              </a>
              <a href="#results-cost" className="hover:text-white transition-colors">
                النتائج والتكلفة
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
