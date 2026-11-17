export interface ProblemPoint {
  id: string;
  index: string;
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
    value: '< 3.0s',
    label: 'Autonomous Response',
    sublabel: 'Complete gas shutoff & ventilation before ignition threshold',
  },
  {
    value: '350 EGP',
    label: 'Economic BOM Cost',
    sublabel: 'Under 400 EGP target for widespread residential adoption',
  },
  {
    value: '90° Shutoff',
    label: 'Mechanical Isolation',
    sublabel: 'Direct SG90 servo actuation on residential gas valves',
  },
  {
    value: 'ISEF Standard',
    label: 'Empirical Validation',
    sublabel: 'Verified across multi-concentration lab response trials',
  },
];

export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    id: 'passive-alarm',
    index: '01',
    title: 'Passive Audio-Only Alerts',
    description:
      'Conventional commercial detectors only sound a buzzer upon detecting gas—leaving the physical leak source completely open.',
  },
  {
    id: 'human-absence',
    index: '02',
    title: 'Dependence on Human Presence',
    description:
      'Audible sirens are ineffective when residents are asleep, away from home, or unable to reach the main shutoff valve in time.',
  },
  {
    id: 'escalating-danger',
    index: '03',
    title: 'Rapid Escalation to Ignition',
    description:
      'An unclosed gas line allows LPG or methane to accumulate rapidly, turning a minor leak into asphyxiation or explosion within minutes.',
  },
];

export const CORE_INSIGHT =
  'The fundamental failure is not detecting gas in the air—it is the lack of an intelligent mechanism that acts autonomously on the spot.';

export const DESIGN_CRITERIA: DesignCriterion[] = [
  {
    id: 'fast-response',
    title: 'Instant Intervention',
    metric: '< 3.0 sec',
    description:
      'Isolate the gas supply in under 3 seconds to prevent ambient gas concentration from reaching the lower explosive limit.',
    accent: 'orange',
  },
  {
    id: 'full-automation',
    title: 'Zero-Touch Automation',
    metric: '100% Autonomous',
    description:
      'Operate with full reliability without requiring human presence, awareness, or manual intervention during an emergency.',
    accent: 'blue',
  },
  {
    id: 'economic-feasibility',
    title: 'Economic Accessibility',
    metric: '< 400 EGP',
    description:
      'Engineer the entire rescue assembly using compact, off-the-shelf modules under 400 EGP for mass household deployment.',
    accent: 'emerald',
  },
];

export const SOLUTION_STAGES: SolutionStage[] = [
  {
    step: '01',
    title: 'Leak Detection',
    detail: 'MQ-2 SnO₂ sensor continuously samples ambient LPG/methane concentration via analog pin A0.',
    component: 'MQ-2 Sensor',
  },
  {
    step: '02',
    title: 'Valve Shutoff',
    detail: 'SG90 high-torque micro servo rotates 90° to mechanically seal the main gas supply line.',
    component: 'SG90 Servo (90°)',
  },
  {
    step: '03',
    title: 'Active Evacuation',
    detail: 'Opto-isolated 5V Relay triggers the household exhaust fan to rapidly purge accumulated gas.',
    component: '5V Relay Control',
  },
  {
    step: '04',
    title: 'Alert & Fail-Safe Lock',
    detail: 'Audio-visual warning activates while locking the valve closed until manual safety inspection.',
    component: 'Buzzer + Fail-Safe',
  },
];

export const FLOWCHART_STEPS = [
  {
    step: '01',
    title: 'Sample Sensor',
    code: 'analogRead(A0)',
    description: 'Continuously read analog voltage on A0 and compute gas concentration in PPM.',
  },
  {
    step: '02',
    title: 'Threshold Check',
    code: 'if (PPM > 400)',
    description: 'Evaluate whether concentration exceeds the 400 PPM danger threshold; otherwise keep monitoring.',
  },
  {
    step: '03',
    title: 'Seal Valve',
    code: 'servo.write(90)',
    description: 'Command the SG90 servo actuator to rotate 90° and cut off the gas source immediately.',
  },
  {
    step: '04',
    title: 'Ventilate & Latch',
    code: 'digitalWrite(RELAY, HIGH)',
    description: 'Energize the exhaust fan relay and piezo buzzer while latching the valve shut until Reset.',
  },
];

export const HARDWARE_SPECS: HardwareSpec[] = [
  {
    id: 'arduino',
    name: 'Arduino UNO',
    subtitle: 'Central Microcontroller',
    spec: 'ATmega328P · 16 MHz',
    detail: 'Processes analog sensor telemetry in milliseconds and coordinates simultaneous shutoff and relay triggers.',
    accentColor: 'border-t-orange-600',
  },
  {
    id: 'mq2',
    name: 'MQ-2 Gas Sensor',
    subtitle: 'Chemiresistive Detector',
    spec: '200 – 10,000 PPM',
    detail: 'Tin dioxide (SnO₂) sensing layer tuned for high-sensitivity detection of Natural Gas and LPG.',
    accentColor: 'border-t-sky-600',
  },
  {
    id: 'sg90',
    name: 'SG90 Servo Motor',
    subtitle: 'Valve Actuator',
    spec: '2.5 kg/cm Torque',
    detail: 'Delivers sufficient mechanical torque to cleanly rotate compact residential gas ball valves by 90°.',
    accentColor: 'border-t-emerald-600',
  },
  {
    id: 'relay',
    name: '5V Relay Module',
    subtitle: 'High-Voltage Isolation',
    spec: '10A / 250V AC Rated',
    detail: 'Galvanically isolates the 5V logic circuit from high-voltage exhaust fans to eliminate spark risks.',
    accentColor: 'border-t-indigo-600',
  },
];

