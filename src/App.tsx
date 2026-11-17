/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemAndCriteriaSection from './components/ProblemAndCriteriaSection';
import InteractiveRescueSimulator from './components/InteractiveRescueSimulator';
import EngineeringDataSection from './components/EngineeringDataSection';
import SafetyAndFutureSection from './components/SafetyAndFutureSection';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#03050C] text-slate-100 overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <ProblemAndCriteriaSection />
          <InteractiveRescueSimulator />
          <EngineeringDataSection />
          <SafetyAndFutureSection />
        </main>
      </div>
    </MotionConfig>
  );
}
