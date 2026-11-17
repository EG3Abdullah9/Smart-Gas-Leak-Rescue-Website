export interface ProblemPoint {
  id: string;
  title: string;
  description: string;
}

export interface DesignCriterion {
  id: string;
  title: string;
  metric: string;
  description: string;
  accent: 'orange' | 'blue' | 'emerald';
}

export interface SolutionStage {
  step: string;
  title: string;
  detail: string;
  component: string;
}

export interface HardwareSpec {
  id: string;
  name: string;
  subtitle: string;
  spec: string;
  detail: string;
  accentColor: string;
}

export interface LabTestResult {
  id: string;
  name: string;
  ppm: number;
  detectionTime: number;
  shutoffTime: number;
  totalTime: number;
  result: string;
}

export interface CompetitiveRow {
  aspect: string;
  smartRescue: string;
  traditional: string;
}

export interface BomItem {
  component: string;
  quantity: string;
  costEgp: number;
}

export interface FailSafeProtocol {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface ScaleUpItem {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export const HERO_METRICS = [
  {
    value: '3 ثوانٍ',
    label: 'زمن الاستجابة التلقائية',
    sublabel: 'قطع الغاز وتفعيل التهوية قبل مرحلة الاشتعال',
  },
  {
    value: 'أقل من 400 ج.م',
    label: 'تكلفة تنفيذ اقتصادية',
    sublabel: 'إجمالي تكلفة المكونات الفعلية 350 ج.م',
  },
  {
    value: 'ISEF Standard',
    label: 'معايير التحكيم الهندسي',
    sublabel: 'تصميم مبني على اختبارات معملية موثقة',
  },
];

export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    id: 'passive-alarm',
    title: 'تنبيه صوتي سلبي',
    description: 'الأجهزة المتاحة في الأسواق تطلق صوتاً تحذيرياً فقط عند اكتشاف الغاز دون أي تدخل لإيقاف الخطر.',
  },
  {
    id: 'human-absence',
    title: 'غياب العنصر البشري',
    description: 'لا فائدة من صوت الإنذار إذا كان السكان نائمين بعمق أو خارج المنزل وقت حدوث التسريب.',
  },
  {
    id: 'escalating-danger',
    title: 'تفاقم الخطر خلال دقائق',
    description: 'بقاء المحبس مفتوحاً يحوّل تسريب الغاز البسيط إلى كارثة اختناق أو انفجار خلال دقائق معدودة.',
  },
];

export const CORE_INSIGHT =
  'المشكلة الكبرى ليست في اكتشاف الغاز بالهواء، بل في عدم وجود آلية ذكية تتصرف ذاتياً فوراً.';

export const DESIGN_CRITERIA: DesignCriterion[] = [
  {
    id: 'fast-response',
    title: 'الاستجابة الفورية',
    metric: '< 3 ثوانٍ',
    description: 'قطع مصدر التسريب في زمن أقل من 3 ثوانٍ لمنع وصول تركيز الغاز لمرحلة الاشتعال.',
    accent: 'orange',
  },
  {
    id: 'full-automation',
    title: 'الأتمتة الشاملة',
    metric: '100% ذاتي',
    description: 'عمل النظام بدقة 100% دون الحاجة إلى تواجد أو تدخل العنصر البشري.',
    accent: 'blue',
  },
  {
    id: 'economic-feasibility',
    title: 'الجدوى الاقتصادية',
    metric: '≤ 400 ج.م',
    description: 'تصميم النظام بمكونات مدمجة لا تتجاوز تكلفته 400 جنيه مصري لسهولة الانتشار في كل منزل.',
    accent: 'emerald',
  },
];

export const SOLUTION_STAGES: SolutionStage[] = [
  {
    step: '01',
    title: 'كشف التسريب',
    detail: 'يرصد حساس MQ-2 نسبة الغاز بالهواء عبر الدخل التناظري A0 بدقة عالية.',
    component: 'MQ-2 Sensor',
  },
  {
    step: '02',
    title: 'قفل المحبس',
    detail: 'يغلق موتور SG90 محبس الغاز الرئيسي آلياً بتدويره بزاوية 90 درجة.',
    component: 'SG90 Servo (90°)',
  },
  {
    step: '03',
    title: 'طرد الغاز',
    detail: 'تشغيل الشفاط الكهربائي فوراً عبر وحدة Relay لإخلاء الغاز المتراكم.',
    component: '5V Relay Control',
  },
  {
    step: '04',
    title: 'إنذار وتأمين',
    detail: 'إطلاق تنبيه صوتي وضوئي وإبقاء المحبس مغلقاً حتى إعادة التأمين يدوياً.',
    component: 'Buzzer + Fail-Safe',
  },
];

