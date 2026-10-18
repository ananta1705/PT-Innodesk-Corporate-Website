import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

/**
 * Checks if Supabase has been properly configured with valid non-placeholder values.
 */
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseKey) &&
    !supabaseUrl.includes('your-project') &&
    !supabaseKey.includes('your-publishable-key') &&
    supabaseUrl.startsWith('https://')
  );
};

// Use a safe fallback client to avoid runtime crashes during initial setup
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder-project.supabase.co',
  isSupabaseConfigured() ? supabaseKey : 'placeholder-anon-key'
);

export interface DbService {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string | null;
  icon_key: 'iot' | 'monitoring' | 'software' | 'automation' | 'consulting';
  image_url: string | null;
  scope_points: string[];
  deliverables: string[];
  ideal_for: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbSolution {
  id: string;
  title: string;
  slug: string;
  category: string;
  concept_badge: string | null;
  thumb_type: 'monitoring' | 'dashboard' | 'integration';
  summary: string;
  description: string | null;
  architecture_highlights: string[];
  tags: string[];
  image_url: string | null;
  disclaimer: string;
  is_illustrative: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbSiteContent {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}

export interface DbInquiry {
  id: string;
  name: string;
  company: string | null;
  email: string;
  service_interest: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  created_at: string;
  updated_at: string;
}

export interface DbAdminUser {
  id: string;
  email: string;
  role: 'admin' | 'superadmin';
  created_at: string;
}
