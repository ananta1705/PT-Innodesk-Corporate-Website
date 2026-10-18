import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  LayoutDashboard,
} from 'lucide-react';
import { CONTACT_SECTION_CONTENT, SERVICES_DATA } from '../data/siteContent';

interface ContactSectionProps {
  preselectedService: string;
  onNavigate: (sectionId: string) => void;
}

interface FormState {
  name: string;
  company: string;
  email: string;
  area: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  area?: string;
  description?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  onNavigate,
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    area: preselectedService || '',
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, area: preselectedService }));
    }
  }, [preselectedService]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Masukkan format alamat email yang valid.';
    }

    if (!formData.area) {
      newErrors.area = 'Pilih salah satu area kebutuhan.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi kebutuhan wajib diisi.';
    } else if (formData.description.trim().length < 12) {
      newErrors.description = 'Mohon jelaskan kebutuhan minimal 12 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      area: '',
      description: '',
    });
    setErrors({});
    setSubmittedSuccess(false);
    nameInputRef.current?.focus();
  };

  const focusInquiryForm = () => {
    const formContainer = document.getElementById('formulir-diskusi');
    if (formContainer) {
      const headerOffset = 80;
      const top =
        formContainer.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 300);
    }
  };

  return (
    <div id="kontak">
      {/* 4.9 CONTACT CTA STRIP */}
      <section
        aria-label="Ajakan Diskusi Kebutuhan IoT"
        className="bg-gradient-to-r from-[#06112F] via-[#081A42] to-[#06112F] text-white py-9 border-y border-white/10"
      >
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Side: Paper-plane / Connected-node Icon & Heading */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#1769F5]/20 border border-[#3D8BFF]/40 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-[#3D8BFF] -rotate-12" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                  {CONTACT_SECTION_CONTENT.ctaStrip.heading}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {CONTACT_SECTION_CONTENT.ctaStrip.subtext}
                </p>
              </div>
            </div>

            {/* Right Side: CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={focusInquiryForm}
                className="inline-flex items-center justify-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] text-white text-xs sm:text-[13px] font-semibold px-5 py-3 rounded-lg shadow-md shadow-[#1769F5]/30 transition-colors min-h-[44px] cursor-pointer"
              >
                <span>{CONTACT_SECTION_CONTENT.ctaStrip.primaryButton}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <a
                href="#cara-kerja"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('cara-kerja');
                }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/25 hover:border-[#3D8BFF] text-white text-xs sm:text-[13px] font-semibold px-5 py-3 rounded-lg transition-colors min-h-[44px]"
              >
                <span>{CONTACT_SECTION_CONTENT.ctaStrip.secondaryButton}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4.10 CONTACT INQUIRY FORM */}
      <section id="formulir-diskusi" className="py-16 lg:py-22 bg-white">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Consultation Context & Discussion Topics */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-[#1769F5] text-xs font-bold uppercase tracking-[0.15em] mb-2">
                <span>{CONTACT_SECTION_CONTENT.formSection.eyebrow}</span>
                <span className="w-8 h-[1.5px] bg-[#1769F5]/45" aria-hidden="true" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111827] leading-[1.2] tracking-tight mb-4">
                {CONTACT_SECTION_CONTENT.formSection.headingPrefix}
                <span className="text-[#1769F5]">
                  {CONTACT_SECTION_CONTENT.formSection.headingHighlight}
                </span>
              </h2>

              <p className="text-sm sm:text-[15px] text-[#5F6B7A] leading-relaxed mb-8">
                {CONTACT_SECTION_CONTENT.formSection.intro}
              </p>

              {/* Topic Preparation Guide Card */}
              <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#E5EAF2] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Topik yang Dapat Didiskusikan
                </h3>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5F6B7A]">
                  <Cpu className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-bold text-[#111827]">
                      Konektivitas Perangkat & Sensor
                    </span>
                    <span className="text-xs">
                      Jenis perangkat atau parameter fisik yang ingin dihubungkan dan dipantau.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5F6B7A]">
                  <LayoutDashboard
                    className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block text-xs font-bold text-[#111827]">
                      Kebutuhan Visualisasi & Monitoring
                    </span>
                    <span className="text-xs">
                      Informasi utama yang perlu ditampilkan bagi tim operasional atau manajemen.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5F6B7A]">
                  <Layers className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-bold text-[#111827]">
                      Integrasi Sistem & Prototyping
                    </span>
                    <span className="text-xs">
                      Penyelarasan data dengan sistem yang sudah ada atau penyusunan konsep awal.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Validated Frontend-Only Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#F7F9FC] rounded-2xl p-6 sm:p-8 border border-[#E5EAF2] shadow-[0_4px_20px_rgba(17,24,39,0.04)]">
                {/* Accessible Demo Submission Notice */}
                <div aria-live="polite">
                  {submittedSuccess && (
                    <div
                      role="status"
                      className="mb-6 p-4 rounded-xl bg-[#EAF2FF] border border-[#1769F5]/30 text-[#111827] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-5 h-5 text-[#1769F5] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#06112F]">
                            {CONTACT_SECTION_CONTENT.formSection.demoNotice}
                          </p>
                          <p className="text-xs text-[#5F6B7A] mt-1">
                            Rincian dari <strong>{formData.name}</strong> untuk area{' '}
                            <strong>{formData.area}</strong> telah diverifikasi di browser.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="self-start sm:self-center text-xs font-semibold text-[#1769F5] hover:underline whitespace-nowrap cursor-pointer"
                      >
                        Reset Formulir
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nama lengkap (required) */}
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-bold text-[#111827] mb-1.5"
                      >
                        Nama lengkap <span className="text-[#1769F5]">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="inquiry-name"
                        type="text"
                        required
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'error-inquiry-name' : undefined}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="Masukkan nama lengkap Anda"
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-[#111827] placeholder:text-[#5F6B7A]/60 transition-colors min-h-[44px] ${
                          errors.name
                            ? 'border-red-600 focus:outline-red-600'
                            : 'border-[#E5EAF2] focus:border-[#1769F5]'
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="error-inquiry-name"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Nama perusahaan (optional) */}
                    <div>
                      <label
                        htmlFor="inquiry-company"
                        className="block text-xs font-bold text-[#111827] mb-1.5"
                      >
                        Nama perusahaan{' '}
                        <span className="text-[#5F6B7A] font-normal">(Opsional)</span>
                      </label>
                      <input
                        id="inquiry-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nama perusahaan atau organisasi"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E5EAF2] focus:border-[#1769F5] rounded-lg text-[#111827] placeholder:text-[#5F6B7A]/60 transition-colors min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email (required) */}
                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-xs font-bold text-[#111827] mb-1.5"
                      >
                        Email <span className="text-[#1769F5]">*</span>
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        required
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-inquiry-email' : undefined}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="nama@perusahaan.com"
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-[#111827] placeholder:text-[#5F6B7A]/60 transition-colors min-h-[44px] ${
                          errors.email
                            ? 'border-red-600 focus:outline-red-600'
                            : 'border-[#E5EAF2] focus:border-[#1769F5]'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="error-inquiry-email"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Area kebutuhan (required select) */}
                    <div>
                      <label
                        htmlFor="inquiry-area"
                        className="block text-xs font-bold text-[#111827] mb-1.5"
                      >
                        Area kebutuhan <span className="text-[#1769F5]">*</span>
                      </label>
                      <select
                        id="inquiry-area"
                        required
                        aria-invalid={Boolean(errors.area)}
                        aria-describedby={errors.area ? 'error-inquiry-area' : undefined}
                        value={formData.area}
                        onChange={(e) => {
                          setFormData({ ...formData, area: e.target.value });
                          if (errors.area) setErrors({ ...errors, area: undefined });
                        }}
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-[#111827] transition-colors min-h-[44px] ${
                          errors.area
                            ? 'border-red-600 focus:outline-red-600'
                            : 'border-[#E5EAF2] focus:border-[#1769F5]'
                        }`}
                      >
                        <option value="">Pilih area kebutuhan IoT...</option>
                        {SERVICES_DATA.map((svc) => (
                          <option key={svc.id} value={svc.title}>
                            {svc.title}
                          </option>
                        ))}
                      </select>
                      {errors.area && (
                        <p
                          id="error-inquiry-area"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.area}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Deskripsi kebutuhan (required textarea) */}
                  <div>
                    <label
                      htmlFor="inquiry-description"
                      className="block text-xs font-bold text-[#111827] mb-1.5"
                    >
                      Deskripsi kebutuhan <span className="text-[#1769F5]">*</span>
                    </label>
                    <textarea
                      id="inquiry-description"
                      rows={4}
                      required
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={
                        errors.description ? 'error-inquiry-description' : undefined
                      }
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        if (errors.description) setErrors({ ...errors, description: undefined });
                      }}
                      placeholder="Jelaskan perangkat, sistem, atau konsep solusi IoT yang ingin Anda diskusikan..."
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg text-[#111827] placeholder:text-[#5F6B7A]/60 transition-colors ${
                        errors.description
                          ? 'border-red-600 focus:outline-red-600'
                          : 'border-[#E5EAF2] focus:border-[#1769F5]'
                      }`}
                    />
                    {errors.description && (
                      <p
                        id="error-inquiry-description"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.description}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-[#5F6B7A]">
                      Mode demo frontend: tidak ada data yang dikirim ke server eksternal.
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] disabled:bg-[#5F6B7A] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-md shadow-[#1769F5]/20 transition-colors min-h-[44px] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Memvalidasi...</span>
                        </>
                      ) : (
                        <>
                          <span>Diskusikan Kebutuhan</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
