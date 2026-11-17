import { Check, X } from 'lucide-react';
import {
  BOM_ITEMS,
  COMPETITIVE_MATRIX,
  HARDWARE_SPECS,
  LAB_TEST_RESULTS,
} from '../data/projectData';

export default function EngineeringDataSection() {
  const totalCalculated = BOM_ITEMS.reduce((sum, item) => sum + item.costEgp, 0);

  return (
    <section className="bg-white border-b border-slate-200 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16 sm:space-y-20">
        {/* 06. Hardware Specifications (Slide 8) */}
        <div id="hardware">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
              06. المكونات الصلبة
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
              style={{ textWrap: 'balance' }}
            >
              المواصفات الفنية للمكونات الإلكترونية
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HARDWARE_SPECS.map((hw) => (
              <div
                key={hw.id}
                className={`rounded-xl border border-slate-200 border-t-4 ${hw.accentColor} bg-slate-50/50 p-5 sm:p-6 flex flex-col justify-between`}
              >
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    {hw.subtitle}
                  </div>
                  <h3 className="text-lg font-bold font-mono text-slate-900 mb-2" dir="ltr">
                    {hw.name}
                  </h3>
                  <div className="text-xs font-semibold font-mono tabular-nums text-orange-700 bg-orange-50 border border-orange-200/80 rounded-md px-2.5 py-1 inline-block mb-3">
                    {hw.spec}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {hw.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 07. Lab Test Data & Response Time Chart (Slide 9) */}
        <div id="results-cost" className="space-y-8">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
              07. التجارب والبيانات المعملية
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
              style={{ textWrap: 'balance' }}
            >
              بيانات الاختبارات العملية وزمن الاستجابة
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Desktop Table + Mobile Cards */}
            <div className="lg:col-span-7">
              {/* Mobile Stacked Cards */}
              <div className="space-y-3 md:hidden">
                {LAB_TEST_RESULTS.map((test) => (
                  <div
                    key={test.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-900">{test.name}</span>
                      <span className="font-mono tabular-nums text-sm font-bold text-orange-600">
                        {test.ppm} PPM
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block">زمن كشف التسريب</span>
                        <span className="font-mono tabular-nums font-semibold text-slate-900">
                          {test.detectionTime} ثانية
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">زمن قفل المحبس</span>
                        <span className="font-mono tabular-nums font-semibold text-slate-900">
                          {test.shutoffTime} ثانية
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-700">
                        ✓ {test.result}
                      </span>
                      <span className="font-mono tabular-nums font-bold text-slate-700">
                        الإجمالي: {test.totalTime.toFixed(1)} ث
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop & Tablet Precision Table */}
              <div className="hidden md:block rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-[#0F172A] text-white text-xs sm:text-sm font-semibold">
                      <th className="py-3.5 px-4">التجربة</th>
                      <th className="py-3.5 px-4">تركيز الغاز (PPM)</th>
                      <th className="py-3.5 px-4">زمن كشف التسريب</th>
                      <th className="py-3.5 px-4">زمن قفل المحبس</th>
                      <th className="py-3.5 px-4">النتيجة النهائية</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {LAB_TEST_RESULTS.map((test, idx) => (
                      <tr
                        key={test.id}
                        className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}
                      >
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {test.name}
                        </td>
                        <td className="py-3.5 px-4 font-mono tabular-nums font-semibold text-slate-800">
                          {test.ppm} PPM
                        </td>
                        <td className="py-3.5 px-4 font-mono tabular-nums text-slate-700">
                          {test.detectionTime} ثانية
                        </td>
                        <td className="py-3.5 px-4 font-mono tabular-nums text-slate-700">
                          {test.shutoffTime} ثانية
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-700">
                          ✓ {test.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual Response Time Comparison vs 3.0s Limit */}
            <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  مقارنة زمن الاستجابة الكلي بحد الأمان (3.0s)
                </h3>
                <span className="text-xs font-mono tabular-nums text-emerald-700 font-semibold">
                  100% ضمن الحد
                </span>
              </div>

              <div className="space-y-4">
                {LAB_TEST_RESULTS.map((test) => {
                  const detectPct = (test.detectionTime / 3) * 100;
                  const shutoffPct = (test.shutoffTime / 3) * 100;

                  return (
                    <div key={test.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">
                          {test.name} ({test.ppm} PPM)
                        </span>
                        <span className="font-mono tabular-nums font-bold text-slate-900">
                          {test.totalTime.toFixed(1)} / 3.0 ثانية
                        </span>
                      </div>
                      <div className="h-4 w-full rounded-md bg-slate-200 overflow-hidden flex">
                        <div
                          className="h-full bg-sky-600"
                          style={{ width: `${detectPct}%` }}
                          title={`كشف التسريب: ${test.detectionTime}ث`}
                        />
                        <div
                          className="h-full bg-orange-600"
                          style={{ width: `${shutoffPct}%` }}
                          title={`قفل المحبس: ${test.shutoffTime}ث`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-sky-600 inline-block" />
                  <span>زمن كشف التسريب</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-orange-600 inline-block" />
                  <span>زمن قفل المحبس (90°)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 08. Competitive Analysis (Slide 10) */}
        <div className="space-y-6">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
              08. التحليل التنافسي
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
              style={{ textWrap: 'balance' }}
            >
              مقارنة التميز الابتكاري مع الأنظمة التجارية
            </h2>
          </div>

          {/* Mobile Stacked Comparison Cards */}
          <div className="space-y-4 md:hidden">
            {COMPETITIVE_MATRIX.map((row) => (
              <div
                key={row.aspect}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
              >
                <div className="font-bold text-slate-900 border-b border-slate-200 pb-2">
                  {row.aspect}
                </div>
                <div className="rounded-lg bg-emerald-50/70 border border-emerald-200 p-3">
                  <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" />
                    <span>مشروعنا الذكي (Smart Rescue)</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">{row.smartRescue}</p>
                </div>
                <div className="rounded-lg bg-red-50/60 border border-red-200/80 p-3">
                  <div className="text-xs font-bold text-red-700 mb-1 flex items-center gap-1.5">
                    <X className="h-3.5 w-3.5" />
                    <span>الأنظمة التجارية التقليدية</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{row.traditional}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Comparison Table */}
          <div className="hidden md:block rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#0F172A] text-white text-sm font-semibold">
                  <th className="py-4 px-5 w-1/4">وجه المقارنة</th>
                  <th className="py-4 px-5 w-3/8">مشروعنا الذكي (Smart Rescue)</th>
                  <th className="py-4 px-5 w-3/8">الأنظمة التجارية التقليدية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {COMPETITIVE_MATRIX.map((row, idx) => (
                  <tr
                    key={row.aspect}
                    className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}
                  >
                    <td className="py-4 px-5 font-bold text-slate-900">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-5 font-semibold text-emerald-800">
                      ✓ {row.smartRescue}
                    </td>
                    <td className="py-4 px-5 text-red-700">
                      ✕ {row.traditional}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 09. Economic Cost Breakdown (Slide 12) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold text-orange-600 mb-2">
                09. التكلفة الاقتصادية
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug"
                style={{ textWrap: 'balance' }}
              >
                جدول تفصيلي لتكلفة القطع والإنتاج
              </h2>
            </div>
            <div className="text-sm font-bold font-mono tabular-nums text-orange-700">
              المجموع الفعلي: {totalCalculated} ج.م (أقل من 400 ج.م)
            </div>
          </div>

          {/* Mobile Stacked Cost Cards */}
          <div className="space-y-2.5 md:hidden">
            {BOM_ITEMS.map((item) => (
              <div
                key={item.component}
                className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-mono text-sm font-semibold text-slate-900" dir="ltr">
                    {item.component}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    العدد: <span className="font-mono">{item.quantity}</span>
                  </div>
                </div>
                <div className="font-mono tabular-nums text-sm font-bold text-slate-900 shrink-0">
                  {item.costEgp} ج.م
                </div>
              </div>
            ))}
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 flex items-center justify-between">
              <span className="font-bold text-orange-900">التكلفة الإجمالية للنظام</span>
              <span className="font-mono tabular-nums font-bold text-orange-700">
                أقل من 350 – 400 ج.م
              </span>
            </div>
          </div>

          {/* Desktop Cost Table */}
          <div className="hidden md:block rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#0F172A] text-white text-sm font-semibold">
                  <th className="py-3.5 px-5">المكون / القطعة</th>
                  <th className="py-3.5 px-5 text-center">العدد</th>
                  <th className="py-3.5 px-5 text-left">التكلفة التقديرية (ج.م)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {BOM_ITEMS.map((item, idx) => (
                  <tr
                    key={item.component}
                    className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}
                  >
                    <td className="py-3.5 px-5 font-mono font-medium text-slate-900" dir="ltr" style={{ textAlign: 'right' }}>
                      {item.component}
                    </td>
                    <td className="py-3.5 px-5 text-center font-mono tabular-nums text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-5 text-left font-mono tabular-nums font-semibold text-slate-900">
                      {item.costEgp} ج.م
                    </td>
                  </tr>
                ))}
                <tr className="bg-orange-50/90 font-bold text-orange-800 border-t-2 border-orange-200">
                  <td className="py-4 px-5">التكلفة الإجمالية للنظام</td>
                  <td className="py-4 px-5 text-center font-mono">—</td>
                  <td className="py-4 px-5 text-left font-mono tabular-nums">
                    أقل من 350 – 400 ج.م
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
