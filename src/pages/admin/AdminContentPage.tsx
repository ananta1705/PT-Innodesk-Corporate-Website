import React, { useState, useEffect } from 'react';
import {
  FileEdit,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Building,
  Phone,
  Mail,
  MapPin,
  Save,
} from 'lucide-react';
import {
  getAllSiteContent,
  updateSiteContent,
  DEFAULT_SITE_CONTENT,
} from '../../services/siteContentService';

export const AdminContentPage: React.FC = () => {
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'footer' | 'contact'>('hero');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states for each validated section
  const [heroForm, setHeroForm] = useState(DEFAULT_SITE_CONTENT.hero);
  const [aboutForm, setAboutForm] = useState({
    ...DEFAULT_SITE_CONTENT.about,
    principlesText: DEFAULT_SITE_CONTENT.about.principles.join('\n'),
  });
  const [footerForm, setFooterForm] = useState(DEFAULT_SITE_CONTENT.footer);
  const [contactForm, setContactForm] = useState(DEFAULT_SITE_CONTENT.contact_info);

  const loadContent = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await getAllSiteContent();
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setContent(res.data);
        setHeroForm(res.data.hero);
        setAboutForm({
          ...res.data.about,
          principlesText: res.data.about.principles.join('\n'),
        });
        setFooterForm(res.data.footer);
        setContactForm(res.data.contact_info);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memuat konten situs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await updateSiteContent('hero', heroForm);
    setIsSaving(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Bagian Hero berhasil disimpan.');
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const principlesArray = aboutForm.principlesText
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      eyebrow: aboutForm.eyebrow,
      headingPrefix: aboutForm.headingPrefix,
      headingHighlight: aboutForm.headingHighlight,
      overview: aboutForm.overview,
      secondaryText: aboutForm.secondaryText,
      principles: principlesArray,
      ctaLabel: aboutForm.ctaLabel,
    };

    const res = await updateSiteContent('about', payload);
    setIsSaving(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Bagian Tentang Perusahaan berhasil disimpan.');
    }
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await updateSiteContent('footer', footerForm);
    setIsSaving(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Bagian Footer berhasil disimpan.');
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload = {
      email: contactForm.email?.trim() || null,
      phone: contactForm.phone?.trim() || null,
      address: contactForm.address?.trim() || null,
      whatsappUrl: contactForm.whatsappUrl?.trim() || null,
    };

    const res = await updateSiteContent('contact_info', payload);
    setIsSaving(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Informasi Kontak Terverifikasi berhasil disimpan.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl p-6 border border-[#E5EAF2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Manajemen Konten Situs
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B7A] mt-1">
            Edit teks resmi beranda, deskripsi perusahaan, prinsip pendekatan, dan koordinat kontak.
          </p>
        </div>

        <button
          type="button"
          onClick={loadContent}
          disabled={isLoading}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F6B7A] hover:text-[#111827] bg-[#F7F9FC] border border-[#E5EAF2] px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Muat Ulang Konten</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-700 hover:text-red-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5EAF2] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'hero'
              ? 'bg-[#1769F5] text-white shadow-xs'
              : 'text-[#5F6B7A] hover:text-[#111827] hover:bg-white'
          }`}
        >
          1. Hero Section
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'about'
              ? 'bg-[#1769F5] text-white shadow-xs'
              : 'text-[#5F6B7A] hover:text-[#111827] hover:bg-white'
          }`}
        >
          2. Tentang Perusahaan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'footer'
              ? 'bg-[#1769F5] text-white shadow-xs'
              : 'text-[#5F6B7A] hover:text-[#111827] hover:bg-white'
          }`}
        >
          3. Footer & Ringkasan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-[#1769F5] text-white shadow-xs'
              : 'text-[#5F6B7A] hover:text-[#111827] hover:bg-white'
          }`}
        >
          4. Kontak Terverifikasi
        </button>
      </div>

      {/* Tab 1: Hero */}
      {activeTab === 'hero' && (
        <form
          onSubmit={handleSaveHero}
          className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5EAF2] shadow-xs space-y-4"
        >
          <div className="mb-2">
            <h2 className="text-sm font-bold text-[#111827]">Pengaturan Konten Hero</h2>
            <p className="text-xs text-[#5F6B7A]">
              Teks yang tampil di banner utama beranda PT Innodesk.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Eyebrow (Label Kecil Atas)
            </label>
            <input
              type="text"
              required
              value={heroForm.eyebrow}
              onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Headline Baris 1
              </label>
              <input
                type="text"
                required
                value={heroForm.headlineLine1}
                onChange={(e) => setHeroForm({ ...heroForm, headlineLine1: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Headline Highlight (Warna Biru)
              </label>
              <input
                type="text"
                required
                value={heroForm.headlineHighlight}
                onChange={(e) => setHeroForm({ ...heroForm, headlineHighlight: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Deskripsi Singkat Hero
            </label>
            <textarea
              rows={3}
              required
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Label Tombol Utama (CTA 1)
              </label>
              <input
                type="text"
                value={heroForm.primaryCta}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCta: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Label Tombol Sekunder (CTA 2)
              </label>
              <input
                type="text"
                value={heroForm.secondaryCta}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCta: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5EAF2] flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] disabled:bg-[#1769F5]/60 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Konten Hero'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: About */}
      {activeTab === 'about' && (
        <form
          onSubmit={handleSaveAbout}
          className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5EAF2] shadow-xs space-y-4"
        >
          <div className="mb-2">
            <h2 className="text-sm font-bold text-[#111827]">
              Pengaturan Bagian Tentang PT Innodesk
            </h2>
            <p className="text-xs text-[#5F6B7A]">
              Pernyataan posisi perusahaan dan 4 prinsip pendekatan kerja.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Eyebrow</label>
            <input
              type="text"
              required
              value={aboutForm.eyebrow}
              onChange={(e) => setAboutForm({ ...aboutForm, eyebrow: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Heading Awalan
              </label>
              <input
                type="text"
                required
                value={aboutForm.headingPrefix}
                onChange={(e) => setAboutForm({ ...aboutForm, headingPrefix: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Heading Highlight (Warna Biru)
              </label>
              <input
                type="text"
                required
                value={aboutForm.headingHighlight}
                onChange={(e) => setAboutForm({ ...aboutForm, headingHighlight: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Paragraf 1 (Gambaran Umum)
            </label>
            <textarea
              rows={3}
              required
              value={aboutForm.overview}
              onChange={(e) => setAboutForm({ ...aboutForm, overview: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Paragraf 2 (Karakteristik & Pendekatan)
            </label>
            <textarea
              rows={3}
              value={aboutForm.secondaryText}
              onChange={(e) => setAboutForm({ ...aboutForm, secondaryText: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              4 Prinsip Solusi (1 baris per prinsip)
            </label>
            <textarea
              rows={4}
              value={aboutForm.principlesText}
              onChange={(e) => setAboutForm({ ...aboutForm, principlesText: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white font-mono"
            />
          </div>

          <div className="pt-4 border-t border-[#E5EAF2] flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] disabled:bg-[#1769F5]/60 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Konten Tentang'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Footer */}
      {activeTab === 'footer' && (
        <form
          onSubmit={handleSaveFooter}
          className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5EAF2] shadow-xs space-y-4"
        >
          <div className="mb-2">
            <h2 className="text-sm font-bold text-[#111827]">Pengaturan Ringkasan Footer</h2>
            <p className="text-xs text-[#5F6B7A]">
              Teks identitas dan positioning yang tertera di bagian paling bawah halaman.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">
                Nama Perusahaan
              </label>
              <input
                type="text"
                required
                value={footerForm.companyName}
                onChange={(e) => setFooterForm({ ...footerForm, companyName: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">Tagline</label>
              <input
                type="text"
                value={footerForm.tagline}
                onChange={(e) => setFooterForm({ ...footerForm, tagline: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Ringkasan Perusahaan (Footer Summary)
            </label>
            <textarea
              rows={3}
              value={footerForm.shortSummary}
              onChange={(e) => setFooterForm({ ...footerForm, shortSummary: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-[#E5EAF2] flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] disabled:bg-[#1769F5]/60 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Konten Footer'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Contact Coordinates */}
      {activeTab === 'contact' && (
        <form
          onSubmit={handleSaveContact}
          className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5EAF2] shadow-xs space-y-4"
        >
          <div className="mb-2">
            <h2 className="text-sm font-bold text-[#111827]">Kontak Resmi Terverifikasi</h2>
            <p className="text-xs text-[#5F6B7A]">
              Sesuai PRD Data Integrity: Kosongkan field jika data kontak belum diverifikasi oleh
              manajemen. Footer akan menampilkan tombol konsultasi default apabila kontak kosong.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Email Resmi Kontak (Opsional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5F6B7A] absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                value={contactForm.email || ''}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="info@innodesk.id (kosongkan bila belum ada)"
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Nomor Telepon / WhatsApp (Opsional)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#5F6B7A] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={contactForm.phone || ''}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                placeholder="+62 21 xxxx xxxx (kosongkan bila belum ada)"
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">
              Alamat Kantor (Opsional)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#5F6B7A] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={contactForm.address || ''}
                onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                placeholder="Jakarta, Indonesia (kosongkan bila belum ada)"
                className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5EAF2] flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] disabled:bg-[#1769F5]/60 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Koordinat Kontak'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
