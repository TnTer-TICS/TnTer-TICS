/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TrustBadges } from './components/TrustBadges.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { PriceCalculator } from './components/PriceCalculator.tsx';
import { PricingTable } from './components/PricingTable.tsx';
import { RecruitmentSection } from './components/RecruitmentSection.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingActions } from './components/FloatingActions.tsx';
import { GoogleSheetGuideModal } from './components/GoogleSheetGuideModal.tsx';
import { SERVICES } from './constants/config.ts';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].name);
  const [selectedPackage, setSelectedPackage] = useState<string>(SERVICES[0].packages[0]);
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [isSheetGuideOpen, setIsSheetGuideOpen] = useState<boolean>(false);

  // Smooth scroll and populate booking form
  const handleServiceChange = (serviceName: string, packageName: string) => {
    setSelectedService(serviceName);
    setSelectedPackage(packageName);
  };

  const handleSelectPackageFromCards = (serviceName: string, packageName: string) => {
    setSelectedService(serviceName);
    setSelectedPackage(packageName);
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyCalc = (serviceName: string, packageName: string, noteText: string) => {
    setSelectedService(serviceName);
    setSelectedPackage(packageName);
    setBookingNotes(noteText);
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Be_Vietnam_Pro',sans-serif] text-slate-800">
      {/* Header Navigation */}
      <Header onOpenSheetGuide={() => setIsSheetGuideOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Quick Booking Form */}
        <Hero
          selectedService={selectedService}
          selectedPackage={selectedPackage}
          onServiceChange={handleServiceChange}
          bookingNotes={bookingNotes}
        />

        {/* Value Proposition & Trust Pillars */}
        <TrustBadges />

        {/* 3 Core Services in Detail */}
        <ServicesSection onSelectService={handleSelectPackageFromCards} />

        {/* Interactive Online Price Calculator (-20% vs Competitors) */}
        <PriceCalculator onApplyCalc={handleApplyCalc} />

        {/* Benchmark Pricing Table */}
        <PricingTable onSelectPackage={handleSelectPackageFromCards} />

        {/* Recruitment & Healthcare Training Section (Sends to Applications-Tuyển Dụng) */}
        <RecruitmentSection />

        {/* 4-Step Standard Operation Process */}
        <ProcessSection />

        {/* Regional Customer Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer onOpenSheetGuide={() => setIsSheetGuideOpen(true)} />

      {/* Floating Hotline & Zalo CTAs */}
      <FloatingActions />

      {/* Google Sheet Guide & Live Webhook Tester Modal */}
      <GoogleSheetGuideModal
        isOpen={isSheetGuideOpen}
        onClose={() => setIsSheetGuideOpen(false)}
      />
    </div>
  );
}
