import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowRight, Phone, Mail, MapPin, Shield } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO, NAV_LINKS, SERVICES_DATA } from '../data/siteContent';
import { ServiceItem } from '../types';
import { getAllSiteContent } from '../services/siteContentService';
import { getPublishedServices } from '../services/servicesService';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectService }) => {
  const currentYear = new Date().getFullYear();
  const [footerInfo, setFooterInfo] = useState({
    name: COMPANY_INFO.name,
    tagline: COMPANY_INFO.tagline,
    shortSummary: COMPANY_INFO.shortSummary,
  });
  const [verifiedContact, setVerifiedContact] = useState(COMPANY_INFO.verifiedContact);
  const [servicesList, setServicesList] = useState<ServiceItem[]>(SERVICES_DATA);

  useEffect(() => {
    let isMounted = true;
    async function fetchDynamicData() {
      try {
        const [contentRes, servicesRes] = await Promise.all([
          getAllSiteContent(),
          getPublishedServices(),
        ]);

        if (isMounted) {
          if (contentRes.data) {
            setFooterInfo({
              name: contentRes.data.footer.companyName || COMPANY_INFO.name,
              tagline: contentRes.data.footer.tagline || COMPANY_INFO.tagline,
              shortSummary: contentRes.data.footer.shortSummary || COMPANY_INFO.shortSummary,
            });
            setVerifiedContact(contentRes.data.contact_info);
          }
          if (servicesRes.data && servicesRes.data.length > 0) {
            setServicesList(servicesRes.data);
          }
        }
      } catch (err) {
        // Silently use defaults
      }
    }

    fetchDynamicData();
    return () => {
      isMounted = false;
    };
  }, []);

  const hasVerifiedContact = Boolean(
    verifiedContact.email || verifiedContact.phone || verifiedContact.address
  );

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#111827] pt-12 pb-8 border-t border-[#E5EAF2]">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#E5EAF2]">
          {/* Col 1: PT Innodesk Wordmark & Positioning Summary */}
          <div className="lg:col-span-4">
            <a
              href="#beranda"
              onClick={(e) => handleNavClick(e, 'beranda')}
              className="inline-block rounded-lg focus-visible:outline-2 focus-visible:outline-[#1769F5]"
            >
              <BrandLogo theme="light" />
            </a>
            <p className="text-xs sm:text-[13px] text-[#5F6B7A] leading-relaxed mt-3.5 max-w-sm">
              {footerInfo.shortSummary}
            </p>
          </div>

          {/* Col 2: Quick Links (Beranda, Tentang, Layanan, Cara Kerja, Solusi, Kontak) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3.5">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#5F6B7A]">
              {NAV_LINKS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="hover:text-[#1769F5] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solution / Service Category Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3.5">
              Area Solusi IoT
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#5F6B7A]">
              {servicesList.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="hover:text-[#1769F5] transition-colors text-left cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Consultation Action (or Verified Contact Details when supplied) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3.5">
              Diskusi & Konsultasi
            </h3>
            {hasVerifiedContact ? (
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#5F6B7A]">
                {verifiedContact.email && (
                  <li className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{verifiedContact.email}</span>
                  </li>
                )}
                {verifiedContact.phone && (
                  <li className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{verifiedContact.phone}</span>
                  </li>
                )}
                {verifiedContact.address && (
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{verifiedContact.address}</span>
                  </li>
                )}
              </ul>
            ) : (
              <div>
                <p className="text-xs text-[#5F6B7A] leading-relaxed mb-4">
                  Ingin mendiskusikan integrasi perangkat, sistem monitoring, atau konsep dashboard
                  IoT? Silakan gunakan formulir konsultasi pada halaman ini.
                </p>
                <a
                  href="#kontak"
                  onClick={(e) => handleNavClick(e, 'kontak')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#1769F5] hover:text-[#1256CE] bg-[#EAF2FF] hover:bg-[#DBEAFE] px-4 py-2.5 rounded-lg transition-colors"
                >
                  <span>Buka Formulir Konsultasi</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright, Admin Link & Back to Top Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6B7A]">
          <div className="flex flex-wrap items-center gap-3">
            <span>
              © {currentYear} {footerInfo.name}. Seluruh hak cipta dilindungi.
            </span>
            <span className="text-[#CBD5E1]">·</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-[#5F6B7A] hover:text-[#1769F5] transition-colors"
              title="Portal Administrator"
            >
              <Shield className="w-3.5 h-3.5 text-[#1769F5]" />
              <span>Portal Admin</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] hover:text-[#1769F5] px-3.5 py-2 rounded-lg border border-[#E5EAF2] hover:border-[#1769F5] transition-colors cursor-pointer min-h-[38px]"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#1769F5]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
