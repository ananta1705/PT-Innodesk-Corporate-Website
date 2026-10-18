import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { AboutSection } from './sections/AboutSection';
import { WorkflowSection } from './sections/WorkflowSection';
import { CapabilitiesSection } from './sections/CapabilitiesSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { DetailModal, ModalData } from './components/DetailModal';
import { ServiceItem, PortfolioConceptItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [modalData, setModalData] = useState<ModalData>(null);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Smooth scroll to target section with sticky header offset
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 72;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scroll spy to highlight current navigation item across all 6 anchored sections
  useEffect(() => {
    const sectionIds = [
      'beranda',
      'layanan',
      'tentang',
      'cara-kerja',
      'solusi',
      'kontak',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenServiceDetail = (service: ServiceItem) => {
    setModalData({ type: 'service', item: service });
  };

  const handleOpenAllServices = () => {
    setModalData({ type: 'all-services' });
  };

  const handleOpenPortfolioDetail = (item: PortfolioConceptItem) => {
    setModalData({ type: 'portfolio', item });
  };

  const handleSelectServiceForContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    setModalData(null);
    scrollToSection('kontak');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#111827] font-sans antialiased">
      {/* 1. Header / Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* 2. Hero */}
        <HeroSection onNavigate={scrollToSection} />

        {/* 3. IoT Service Categories */}
        <ServicesSection
          onOpenServiceDetail={handleOpenServiceDetail}
          onOpenAllServices={handleOpenAllServices}
        />

        {/* 4. About PT Innodesk */}
        <AboutSection onNavigate={scrollToSection} />

        {/* 5. IoT Workflow / How It Works */}
        <WorkflowSection />

        {/* 6. Capabilities Band */}
        <CapabilitiesSection />

        {/* 7. Solutions & Concept Portfolio + 8. Why PT Innodesk */}
        <PortfolioSection
          onOpenPortfolioDetail={handleOpenPortfolioDetail}
          onDiscussConcept={() => scrollToSection('kontak')}
        />

        {/* 9. Contact CTA Strip & Validated Inquiry Form */}
        <ContactSection
          preselectedService={preselectedService}
          onNavigate={scrollToSection}
        />
      </main>

      {/* 10. Footer */}
      <Footer
        onNavigate={scrollToSection}
        onSelectService={handleOpenServiceDetail}
      />

      {/* Accessible Detail Modal */}
      <DetailModal
        modalData={modalData}
        onClose={() => setModalData(null)}
        onSelectServiceForContact={handleSelectServiceForContact}
        onSelectServiceDetail={handleOpenServiceDetail}
      />
    </div>
  );
}