export const LAB_TEST_RESULTS: LabTestResult[] = [
  {
    id: 'test-1',
    name: 'Trial 01',
    ppm: 450,
    detectionTime: 1.2,
    shutoffTime: 1.5,
    totalTime: 2.7,
    result: 'Full Shutoff Verified',
  },
  {
    id: 'test-2',
    name: 'Trial 02',
    ppm: 650,
    detectionTime: 0.8,
    shutoffTime: 1.4,
    totalTime: 2.2,
    result: 'Full Shutoff Verified',
  },
  {
    id: 'test-3',
    name: 'Trial 03',
    ppm: 900,
    detectionTime: 0.5,
    shutoffTime: 1.2,
    totalTime: 1.7,
    result: 'Full Shutoff Verified',
  },
];

export const COMPETITIVE_MATRIX: CompetitiveRow[] = [
  {
    aspect: 'Response Mechanism',
    smartRescue: 'Integrated rescue: mechanically seals source & activates exhaust',
    traditional: 'Passive audio siren only with zero physical intervention',
  },
  {
    aspect: 'Unattended Protection',
    smartRescue: 'Full protection while residents are asleep or away from home',
    traditional: 'Requires a conscious person nearby to manually close the valve',
  },
  {
    aspect: 'Gas Dispersion',
    smartRescue: 'Active exhaust ventilation rapidly lowers explosion risk',
    traditional: 'Passive: allows flammable gas to keep accumulating indoors',
  },
];

export const BOM_ITEMS: BomItem[] = [
  { component: 'Arduino UNO Board', quantity: '1 unit', costEgp: 180 },
  { component: 'MQ-2 Gas Sensor Module', quantity: '1 unit', costEgp: 60 },
  { component: 'SG90 Servo Motor', quantity: '1 unit', costEgp: 45 },
  { component: '5V Relay Module + Buzzer + LEDs', quantity: '1 set', costEgp: 65 },
];

export const FAIL_SAFE_PROTOCOLS: FailSafeProtocol[] = [
  {
    id: 'isolation',
    title: 'Spark-Free Signal Isolation',
    description:
      'High-voltage exhaust switching is isolated via an enclosed 5V relay module, preventing exposed electrical sparks near leaked gas.',
    tag: 'Electrical Safety',
  },
  {
    id: 'backup-battery',
    title: 'Emergency Battery Backup',
    description:
      'Dedicated 9V/5V regulated power supply with backup battery reserve ensures uninterrupted valve actuation even during grid blackouts.',
    tag: 'Power Resilience',
  },
  {
    id: 'manual-reset',
    title: 'Manual Reset Interlock',
    description:
      'Once sealed, the gas valve never reopens automatically when gas dissipates—requiring physical inspection and pressing the Reset button.',
    tag: 'Fail-Safe Lock',
  },
];

export const SCALE_UP_ROADMAP: ScaleUpItem[] = [
  {
    id: 'esp32-iot',
    title: 'ESP32 IoT Telemetry',
    description:
      'Integrate Wi-Fi/BLE connectivity via ESP32 to dispatch real-time smartphone push alerts and live PPM logs during emergencies.',
    tag: 'Phase 01 · Connected',
  },
  {
    id: 'industrial-valve',
    title: 'OEM Integrated Valves',
    description:
      'Co-engineer factory-integrated motorized gas valves rather than external servo retrofits for commercial and industrial piping.',
    tag: 'Phase 02 · Industrial',
  },
  {
    id: 'solar-power',
    title: 'Autonomous Solar Charging',
    description:
      'Pair the emergency backup battery with a compact photovoltaic trickle charger for complete independence from mains power.',
    tag: 'Phase 03 · Off-Grid',
  },
];

export const JUDGE_QA = [
  {
    q: 'How does the system prevent electrical sparks from igniting leaked gas when switching the exhaust fan?',
    a: 'The 5V Arduino logic circuit is completely isolated from the 220V AC exhaust fan circuit through an enclosed 5V relay module, eliminating exposed contact arcing in the sensing zone.',
  },
  {
    q: 'Does the gas valve reopen automatically once the exhaust fan clears the gas below 400 PPM?',
    a: 'No. By Fail-Safe design, once the SG90 servo rotates 90° to seal the valve, it remains latched closed regardless of subsequent PPM drops until a technician inspects the source and presses the manual Reset button.',
  },
  {
    q: 'Why was 400 PPM selected as the automatic shutoff threshold?',
    a: 'Readings between 200–400 PPM trigger an early air-quality warning. Setting the hard mechanical trigger at 400 PPM leaves a wide safety margin well below the Lower Explosive Limit (LEL) of LPG and methane.',
  },
  {
    q: 'What happens if the household electricity goes out during a gas leak?',
    a: 'The controller and actuator run on a stabilized 9V/5V rail backed up by an emergency battery pack, guaranteeing full detection and 90° valve closure independent of mains AC power.',
  },
];
