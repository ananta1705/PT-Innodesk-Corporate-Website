import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  getAllSolutionsAdmin,
  createSolution,
  updateSolution,
  deleteSolution,
} from '../../services/solutionsService';
import { DbSolution } from '../../lib/supabase';

export const AdminSolutionsPage: React.FC = () => {
  const [solutions, setSolutions] = useState<DbSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState<DbSolution | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Ilustrasi Konsep',
    concept_badge: 'Ilustrasi Konsep · IoT',
    thumb_type: 'monitoring' as 'monitoring' | 'dashboard' | 'integration',
    summary: '',
    description: '',
    architecture_highlights_text: '',
    tags_text: '',
    disclaimer:
      'Catatan: Kartu ini adalah ilustrasi konsep untuk menjelaskan contoh rancangan solusi, bukan proyek klien yang diklaim telah selesai.',
    is_illustrative: true,
    is_published: true,
    sort_order: 1,
  });

  const loadSolutions = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await getAllSolutionsAdmin();
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSolutions(res.data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memuat data solusi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSolutions();
  }, []);

  const openCreateModal = () => {
    setEditingSolution(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Ilustrasi Konsep',
      concept_badge: 'Ilustrasi Konsep · IoT',
      thumb_type: 'monitoring',
      summary: '',
      description: '',
      architecture_highlights_text: '',
      tags_text: 'Sensor, Status Perangkat, Monitoring',
      disclaimer:
        'Catatan: Kartu ini adalah ilustrasi konsep untuk menjelaskan contoh rancangan solusi, bukan proyek klien yang diklaim telah selesai.',
      is_illustrative: true,
      is_published: true,
      sort_order: solutions.length + 1,
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (sol: DbSolution) => {
    setEditingSolution(sol);
    setFormData({
      title: sol.title,
      slug: sol.slug,
      category: sol.category || 'Ilustrasi Konsep',
      concept_badge: sol.concept_badge || 'Ilustrasi Konsep · IoT',
      thumb_type: sol.thumb_type,
      summary: sol.summary,
      description: sol.description || '',
      architecture_highlights_text: Array.isArray(sol.architecture_highlights)
        ? sol.architecture_highlights.join('\n')
        : '',
      tags_text: Array.isArray(sol.tags) ? sol.tags.join(', ') : '',
      disclaimer:
        sol.disclaimer ||
        'Catatan: Kartu ini adalah ilustrasi konsep untuk menjelaskan contoh rancangan solusi, bukan proyek klien yang diklaim telah selesai.',
      is_illustrative: sol.is_illustrative,
      is_published: sol.is_published,
      sort_order: sol.sort_order,
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSlugify = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingSolution ? prev.slug : handleSlugify(val),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.title.trim()) {
      setErrorMessage('Judul solusi konsep wajib diisi.');
      return;
    }
    if (!formData.slug.trim()) {
      setErrorMessage('Slug URL wajib diisi.');
      return;
    }
    if (!formData.summary.trim()) {
      setErrorMessage('Ringkasan solusi konsep wajib diisi.');
      return;
    }

    const archHighlights = formData.architecture_highlights_text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const tagsArray = formData.tags_text
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      category: formData.category.trim() || 'Ilustrasi Konsep',
      concept_badge: formData.concept_badge.trim() || 'Ilustrasi Konsep · IoT',
      thumb_type: formData.thumb_type,
      summary: formData.summary.trim(),
      description: formData.description.trim() || formData.summary.trim(),
      architecture_highlights: archHighlights,
      tags: tagsArray,
      image_url: null,
      disclaimer:
        formData.disclaimer.trim() ||
        'Catatan: Kartu ini adalah ilustrasi konsep untuk menjelaskan contoh rancangan solusi, bukan proyek klien yang diklaim telah selesai.',
      is_illustrative: formData.is_illustrative,
      is_published: formData.is_published,
      sort_order: Number(formData.sort_order) || 0,
    };

    if (editingSolution) {
      const res = await updateSolution(editingSolution.id, payload);
      if (res.error) {
        setErrorMessage(res.error);
        return;
      }
      setSuccessMessage(`Solusi "${payload.title}" berhasil diperbarui.`);
    } else {
      const res = await createSolution(payload);
      if (res.error) {
        setErrorMessage(res.error);
        return;
      }
      setSuccessMessage(`Solusi "${payload.title}" berhasil ditambahkan.`);
    }

    setIsModalOpen(false);
    await loadSolutions();
  };

  const handleTogglePublish = async (sol: DbSolution) => {
    const res = await updateSolution(sol.id, { is_published: !sol.is_published });
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSolutions((prev) =>
        prev.map((s) => (s.id === sol.id ? { ...s, is_published: !sol.is_published } : s))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteSolution(id);
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Solusi konsep berhasil dihapus.');
      setDeleteConfirmId(null);
      await loadSolutions();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl p-6 border border-[#E5EAF2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Solusi & Portofolio Konsep
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B7A] mt-1">
            Kelola kartu eksplorasi solusi IoT. Seluruh item concept wajib dilabeli "Ilustrasi Konsep"
            sesuai PRD data integrity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadSolutions}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F6B7A] hover:text-[#111827] bg-[#F7F9FC] border border-[#E5EAF2] px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Segarkan</span>
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-[#1769F5] hover:bg-[#1256CE] px-4 py-2 rounded-lg shadow-sm shadow-[#1769F5]/30 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Solusi</span>
          </button>
        </div>
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

      {/* Solutions Table Card */}
      <div className="bg-white rounded-xl border border-[#E5EAF2] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-[#5F6B7A]">Memuat data solusi konsep...</div>
        ) : solutions.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#5F6B7A]">
            Belum ada solusi konsep. Klik "Tambah Solusi" untuk menambahkan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[#5F6B7A] font-semibold">
                  <th className="py-3 px-4 w-12 text-center">Urutan</th>
                  <th className="py-3 px-4">Judul & Kategori</th>
                  <th className="py-3 px-4">Tipe Visual & Tag</th>
                  <th className="py-3 px-4">Label Konsep</th>
                  <th className="py-3 px-4 w-28 text-center">Status</th>
                  <th className="py-3 px-4 w-32 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2]">
                {solutions.map((sol) => (
                  <tr key={sol.id} className="hover:bg-[#F7F9FC]/70 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-[#5F6B7A]">
                      {sol.sort_order}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#111827]">
                      <div>{sol.title}</div>
                      <div className="text-[10px] text-[#1769F5] font-normal mt-0.5">
                        {sol.category}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-semibold text-[#111827] capitalize mb-1">
                        SVG: {sol.thumb_type}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(sol.tags || []).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] bg-[#F7F9FC] border border-[#E5EAF2] text-[#5F6B7A] px-1.5 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {sol.is_illustrative ? (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-[#1769F5] text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-200">
                          <Sparkles className="w-3 h-3" />
                          <span>Ilustrasi Konsep</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Standar</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(sol)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                          sol.is_published
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Klik untuk mengubah status terbit"
                      >
                        {sol.is_published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Terbit</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Draf</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(sol)}
                          className="p-1.5 text-[#5F6B7A] hover:text-[#1769F5] hover:bg-[#EAF2FF] rounded-md transition-colors cursor-pointer"
                          title="Edit Solusi"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(sol.id)}
                          className="p-1.5 text-[#5F6B7A] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Hapus Solusi"
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-[#06112F]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#E5EAF2] shadow-2xl">
            <h3 className="text-base font-bold text-[#111827] mb-2">Konfirmasi Hapus Solusi</h3>
            <p className="text-xs text-[#5F6B7A] mb-5">
              Apakah Anda yakin ingin menghapus kartu solusi konsep ini? Tindakan ini tidak dapat
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#06112F]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 border border-[#E5EAF2] shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5EAF2] mb-5">
              <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                {editingSolution ? 'Edit Solusi & Konsep' : 'Tambah Solusi & Konsep Baru'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#5F6B7A] hover:text-[#111827] p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Judul Solusi / Konsep *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Contoh: Pemantauan Kondisi Perangkat"
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Slug URL (Unik) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: handleSlugify(e.target.value) })
                    }
                    placeholder="pemantauan-kondisi-perangkat"
                    className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-mono text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Tipe Ilustrasi Visual (Thumbnail SVG)
                  </label>
                  <select
                    value={formData.thumb_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        thumb_type: e.target.value as typeof formData.thumb_type,
                      })
                    }
                    className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                  >
                    <option value="monitoring">Pemantauan Sensor (Monitoring SVG)</option>
                    <option value="dashboard">Dashboard Operasional (Dashboard SVG)</option>
                    <option value="integration">Integrasi Pipeline (Integration SVG)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Kategori Tampilan
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ilustrasi Konsep"
                    className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Badge Konsep (Teks Header Modal)
                  </label>
                  <input
                    type="text"
                    value={formData.concept_badge}
                    onChange={(e) => setFormData({ ...formData, concept_badge: e.target.value })}
                    placeholder="Ilustrasi Konsep · Device Status"
                    className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Ringkasan Konsep (Tampil pada Kartu Solusi) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Ringkasan penjelasan contoh konsep solusi IoT."
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Penjelasan Lengkap (Tampil pada Modal Detail)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan arsitektural dan ilustrasi penerapan."
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Highlight Arsitektur (1 baris per poin)
                </label>
                <textarea
                  rows={3}
                  value={formData.architecture_highlights_text}
                  onChange={(e) =>
                    setFormData({ ...formData, architecture_highlights_text: e.target.value })
                  }
                  placeholder="Contoh:&#10;Indikator status koneksi perangkat dan pembacaan parameter&#10;Penanda visual ambang batas"
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Tag Kata Kunci (Dipisahkan koma)
                </label>
                <input
                  type="text"
                  value={formData.tags_text}
                  onChange={(e) => setFormData({ ...formData, tags_text: e.target.value })}
                  placeholder="Sensor, Status Perangkat, Monitoring"
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Catatan Transparansi / Disclaimer Konsep
                </label>
                <input
                  type="text"
                  value={formData.disclaimer}
                  onChange={(e) => setFormData({ ...formData, disclaimer: e.target.value })}
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs text-[#5F6B7A] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({ ...formData, sort_order: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                  />
                </div>

                <div className="flex flex-col justify-center space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_illustrative}
                      onChange={(e) =>
                        setFormData({ ...formData, is_illustrative: e.target.checked })
                      }
                      className="w-4 h-4 text-[#1769F5] rounded border-[#CBD5E1]"
                    />
                    <span className="text-xs font-semibold text-[#111827]">
                      Tandai Sebagai "Ilustrasi Konsep" (Wajib)
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) =>
                        setFormData({ ...formData, is_published: e.target.checked })
                      }
                      className="w-4 h-4 text-[#1769F5] rounded border-[#CBD5E1]"
                    />
                    <span className="text-xs font-semibold text-[#111827]">
                      Publikasikan di Website Utama
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5EAF2] mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E5EAF2] hover:bg-[#F7F9FC] rounded-lg text-xs font-semibold text-[#5F6B7A] transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1769F5] hover:bg-[#1256CE] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  {editingSolution ? 'Simpan Perubahan' : 'Buat Solusi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
