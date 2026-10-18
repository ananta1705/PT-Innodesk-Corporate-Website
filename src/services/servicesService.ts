import { supabase, isSupabaseConfigured, DbService } from '../lib/supabase';
import { SERVICES_DATA } from '../data/siteContent';
import { ServiceItem } from '../types';

// Helper to convert DbService to frontend ServiceItem
export const mapDbServiceToItem = (db: DbService): ServiceItem => {
  return {
    id: db.slug || db.id,
    title: db.title,
    shortDescription: db.short_description,
    fullDescription: db.description || db.short_description,
    icon: (db.icon_key as ServiceItem['icon']) || 'iot',
    scopePoints: Array.isArray(db.scope_points) ? db.scope_points : [],
    deliverables: Array.isArray(db.deliverables) ? db.deliverables : [],
    idealFor: db.ideal_for || '',
  };
};

export const getPublishedServices = async (): Promise<{
  data: ServiceItem[];
  fromFallback: boolean;
  error?: string;
}> => {
  if (!isSupabaseConfigured()) {
    return { data: SERVICES_DATA, fromFallback: true };
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Error fetching services from Supabase:', error.message);
      return { data: SERVICES_DATA, fromFallback: true, error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: [], fromFallback: false };
    }

    return {
      data: (data as DbService[]).map(mapDbServiceToItem),
      fromFallback: false,
    };
  } catch (err: any) {
    console.error('Fetch error:', err);
    return { data: SERVICES_DATA, fromFallback: true, error: err.message };
  }
};

export const getAllServicesAdmin = async (): Promise<{
  data: DbService[];
  error?: string;
}> => {
  if (!isSupabaseConfigured()) {
    // Generate mock DB items from local data for offline inspection
    const mockDb: DbService[] = SERVICES_DATA.map((s, idx) => ({
      id: `mock-srv-${idx + 1}`,
      title: s.title,
      slug: s.id,
      short_description: s.shortDescription,
      description: s.fullDescription,
      icon_key: s.icon,
      image_url: null,
      scope_points: s.scopePoints,
      deliverables: s.deliverables,
      ideal_for: s.idealFor,
      is_published: true,
      sort_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    return { data: mockDb };
  }

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data as DbService[]) || [] };
};

export const createService = async (
  service: Omit<DbService, 'id' | 'created_at' | 'updated_at'>
): Promise<{ data?: DbService; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase credentials not configured in .env.local' };
  }

  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: data as DbService };
};

export const updateService = async (
  id: string,
  updates: Partial<Omit<DbService, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ data?: DbService; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase credentials not configured in .env.local' };
  }

  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: data as DbService };
};

export const deleteService = async (id: string): Promise<{ error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase credentials not configured in .env.local' };
  }

  const { error } = await supabase.from('services').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  return {};
};