export const FLOWCHART_STEPS = [
  {
    step: '1',
    title: 'قراءة الحساس',
    code: 'analogRead(A0)',
    description: 'قراءة الدخل التناظري A0 باستمرار لحساب تركيز الغاز بوحدة PPM.',
  },
  {
    step: '2',
    title: 'فحص العتبة',
    code: 'if (PPM > 400)',
    description: 'هل تجاوز تركيز الغاز عتبة الخطر 400 PPM؟ إذا كانت الإجابة لا، تستمر المراقبة.',
  },
  {
    step: '3',
    title: 'غلق المحبس',
    code: 'servo.write(90)',
    description: 'تدوير محرك السيرفو لزاوية 90 درجة لقطع إمداد الغاز فوراً.',
  },
  {
    step: '4',
    title: 'التهوية والإنذار',
    code: 'digitalWrite(RELAY, HIGH)',
    description: 'تفعيل الشفاط والبازر والإنذار الضوئي فوراً مع قفل النظام حتى الضبط اليدوي.',
  },
];

export const HARDWARE_SPECS: HardwareSpec[] = [
  {
    id: 'arduino',
    name: 'Arduino UNO',
    subtitle: 'وحدة المعالجة والتحكم',
    spec: 'ATmega328P · 16 MHz',
    detail: 'شريحة معالجة دقيقة بزمن استجابة بالأجزاء من الثانية لقراءة الحساس وإصدار أوامر الطوارئ.',
    accentColor: 'border-t-orange-600',
  },
  {
    id: 'mq2',
    name: 'MQ-2 Sensor',
    subtitle: 'حساس استشعار الغاز',
    spec: '200 – 10,000 PPM',
    detail: 'نطاق قياس واسع يعتمد على طبقة SnO₂، مناسب بدقة للغاز الطبيعي وغاز البوتوجاز (LPG/Methane).',
    accentColor: 'border-t-sky-600',
  },
  {
    id: 'sg90',
    name: 'SG90 Servo',
    subtitle: 'محرك إغلاق المحبس',
    spec: 'عزم دوران 2.5 kg/cm',
    detail: 'عزم دوران كافٍ لتحريك وإغلاق محابس الغاز المنزلية الصغيرة والدقيقة بزاوية 90 درجة.',
    accentColor: 'border-t-emerald-600',
  },
  {
    id: 'relay',
    name: '5V Relay Control',
    subtitle: 'وحدة عزل وتشغيل الشفاط',
    spec: 'قدرة حتى 10A / 250V AC',
    detail: 'يفصل الدوائر ذات الجهد العالي لتشغيل شفاطات المنزل القوية دون أي خطر أو شرارة على وحدة التحكم.',
    accentColor: 'border-t-indigo-600',
  },
];

export const LAB_TEST_RESULTS: LabTestResult[] = [
  {
    id: 'test-1',
    name: 'اختبار 1',
    ppm: 450,
    detectionTime: 1.2,
    shutoffTime: 1.5,
    totalTime: 2.7,
    result: 'نجاح إغلاق كلي',
  },
  {
    id: 'test-2',
    name: 'اختبار 2',
    ppm: 650,
    detectionTime: 0.8,
    shutoffTime: 1.4,
    totalTime: 2.2,
    result: 'نجاح إغلاق كلي',
  },
  {
    id: 'test-3',
    name: 'اختبار 3',
    ppm: 900,
    detectionTime: 0.5,
    shutoffTime: 1.2,
    totalTime: 1.7,
    result: 'نجاح إغلاق كلي',
  },
];

export const COMPETITIVE_MATRIX: CompetitiveRow[] = [
  {
    aspect: 'آلية التصرف',
    smartRescue: 'إنقاذ متكامل يغلق المصدر آلياً ويشغّل الشفاط',
    traditional: 'إنذار صوتي فقط دون أي تدخل لإيقاف التسريب',
  },
  {
    aspect: 'العمل بضمان الغياب',
    smartRescue: 'حماية كاملة والمنزل فارغ أو أثناء نوم السكان',
    traditional: 'تتطلب وجود شخص مستيقظ لإغلاق المحبس يدوياً',
  },
  {
    aspect: 'سحب وتقليل الغاز',
    smartRescue: 'طرد فعّال للغاز يقلل خطورة الاختناق والانفجار',
    traditional: 'سلبي، يترك الغاز متراكماً داخل المكان المغلق',
  },
];

