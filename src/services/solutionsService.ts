import { supabase, isSupabaseConfigured, DbSolution } from '../lib/supabase';
import { PORTFOLIO_CONCEPTS } from '../data/siteContent';
import { PortfolioConceptItem } from '../types';

export const mapDbSolutionToItem = (db: DbSolution): PortfolioConceptItem => {
  return {
    id: db.slug || db.id,
    title: db.title,
    category: db.category || 'Ilustrasi Konsep',
    conceptBadge: db.concept_badge || `${db.category || 'Ilustrasi Konsep'} · IoT`,
    thumbType: (db.thumb_type as PortfolioConceptItem['thumbType']) || 'monitoring',
    shortSummary: db.summary,
    fullExplanation: db.description || db.summary,
    architectureHighlights: Array.isArray(db.architecture_highlights)
      ? db.architecture_highlights
      : [],
    tags: Array.isArray(db.tags) ? db.tags : [],
    disclaimer:
      db.disclaimer ||
      'Catatan: Kartu ini adalah ilustrasi konsep untuk menjelaskan contoh rancangan solusi, bukan proyek klien yang diklaim telah selesai.',
  };
};

export const getPublishedSolutions = async (): Promise<{
  data: PortfolioConceptItem[];
  fromFallback: boolean;
  error?: string;
}> => {
  if (!isSupabaseConfigured()) {
    return { data: PORTFOLIO_CONCEPTS, fromFallback: true };
  }

  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Error fetching solutions from Supabase:', error.message);
      return { data: PORTFOLIO_CONCEPTS, fromFallback: true, error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: [], fromFallback: false };
    }

    return {
      data: (data as DbSolution[]).map(mapDbSolutionToItem),
      fromFallback: false,
    };
  } catch (err: any) {
    console.error('Fetch error:', err);
    return { data: PORTFOLIO_CONCEPTS, fromFallback: true, error: err.message };
  }
};

export const getAllSolutionsAdmin = async (): Promise<{
  data: DbSolution[];
  error?: string;
}> => {
  if (!isSupabaseConfigured()) {
    const mockDb: DbSolution[] = PORTFOLIO_CONCEPTS.map((c, idx) => ({
      id: `mock-sol-${idx + 1}`,
      title: c.title,
      slug: c.id,
      category: c.category,
      concept_badge: c.conceptBadge,
      thumb_type: c.thumbType,
      summary: c.shortSummary,
      description: c.fullExplanation,
      architecture_highlights: c.architectureHighlights,
      tags: c.tags,
      image_url: null,
      disclaimer: c.disclaimer,
      is_illustrative: true,
      is_published: true,
      sort_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    return { data: mockDb };
  }

  const { data, error } = await supabase
    .from('solutions')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data as DbSolution[]) || [] };
};

export const createSolution = async (
  solution: Omit<DbSolution, 'id' | 'created_at' | 'updated_at'>
): Promise<{ data?: DbSolution; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase credentials not configured in .env.local' };
  }

  const { data, error } = await supabase
    .from('solutions')
    .insert([solution])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: data as DbSolution };
};

export const updateSolution = async (
  id: string,
  updates: Partial<Omit<DbSolution, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ data?: DbSolution; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase credentials not configured in .env.local' };
  }

  const { data, error } = await supabase
    .from('solutions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: data as DbSolution };
};

export const deleteSolution = async (id: string): Promise<{ error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase credentials not configured in .env.local' };
  }

  const { error } = await supabase.from('solutions').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  return {};
};
