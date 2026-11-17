/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemAndCriteriaSection from './components/ProblemAndCriteriaSection';
import InteractiveRescueSimulator from './components/InteractiveRescueSimulator';
import EngineeringDataSection from './components/EngineeringDataSection';
import SafetyAndFutureSection from './components/SafetyAndFutureSection';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemAndCriteriaSection />
        <InteractiveRescueSimulator />
        <EngineeringDataSection />
        <SafetyAndFutureSection />
      </main>
    </div>
  );
}
