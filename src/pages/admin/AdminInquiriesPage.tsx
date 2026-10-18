import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Clock,
  CheckCircle2,
  Archive,
  RefreshCw,
  Mail,
  Building,
  Calendar,
  Trash2,
  AlertCircle,
  X,
  Check,
} from 'lucide-react';
import {
  getInquiriesAdmin,
  updateInquiryStatus,
  deleteInquiry,
} from '../../services/inquiriesService';
import { DbInquiry } from '../../lib/supabase';

export const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<DbInquiry[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<
    'ALL' | 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'
  >('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Detail preview modal
  const [viewingInquiry, setViewingInquiry] = useState<DbInquiry | null>(null);

  const loadInquiries = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await getInquiriesAdmin(selectedStatus);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setInquiries(res.data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memuat inquiry.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, [selectedStatus]);

  const handleStatusChange = async (
    id: string,
    newStatus: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'
  ) => {
    setErrorMessage(null);
    const res = await updateInquiryStatus(id, newStatus);
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage(`Status inquiry diubah menjadi ${newStatus}.`);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      if (viewingInquiry && viewingInquiry.id === id) {
        setViewingInquiry({ ...viewingInquiry, status: newStatus });
      }
    }
  };

  const handleDelete = async (id: string) => {
    setErrorMessage(null);
    const res = await deleteInquiry(id);
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Inquiry berhasil dihapus.');
      setDeleteConfirmId(null);
      if (viewingInquiry?.id === id) {
        setViewingInquiry(null);
      }
      await loadInquiries();
    }
  };

  const renderStatusBadge = (status: DbInquiry['status']) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>NEW</span>
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>IN PROGRESS</span>
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>COMPLETED</span>
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            <Archive className="w-3 h-3 text-slate-500" />
            <span>ARCHIVED</span>
          </span>
        );
    }
  };

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'NEW').length,
    inProgress: inquiries.filter((i) => i.status === 'IN_PROGRESS').length,
    completed: inquiries.filter((i) => i.status === 'COMPLETED').length,
    archived: inquiries.filter((i) => i.status === 'ARCHIVED').length,
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl p-6 border border-[#E5EAF2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Kotak Masuk Konsultasi IoT
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B7A] mt-1">
            Data inquiry dari calon klien publik. Protected by Supabase Row Level Security (RLS: Zero
            public read).
          </p>
        </div>

        <button
          type="button"
          onClick={loadInquiries}
          disabled={isLoading}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F6B7A] hover:text-[#111827] bg-[#F7F9FC] border border-[#E5EAF2] px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Segarkan Kotak Masuk</span>
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedStatus('ALL')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            selectedStatus === 'ALL'
              ? 'bg-[#1769F5] text-white shadow-xs'
              : 'bg-white border border-[#E5EAF2] text-[#5F6B7A] hover:text-[#111827]'
          }`}
        >
          Semua Status
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus('NEW')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            selectedStatus === 'NEW'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-[#E5EAF2] text-amber-700 hover:bg-amber-50'
          }`}
        >
          Baru Masuk (NEW)
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus('IN_PROGRESS')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            selectedStatus === 'IN_PROGRESS'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-[#E5EAF2] text-blue-700 hover:bg-blue-50'
          }`}
        >
          Diproses (IN PROGRESS)
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus('COMPLETED')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            selectedStatus === 'COMPLETED'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-[#E5EAF2] text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          Selesai (COMPLETED)
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus('ARCHIVED')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            selectedStatus === 'ARCHIVED'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-white border border-[#E5EAF2] text-slate-700 hover:bg-slate-50'
          }`}
        >
          Arsip (ARCHIVED)
        </button>
      </div>

      {/* Inquiries Table Card */}
      <div className="bg-white rounded-xl border border-[#E5EAF2] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-[#5F6B7A]">Memuat pesan masuk...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#5F6B7A]">
            Tidak ada pesan pada filter ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[#5F6B7A] font-semibold">
                  <th className="py-3 px-4">Pengirim</th>
                  <th className="py-3 px-4">Area Minat</th>
                  <th className="py-3 px-4">Pesan Kebutuhan</th>
                  <th className="py-3 px-4 w-32">Waktu Masuk</th>
                  <th className="py-3 px-4 w-32 text-center">Status</th>
                  <th className="py-3 px-4 w-28 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2]">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-[#F7F9FC]/70 transition-colors cursor-pointer"
                    onClick={() => setViewingInquiry(inq)}
                  >
                    <td className="py-3.5 px-4 font-bold text-[#111827]">
                      <div>{inq.name}</div>
                      {inq.company && (
                        <div className="text-[11px] font-normal text-[#5F6B7A] flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-[#94A3B8]" />
                          <span>{inq.company}</span>
                        </div>
                      )}
                      <div className="text-[11px] font-normal text-[#1769F5] flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-[#94A3B8]" />
                        <span>{inq.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#111827]">
                      <span className="bg-[#EAF2FF] text-[#1769F5] px-2 py-0.5 rounded text-[11px]">
                        {inq.service_interest}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#5F6B7A] max-w-xs truncate">
                      {inq.message}
                    </td>

                    <td className="py-3.5 px-4 text-[#94A3B8] whitespace-nowrap text-[11px]">
                      {new Date(inq.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td
                      className="py-3.5 px-4 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq.id, e.target.value as DbInquiry['status'])
                        }
                        className="bg-white border border-[#CBD5E1] rounded-lg px-2 py-1 text-[11px] font-semibold text-[#111827] focus:outline-none focus:border-[#1769F5] cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>

                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewingInquiry(inq)}
                          className="p-1.5 text-[#1769F5] hover:bg-[#EAF2FF] rounded-md transition-colors cursor-pointer text-xs font-semibold"
                          title="Lihat Rincian"
                        >
                          Detail
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(inq.id)}
                          className="p-1.5 text-[#5F6B7A] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Hapus Pesan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-50 bg-[#06112F]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-[#E5EAF2] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2] mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#111827]">Rincian Konsultasi Klien</h3>
                {renderStatusBadge(viewingInquiry.status)}
              </div>
              <button
                type="button"
                onClick={() => setViewingInquiry(null)}
                className="text-[#5F6B7A] hover:text-[#111827] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2]">
                <div>
                  <span className="text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider">
                    Nama Klien
                  </span>
                  <span className="font-bold text-[#111827] text-sm">{viewingInquiry.name}</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider">
                    Perusahaan / Instansi
                  </span>
                  <span className="font-semibold text-[#111827]">
                    {viewingInquiry.company || '-'}
                  </span>
                </div>
                <div>
                  <span className="text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider">
                    Email Kontak
                  </span>
                  <a
                    href={`mailto:${viewingInquiry.email}`}
                    className="font-semibold text-[#1769F5] hover:underline"
                  >
                    {viewingInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider">
                    Waktu Pengiriman
                  </span>
                  <span className="text-[#5F6B7A]">
                    {new Date(viewingInquiry.created_at).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Area Kebutuhan IoT
                </span>
                <span className="inline-block bg-[#EAF2FF] text-[#1769F5] px-3 py-1 rounded-md font-bold">
                  {viewingInquiry.service_interest}
                </span>
              </div>

              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider mb-1">
                  Pesan & Deskripsi Proyek
                </span>
                <div className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2] text-[#111827] leading-relaxed whitespace-pre-wrap">
                  {viewingInquiry.message}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5EAF2] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#5F6B7A]">Ubah Status:</span>
                  <select
                    value={viewingInquiry.status}
                    onChange={(e) =>
                      handleStatusChange(
                        viewingInquiry.id,
                        e.target.value as DbInquiry['status']
                      )
                    }
                    className="bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#1769F5]"
                  >
                    <option value="NEW">NEW</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <a
                  href={`mailto:${viewingInquiry.email}?subject=Tanggapan%20Konsultasi%20IoT%20-%20PT%20Innodesk`}
                  className="inline-flex items-center gap-1.5 bg-[#1769F5] hover:bg-[#1256CE] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim Email Balasan</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-[#06112F]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#E5EAF2] shadow-2xl">
            <h3 className="text-base font-bold text-[#111827] mb-2">Hapus Pesan Konsultasi</h3>
            <p className="text-xs text-[#5F6B7A] mb-5">
              Apakah Anda yakin ingin menghapus data inquiry ini? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-[#E5EAF2] rounded-lg text-xs font-semibold text-[#5F6B7A] hover:bg-[#F7F9FC] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
