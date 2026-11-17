import { AlertTriangle, ShieldCheck, Target, Zap, Coins } from 'lucide-react';
import { CORE_INSIGHT, DESIGN_CRITERIA, PROBLEM_POINTS } from '../data/projectData';

const CRITERIA_ICONS = {
  'fast-response': Zap,
  'full-automation': ShieldCheck,
  'economic-feasibility': Coins,
};

const CRITERIA_TONES = {
  orange: 'text-orange-600 bg-orange-50 border-orange-200',
  blue: 'text-sky-700 bg-sky-50 border-sky-200',
  emerald: 'text-emerald-700 bg-emerald-50 border-emerald-200',
};

export default function ProblemAndCriteriaSection() {
  return (
    <section id="problem-criteria" className="bg-white border-b border-slate-200 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16 sm:space-y-20">
        {/* 01. Problem Definition */}
        <div>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
              01. أزمة الأنظمة التقليدية
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
              style={{ textWrap: 'balance' }}
            >
              لماذا تحدث الكوارث رغم وجود أجهزة الإنذار؟
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Shortcomings List */}
            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-200">
                <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                <h3 className="text-lg font-bold text-slate-900">
                  القصور في الحلول الحالية
                </h3>
              </div>

              <div className="space-y-5">
                {PROBLEM_POINTS.map((point, index) => (
                  <div
                    key={point.id}
                    className={index > 0 ? 'pt-5 border-t border-slate-200/80' : ''}
                  >
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {point.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Problem Insight */}
            <div className="lg:col-span-5 rounded-xl border border-orange-200 bg-orange-50/60 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orange-200 bg-white text-orange-600 mb-5">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  الخلاصة الأساسية للمشكلة
                </h3>
                <blockquote className="text-lg sm:text-xl font-bold text-orange-950 leading-relaxed">
                  «{CORE_INSIGHT}»
                </blockquote>
              </div>

              <p className="mt-6 pt-4 border-t border-orange-200/80 text-xs sm:text-sm text-orange-900/80 leading-relaxed">
                الانتقال من مجرد إصدار صوت تنبيهي إلى تدخل ميكانيكي وكهربائي فوري هو الفارق الفعلي بين الإنذار والإنقاذ.
              </p>
            </div>
          </div>
        </div>

        {/* 02. Engineering Design Criteria */}
        <div>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
              02. الأهداف والفرضية البحثية
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
              style={{ textWrap: 'balance' }}
            >
              الأهداف الهندسية ومعايير التصميم (Design Criteria)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {DESIGN_CRITERIA.map((criterion) => {
              const Icon = CRITERIA_ICONS[criterion.id as keyof typeof CRITERIA_ICONS];
              const tone = CRITERIA_TONES[criterion.accent];

              return (
                <div
                  key={criterion.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${tone}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold font-mono tabular-nums text-slate-900">
                        {criterion.metric}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {criterion.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {criterion.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
