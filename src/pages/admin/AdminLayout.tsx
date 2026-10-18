import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Cpu,
  Layers,
  FileEdit,
  Inbox,
  LogOut,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin, isLoading, error, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Ringkasan', path: '/admin', icon: LayoutDashboard },
    { label: 'Layanan IoT', path: '/admin/services', icon: Cpu },
    { label: 'Solusi & Konsep', path: '/admin/solutions', icon: Layers },
    { label: 'Konten Situs', path: '/admin/content', icon: FileEdit },
    { label: 'Inquiries Masuk', path: '/admin/inquiries', icon: Inbox },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-3 border-[#1769F5] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-[#111827]">Memverifikasi Otorisasi Admin...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 border border-[#E5EAF2] shadow-xl text-center">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#111827] mb-2">Akses Dibatasi</h2>
          <p className="text-xs sm:text-sm text-[#5F6B7A] mb-6">
            {error || 'Halaman ini hanya dapat diakses oleh administrator terverifikasi PT Innodesk.'}
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              to="/admin/login"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-[#1769F5] hover:bg-[#1256CE] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              Masuk Sebagai Admin
            </Link>
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 border border-[#E5EAF2] hover:bg-[#F7F9FC] text-[#5F6B7A] text-xs sm:text-sm font-medium rounded-lg transition-colors"
            >
              Kembali ke Beranda Publik
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans text-[#111827]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#06112F] text-white border-b border-white/10 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/admin" className="shrink-0 flex items-center gap-3">
              <BrandLogo theme="dark" />
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-[#1769F5]/30 text-[#3D8BFF] border border-[#1769F5]/40 px-2 py-0.5 rounded">
                Admin Panel
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white py-1.5 px-3 rounded-md hover:bg-white/10 transition-colors"
              title="Buka Website Publik"
            >
              <span className="hidden md:inline">Lihat Web Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/15 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#3D8BFF]" />
              <span className="truncate max-w-[150px]">{user?.email || 'Administrator'}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-300 hover:text-red-200 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        {/* Supabase status indicator bar if in demo mode */}
        {!isSupabaseConfigured() && (
          <div className="bg-amber-500/20 border-t border-amber-500/30 text-amber-200 px-4 py-1.5 text-center text-xs flex items-center justify-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              Mode Demo Lokal (Supabase belum terkonfigurasi di <code>.env.local</code>). Perubahan data bersifat simulasi sementara.
            </span>
          </div>
        )}
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar / Tabs */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="bg-white rounded-xl border border-[#E5EAF2] p-2 sm:p-3 shadow-xs space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#1769F5] text-white shadow-sm shadow-[#1769F5]/30'
                      : 'text-[#5F6B7A] hover:text-[#111827] hover:bg-[#F7F9FC]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#1769F5]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block mt-6 p-4 rounded-xl bg-white border border-[#E5EAF2] text-xs text-[#5F6B7A] space-y-2">
            <div className="font-semibold text-[#111827] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1769F5]" />
              <span>Otorisasi RLS</span>
            </div>
            <p className="leading-relaxed">
              Semua operasi data dilindungi oleh Supabase Row Level Security (RLS) dan fungsi verifikasi <code>is_admin()</code>.
            </p>
          </div>
        </aside>

        {/* Content Body */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};
