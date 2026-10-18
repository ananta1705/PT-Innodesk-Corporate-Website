import { supabase, isSupabaseConfigured, DbInquiry } from '../lib/supabase';

export interface SubmitInquiryPayload {
  name: string;
  company?: string;
  email: string;
  service_interest: string;
  message: string;
}

export const submitInquiry = async (
  payload: SubmitInquiryPayload
): Promise<{ success: boolean; data?: DbInquiry; error?: string; isSimulated?: boolean }> => {
  // Input validation
  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const serviceInterest = payload.service_interest?.trim();
  const message = payload.message?.trim();
  const company = payload.company?.trim() || null;

  if (!name) {
    return { success: false, error: 'Nama lengkap wajib diisi.' };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Alamat email tidak valid.' };
  }
  if (!serviceInterest) {
    return { success: false, error: 'Pilih salah satu area kebutuhan.' };
  }
  if (!message || message.length < 5) {
    return { success: false, error: 'Pesan kebutuhan minimal 5 karakter.' };
  }

  if (!isSupabaseConfigured()) {
    // Graceful fallback for local demo mode before Supabase credentials are configured
    console.warn(
      'Supabase not yet configured. Simulated successful submission for inquiry:',
      payload
    );
    return {
      success: true,
      isSimulated: true,
      data: {
        id: `simulated-${Date.now()}`,
        name,
        company,
        email,
        service_interest: serviceInterest,
        message,
        status: 'NEW',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };
  }

  try {
    // Note: Do NOT use .select() for anonymous insert because anonymous visitors
    // have NO SELECT permission on inquiries table (RLS blocks SELECT for security!).
    // In Supabase, doing .insert([...]) without select() returns status 201 on success.
    const { error, status } = await supabase.from('inquiries').insert([
      {
        name,
        company,
        email,
        service_interest: serviceInterest,
        message,
        status: 'NEW',
      },
    ]);

    if (error) {
      console.error('Supabase inquiry insert error:', error);
      return { success: false, error: error.message };
    }

    if (status === 201 || status === 200) {
      return { success: true };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Terjadi kesalahan sistem saat mengirim.' };
  }
};

export const getInquiriesAdmin = async (
  statusFilter?: 'ALL' | 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'
): Promise<{ data: DbInquiry[]; error?: string }> => {
  if (!isSupabaseConfigured()) {
    // Provide sample inquiries for testing UI when offline
    const sampleInquiries: DbInquiry[] = [
      {
        id: 'inq-sample-1',
        name: 'Rian Pratama',
        company: 'PT Logistik Sejahtera',
        email: 'rian@logistik.co.id',
        service_interest: 'IoT Device Integration',
        message: 'Kami ingin menghubungkan armada sensor suhu kontainer ke sistem monitoring kami.',
        status: 'NEW',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'inq-sample-2',
        name: 'Siti Aminah',
        company: 'AgriTech Nusantara',
        email: 'siti@agritech.id',
        service_interest: 'Monitoring & Data Visibility',
        message: 'Kebutuhan monitoring kelembaban tanah dan cuaca mikro pada 10 titik perkebunan.',
        status: 'IN_PROGRESS',
        created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ];

    if (!statusFilter || statusFilter === 'ALL') {
      return { data: sampleInquiries };
    }
    return { data: sampleInquiries.filter((inq) => inq.status === statusFilter) };
  }

  let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });

  if (statusFilter && statusFilter !== 'ALL') {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data as DbInquiry[]) || [] };
};

export const updateInquiryStatus = async (
  id: string,
  status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'
): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase credentials not configured in .env.local' };
  }

  const { error } = await supabase
    .from('inquiries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};

export const deleteInquiry = async (id: string): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase credentials not configured in .env.local' };
  }

  const { error } = await supabase.from('inquiries').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
