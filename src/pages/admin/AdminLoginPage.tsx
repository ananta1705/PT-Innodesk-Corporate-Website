import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { signInAdmin } from '../../services/authService';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Silakan masukkan email dan password administrator.');
      return;
    }

    setIsLoading(true);

    try {
      const { user, error } = await signInAdmin(email.trim(), password);

      if (error) {
        setErrorMessage(error);
        setIsLoading(false);
        return;
      }

      if (user) {
        if (!isSupabaseConfigured()) {
          localStorage.setItem('innodesk_demo_admin', 'true');
        }
        navigate('/admin');
      } else {
        setErrorMessage('Gagal masuk. Periksa kembali email dan password Anda.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat mencoba masuk.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@innodesk.id');
    setPassword('admin123');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06112F] via-[#081A42] to-[#0A2258] flex flex-col justify-center items-center p-4 sm:p-6 text-white relative">
      {/* Background radial dot grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(61, 139, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Website Utama</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white text-[#111827] rounded-2xl p-7 sm:p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <BrandLogo theme="light" />
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#EAF2FF] text-[#1769F5] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Administrator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              Masuk Dashboard
            </h1>
            <p className="text-xs text-[#5F6B7A] mt-1">
              Kelola layanan, solusi konsep, konten profil, dan konsultasi IoT.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-[#111827] mb-1.5"
              >
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5F6B7A] absolute left-3 top-3.5 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@innodesk.id"
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-[#111827] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1769F5] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-[#111827] mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5F6B7A] absolute left-3 top-3.5 pointer-events-none" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F7F9FC] border border-[#E5EAF2] rounded-lg pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-[#111827] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1769F5] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] disabled:bg-[#1769F5]/60 text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-lg shadow-md shadow-[#1769F5]/25 transition-all cursor-pointer min-h-[44px]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memeriksa Akses...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Offline/Demo quick helper */}
          {!isSupabaseConfigured() && (
            <div className="mt-5 pt-4 border-t border-[#E5EAF2] text-center">
              <p className="text-[11px] text-[#5F6B7A] mb-2">
                Supabase belum terkonfigurasi. Ingin mencoba UI admin dalam mode demo?
              </p>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs font-semibold text-[#1769F5] hover:underline cursor-pointer"
              >
                Gunakan Kredensial Demo (admin@innodesk.id)
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6">
          PT Innodesk — Protected by Supabase Row Level Security & RBAC
        </p>
      </div>
    </div>
  );
};