export const BOM_ITEMS: BomItem[] = [
  { component: 'Arduino UNO Board', quantity: '1', costEgp: 180 },
  { component: 'MQ-2 Gas Sensor Module', quantity: '1', costEgp: 60 },
  { component: 'SG90 Servo Motor', quantity: '1', costEgp: 45 },
  { component: '5V Relay Module + Buzzer + LEDs', quantity: '1 set', costEgp: 65 },
];

export const FAIL_SAFE_PROTOCOLS: FailSafeProtocol[] = [
  {
    id: 'isolation',
    title: 'عزل الإشارة ومنع الشرر',
    description: 'فصل الدوائر ذات الجهد العالي عبر Relay معزول لضمان عدم إحداث أي شرارة كهربائية أثناء فتح أو غلق دوائر الشفاط.',
    tag: 'حماية كهربائية',
  },
  {
    id: 'backup-battery',
    title: 'بطارية الطوارئ المستقلة',
    description: 'تزويد النظام بتغذية مستقرة 9V/5V وبطارية احتياطية لضمان استمرار المراقبة وإغلاق المحبس حتى عند انقطاع الكهرباء.',
    tag: 'استمرارية التشغيل',
  },
  {
    id: 'manual-reset',
    title: 'إعادة الضبط اليدوي (Reset)',
    description: 'عدم فتح محبس الغاز مجدداً بشكل تلقائي مهما انخفض التركيز، إلا بعد الفحص البشري والتأكد التام والضغط على زر Reset.',
    tag: 'أمان ميكانيكي',
  },
];

export const SCALE_UP_ROADMAP: ScaleUpItem[] = [
  {
    id: 'esp32-iot',
    title: 'دمج شريحة ESP32 (IoT)',
    description: 'إرسال إشعارات فورية وتنبيهات لحظية للهاتف المحمول عبر تطبيق خاص عند حدوث أي تسريب مع عرض القراءات عن بُعد.',
    tag: 'إنترنت الأشياء',
  },
  {
    id: 'industrial-valve',
    title: 'التطبيق المصنعي والتجاري',
    description: 'تصميم محابس غاز مدمجة مصنعياً بمحركات داخلية عالية الكفاءة بدلاً من تركيب محرك خارجي على المحبس التقليدي.',
    tag: 'التصنيع القياسي',
  },
  {
    id: 'solar-power',
    title: 'الطاقة الشمسية الذاتية',
    description: 'تزويد وحدة الإنقاذ بخلية شمسية صغيرة لشحن بطارية الطوارئ وجعل النظام مستقلاً تماماً عن الشبكة الكهربائية.',
    tag: 'الاستدامة الطاقية',
  },
];

export const JUDGE_QA = [
  {
    q: 'لماذا لا تسبب دوائر النظام شرارة كهربائية قد تشعل الغاز المتسرب؟',
    a: 'تم تصميم دائرة التحكم بعزل كامل بين متحكم Arduino (5V) ودائرة الشفاط ذات الجهد العالي (220V AC) عبر وحدة 5V Relay معزولة بصرياً/ميكانيكياً، مما يمنع حدوث أي شرارة مكشوفة في منطقة التسريب.',
  },
  {
    q: 'كيف يتصرف النظام إذا انخفضت نسبة الغاز بعد إغلاق المحبس؟ هل يفتح الغاز تلقائياً؟',
    a: 'لا، يعتمد النظام مبدأ الفشل الآمن (Fail-Safe)؛ بمجرد إغلاق المحبس بزاوية 90 درجة، يظل مغلقاً حتى يقوم المستخدم بفحص مكان التسريب والتأكد من سلامته والضغط على زر إعادة الضبط اليدوي (Reset).',
  },
  {
    q: 'ما سبب اختيار عتبة 400 PPM تحديداً لتفعيل التدخل الآلي؟',
    a: 'تبدأ مرحلة التحذير المبكر عند 200-400 PPM لتغير جودة الهواء، بينما تُمثل 400 PPM عتبة الخطر المثالية التي تسبق الحد الأدنى للاشتعال (LEL) بهامش أمان واسع، مما يضمن الإغلاق والتهوية قبل تراكم الغاز لمستوى قابل للانفجار.',
  },
  {
    q: 'ماذا يحدث إذا انقطعت الكهرباء عن المنزل أثناء حدوث التسريب؟',
    a: 'النظام مزود بتغذية مستقرة 9V/5V وبطارية طوارئ احتياطية تضمن استمرار عمل الحساس ومحرك السيرفو لإغلاق المحبس فوراً دون الاعتماد على كهرباء المنزل الرئيسية.',
  },
];
