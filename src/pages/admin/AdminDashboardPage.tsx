import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Layers,
  Inbox,
  FileEdit,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { getAllServicesAdmin } from '../../services/servicesService';
import { getAllSolutionsAdmin } from '../../services/solutionsService';
import { getInquiriesAdmin } from '../../services/inquiriesService';
import { DbInquiry } from '../../lib/supabase';

export const AdminDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState({
    servicesTotal: 0,
    servicesPublished: 0,
    solutionsTotal: 0,
    solutionsPublished: 0,
    inquiriesNew: 0,
    inquiriesTotal: 0,
    inquiriesInProgress: 0,
  });

  const [recentInquiries, setRecentInquiries] = useState<DbInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const [servicesRes, solutionsRes, inquiriesRes] = await Promise.all([
        getAllServicesAdmin(),
        getAllSolutionsAdmin(),
        getInquiriesAdmin('ALL'),
      ]);

      const sData = servicesRes.data || [];
      const solData = solutionsRes.data || [];
      const inqData = inquiriesRes.data || [];

      setMetrics({
        servicesTotal: sData.length,
        servicesPublished: sData.filter((s) => s.is_published).length,
        solutionsTotal: solData.length,
        solutionsPublished: solData.filter((s) => s.is_published).length,
        inquiriesNew: inqData.filter((i) => i.status === 'NEW').length,
        inquiriesInProgress: inqData.filter((i) => i.status === 'IN_PROGRESS').length,
        inquiriesTotal: inqData.length,
      });

      setRecentInquiries(inqData.slice(0, 5));
    } catch (err: any) {
      setFetchError(err.message || 'Gagal mengambil data dari database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-6 border border-[#E5EAF2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Dashboard Administrator
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B7A] mt-1">
            Pantau metrik langsung, kelola penawaran IoT, dan respons pertanyaan konsultasi klien.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={isLoading}
          className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-semibold text-[#1769F5] hover:text-[#1256CE] bg-[#EAF2FF] hover:bg-[#DBEAFE] px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Muat Ulang</span>
        </button>
      </div>

      {fetchError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>{fetchError}</div>
        </div>
      )}

      {/* Real Database Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Layanan IoT */}
        <div className="bg-white rounded-xl p-5 border border-[#E5EAF2] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5F6B7A]">Layanan IoT</span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769F5] flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#111827]">
            {isLoading ? '...' : metrics.servicesPublished}
            <span className="text-xs font-normal text-[#5F6B7A] ml-1.5">
              / {metrics.servicesTotal} aktif
            </span>
          </div>
          <Link
            to="/admin/services"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1769F5] hover:underline mt-3"
          >
            <span>Kelola Layanan</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Metric 2: Solusi & Konsep */}
        <div className="bg-white rounded-xl p-5 border border-[#E5EAF2] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5F6B7A]">Solusi & Konsep</span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1769F5] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#111827]">
            {isLoading ? '...' : metrics.solutionsPublished}
            <span className="text-xs font-normal text-[#5F6B7A] ml-1.5">
              / {metrics.solutionsTotal} terbit
            </span>
          </div>
          <Link
            to="/admin/solutions"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1769F5] hover:underline mt-3"
          >
            <span>Kelola Solusi</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Metric 3: Inquiries Baru */}
        <div className="bg-white rounded-xl p-5 border border-[#E5EAF2] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5F6B7A]">Inquiries Baru</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600">
            {isLoading ? '...' : metrics.inquiriesNew}
            <span className="text-xs font-normal text-[#5F6B7A] ml-1.5">perlu tindak lanjut</span>
          </div>
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1769F5] hover:underline mt-3"
          >
            <span>Buka Inbox Masuk</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Metric 4: Total Konsultasi */}
        <div className="bg-white rounded-xl p-5 border border-[#E5EAF2] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5F6B7A]">Total Diskusi</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#111827]">
            {isLoading ? '...' : metrics.inquiriesTotal}
            <span className="text-xs font-normal text-[#5F6B7A] ml-1.5">
              ({metrics.inquiriesInProgress} diproses)
            </span>
          </div>
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1769F5] hover:underline mt-3"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/services"
          className="p-5 rounded-xl bg-white border border-[#E5EAF2] hover:border-[#1769F5] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#EAF2FF] text-[#1769F5] flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#1769F5] transition-colors">
              Tambah & Edit Layanan
            </h3>
            <p className="text-xs text-[#5F6B7A] mt-1.5 leading-relaxed">
              Atur daftar layanan IoT, ruang lingkup teknis (scope points), deliverables, dan status terbit.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1769F5] mt-4">
            <span>Buka Modul Layanan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          to="/admin/solutions"
          className="p-5 rounded-xl bg-white border border-[#E5EAF2] hover:border-[#1769F5] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#EAF2FF] text-[#1769F5] flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#1769F5] transition-colors">
              Solusi & Portofolio Konsep
            </h3>
            <p className="text-xs text-[#5F6B7A] mt-1.5 leading-relaxed">
              Kelola kartu ilustrasi konsep IoT, label "Ilustrasi Konsep", tag kategori, dan highlight arsitektur.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1769F5] mt-4">
            <span>Buka Modul Solusi</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          to="/admin/content"
          className="p-5 rounded-xl bg-white border border-[#E5EAF2] hover:border-[#1769F5] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#EAF2FF] text-[#1769F5] flex items-center justify-center mb-3">
              <FileEdit className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#1769F5] transition-colors">
              Edit Konten Profil Website
            </h3>
            <p className="text-xs text-[#5F6B7A] mt-1.5 leading-relaxed">
              Perbarui judul Hero, ringkasan Tentang Perusahaan, prinsip kerja, kontak resmi, dan catatan footer.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1769F5] mt-4">
            <span>Edit Konten Profil</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-xl border border-[#E5EAF2] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E5EAF2] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#111827]">Inquiry Konsultasi Terbaru</h2>
            <p className="text-xs text-[#5F6B7A] mt-0.5">
              Pesan dan diskusi kebutuhan IoT yang masuk dari calon klien publik.
            </p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-semibold text-[#1769F5] hover:underline"
          >
            Lihat Semua Inbox
          </Link>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-xs text-[#5F6B7A]">Memuat data inquiry...</div>
        ) : recentInquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#5F6B7A]">
            Belum ada inquiry yang masuk.
          </div>
        ) : (
          <div className="divide-y divide-[#E5EAF2]">
            {recentInquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F9FC] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#111827]">{inq.name}</span>
                    {inq.company && (
                      <span className="text-[11px] text-[#5F6B7A]">· {inq.company}</span>
                    )}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        inq.status === 'NEW'
                          ? 'bg-amber-100 text-amber-800'
                          : inq.status === 'IN_PROGRESS'
                          ? 'bg-blue-100 text-blue-800'
                          : inq.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#5F6B7A] mb-1">
                    <span className="font-medium text-[#1769F5]">{inq.service_interest}</span>
                    <span className="mx-2">|</span>
                    <span>{inq.email}</span>
                  </div>
                  <p className="text-xs text-[#334155] line-clamp-1 italic">"{inq.message}"</p>
                </div>

                <div className="text-[11px] text-[#94A3B8] shrink-0 sm:text-right">
                  {new Date(inq.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
