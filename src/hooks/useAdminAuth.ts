import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { verifyAdminRole, signOutAdmin } from '../services/authService';
import { User, Session } from '@supabase/supabase-js';

export interface AdminAuthState {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    session: null,
    user: null,
    isAdmin: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    // Check existing demo or local storage state if Supabase not configured
    if (!isSupabaseConfigured()) {
      const demoAuth = localStorage.getItem('innodesk_demo_admin');
      if (demoAuth === 'true') {
        const mockUser = {
          id: 'mock-admin-id',
          email: 'admin@innodesk.id',
        } as User;
        setState({
          session: null,
          user: mockUser,
          isAdmin: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          session: null,
          user: null,
          isAdmin: false,
          isLoading: false,
          error: null,
        });
      }
      return;
    }

    // Live Supabase Auth
    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (session?.user) {
          const isAdmin = await verifyAdminRole(session.user.id);
          setState({
            session,
            user: session.user,
            isAdmin,
            isLoading: false,
            error: isAdmin ? null : 'Akun Anda tidak memiliki hak akses administrator (public.admin_users).',
          });
        } else {
          setState({
            session: null,
            user: null,
            isAdmin: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (err: any) {
        if (!isMounted) return;
        setState({
          session: null,
          user: null,
          isAdmin: false,
          isLoading: false,
          error: err.message || 'Gagal memuat sesi autentikasi',
        });
      }
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;
        if (session?.user) {
          const isAdmin = await verifyAdminRole(session.user.id);
          setState({
            session,
            user: session.user,
            isAdmin,
            isLoading: false,
            error: isAdmin ? null : 'Akun ini belum didaftarkan pada tabel admin_users.',
          });
        } else {
          setState({
            session: null,
            user: null,
            isAdmin: false,
            isLoading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    localStorage.removeItem('innodesk_demo_admin');
    await signOutAdmin();
    setState({
      session: null,
      user: null,
      isAdmin: false,
      isLoading: false,
      error: null,
    });
  };

  return {
    ...state,
    logout,
  };
}
