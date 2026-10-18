import { supabase, isSupabaseConfigured, DbAdminUser } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export interface AdminAuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  role?: 'admin' | 'superadmin';
}

export const signInAdmin = async (
  email: string,
  password: string
): Promise<{ session: Session | null; user: User | null; error?: string }> => {
  if (!isSupabaseConfigured()) {
    // Demo admin login for development when Supabase project is not yet linked
    if (email === 'admin@innodesk.id' && password === 'admin123') {
      const mockUser = {
        id: 'mock-admin-id',
        email: 'admin@innodesk.id',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User;

      return {
        session: {
          access_token: 'mock-token',
          token_type: 'bearer',
          expires_in: 3600,
          refresh_token: 'mock-refresh',
          user: mockUser,
        } as Session,
        user: mockUser,
      };
    }
    return {
      session: null,
      user: null,
      error:
        'Supabase belum terhubung. Gunakan email: admin@innodesk.id dan password: admin123 untuk mode preview demo.',
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { session: null, user: null, error: error.message };
  }

  return { session: data.session, user: data.user };
};

export const signOutAdmin = async (): Promise<{ error?: string }> => {
  if (!isSupabaseConfigured()) {
    return {};
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return {};
};

export const verifyAdminRole = async (userId: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    return userId === 'mock-admin-id';
  }

  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, role')
      .eq('id', userId)
      .maybeSingle();

    if (error || !data) {
      return false;
    }

    return data.role === 'admin' || data.role === 'superadmin';
  } catch (e) {
    return false;
  }
};

export const getCurrentSession = async () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  const { data } = await supabase.auth.getSession();
  return data.session;
};
