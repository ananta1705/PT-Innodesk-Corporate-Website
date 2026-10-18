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
  Cpu,
  Activity,
  Code2,
  GitMerge,
  Compass,
} from 'lucide-react';
import {
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} from '../../services/servicesService';
import { DbService } from '../../lib/supabase';

export const AdminServicesPage: React.FC = () => {
  const [services, setServices] = useState<DbService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    icon_key: 'iot' as 'iot' | 'monitoring' | 'software' | 'automation' | 'consulting',
    scope_points_text: '',
    deliverables_text: '',
    ideal_for: '',
    is_published: true,
    sort_order: 1,
  });

  const loadServices = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await getAllServicesAdmin();
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setServices(res.data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memuat daftar layanan.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      description: '',
      icon_key: 'iot',
      scope_points_text: '',
      deliverables_text: '',
      ideal_for: '',
      is_published: true,
      sort_order: services.length + 1,
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (srv: DbService) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      slug: srv.slug,
      short_description: srv.short_description,
      description: srv.description || '',
      icon_key: srv.icon_key,
      scope_points_text: Array.isArray(srv.scope_points) ? srv.scope_points.join('\n') : '',
      deliverables_text: Array.isArray(srv.deliverables) ? srv.deliverables.join('\n') : '',
      ideal_for: srv.ideal_for || '',
      is_published: srv.is_published,
      sort_order: srv.sort_order,
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
      // Auto-populate slug if creating new
      slug: editingService ? prev.slug : handleSlugify(val),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.title.trim()) {
      setErrorMessage('Judul layanan wajib diisi.');
      return;
    }
    if (!formData.slug.trim()) {
      setErrorMessage('Slug URL layanan wajib diisi.');
      return;
    }
    if (!formData.short_description.trim()) {
      setErrorMessage('Deskripsi singkat wajib diisi.');
      return;
    }

    const scopePointsArray = formData.scope_points_text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const deliverablesArray = formData.deliverables_text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      short_description: formData.short_description.trim(),
      description: formData.description.trim() || formData.short_description.trim(),
      icon_key: formData.icon_key,
      image_url: null,
      scope_points: scopePointsArray,
      deliverables: deliverablesArray,
      ideal_for: formData.ideal_for.trim() || null,
      is_published: formData.is_published,
      sort_order: Number(formData.sort_order) || 0,
    };

    if (editingService) {
      const res = await updateService(editingService.id, payload);
      if (res.error) {
        setErrorMessage(res.error);
        return;
      }
      setSuccessMessage(`Layanan "${payload.title}" berhasil diperbarui.`);
    } else {
      const res = await createService(payload);
      if (res.error) {
        setErrorMessage(res.error);
        return;
      }
      setSuccessMessage(`Layanan "${payload.title}" berhasil ditambahkan.`);
    }

    setIsModalOpen(false);
    await loadServices();
  };

  const handleTogglePublish = async (srv: DbService) => {
    const res = await updateService(srv.id, { is_published: !srv.is_published });
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setServices((prev) =>
        prev.map((s) => (s.id === srv.id ? { ...s, is_published: !srv.is_published } : s))
      );
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteService(id);
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Layanan berhasil dihapus.');
      setDeleteConfirmId(null);
      await loadServices();
    }
  };

  const renderIconBadge = (iconKey: DbService['icon_key']) => {
    switch (iconKey) {
      case 'iot':
        return <Cpu className="w-4 h-4 text-[#1769F5]" />;
      case 'monitoring':
        return <Activity className="w-4 h-4 text-[#1769F5]" />;
      case 'software':
        return <Code2 className="w-4 h-4 text-[#1769F5]" />;
      case 'automation':
        return <GitMerge className="w-4 h-4 text-[#1769F5]" />;
      case 'consulting':
        return <Compass className="w-4 h-4 text-[#1769F5]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#1769F5]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl p-6 border border-[#E5EAF2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
            Manajemen Layanan IoT
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6B7A] mt-1">
            Kelola data layanan yang ditampilkan pada landing page publik dan modal rincian teknis.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadServices}
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
            <span>Tambah Layanan</span>
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

      {/* Services Table Card */}
      <div className="bg-white rounded-xl border border-[#E5EAF2] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-[#5F6B7A]">Memuat daftar layanan...</div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#5F6B7A]">
            Belum ada layanan yang tersimpan. Klik "Tambah Layanan" untuk membuat baru.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7F9FC] border-b border-[#E5EAF2] text-[#5F6B7A] font-semibold">
                  <th className="py-3 px-4 w-12 text-center">Urutan</th>
                  <th className="py-3 px-4">Ikon</th>
                  <th className="py-3 px-4">Judul & Slug</th>
                  <th className="py-3 px-4">Deskripsi Ringkas</th>
                  <th className="py-3 px-4 w-28 text-center">Status</th>
                  <th className="py-3 px-4 w-32 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2]">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-[#F7F9FC]/70 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-[#5F6B7A]">
                      {srv.sort_order}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] flex items-center justify-center">
                        {renderIconBadge(srv.icon_key)}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#111827]">
                      <div>{srv.title}</div>
                      <div className="text-[10px] text-[#94A3B8] font-mono mt-0.5">/{srv.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5F6B7A] max-w-xs truncate">
                      {srv.short_description}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(srv)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                          srv.is_published
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Klik untuk mengubah status terbit"
                      >
                        {srv.is_published ? (
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
                          onClick={() => openEditModal(srv)}
                          className="p-1.5 text-[#5F6B7A] hover:text-[#1769F5] hover:bg-[#EAF2FF] rounded-md transition-colors cursor-pointer"
                          title="Edit Layanan"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(srv.id)}
                          className="p-1.5 text-[#5F6B7A] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Hapus Layanan"
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
            <h3 className="text-base font-bold text-[#111827] mb-2">Konfirmasi Hapus Layanan</h3>
            <p className="text-xs text-[#5F6B7A] mb-5">
              Apakah Anda yakin ingin menghapus layanan ini secara permanen? Tindakan ini tidak dapat
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
                {editingService ? 'Edit Layanan IoT' : 'Tambah Layanan IoT Baru'}
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
                  Judul Layanan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Contoh: IoT Device Integration"
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
                    placeholder="iot-device-integration"
                    className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-mono text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Tipe Ikon
                  </label>
                  <select
                    value={formData.icon_key}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        icon_key: e.target.value as typeof formData.icon_key,
                      })
                    }
                    className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                  >
                    <option value="iot">Perangkat (Cpu / IoT)</option>
                    <option value="monitoring">Pemantauan (Activity)</option>
                    <option value="software">Platform / Dashboard (Code2)</option>
                    <option value="automation">Integrasi & Otomasi (GitMerge)</option>
                    <option value="consulting">Konsultasi (Compass)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Deskripsi Ringkas (Tampil pada Kartu Layanan) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) =>
                    setFormData({ ...formData, short_description: e.target.value })
                  }
                  placeholder="Ringkasan 1-2 kalimat untuk kartu di beranda."
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
                  placeholder="Penjelasan mendalam tentang pendekatan solusi teknis."
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Ruang Lingkup Teknis (Scope Points - 1 baris per poin)
                </label>
                <textarea
                  rows={3}
                  value={formData.scope_points_text}
                  onChange={(e) =>
                    setFormData({ ...formData, scope_points_text: e.target.value })
                  }
                  placeholder="Contoh:&#10;Identifikasi kebutuhan sensor&#10;Perancangan topologi komunikasi node & gateway"
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Deliverables / Luaran (1 baris per poin)
                </label>
                <textarea
                  rows={2}
                  value={formData.deliverables_text}
                  onChange={(e) =>
                    setFormData({ ...formData, deliverables_text: e.target.value })
                  }
                  placeholder="Contoh:&#10;Rancangan Topologi Perangkat&#10;Dokumentasi Skema Integrasi"
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">
                  Ideal Untuk (Target Pengguna / Skenario)
                </label>
                <input
                  type="text"
                  value={formData.ideal_for}
                  onChange={(e) => setFormData({ ...formData, ideal_for: e.target.value })}
                  placeholder="Contoh: Organisasi yang ingin menghubungkan instrumen fisik ke sistem digital."
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#1769F5] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Urutan Tampil (Sort Order)
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

                <div className="flex items-center pt-5">
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
                  {editingService ? 'Simpan Perubahan' : 'Buat Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
