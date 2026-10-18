import { supabase, isSupabaseConfigured, DbSiteContent } from '../lib/supabase';
import {
  HERO_CONTENT,
  ABOUT_CONTENT,
  COMPANY_INFO,
} from '../data/siteContent';

export interface HeroContentValue {
  eyebrow: string;
  headlineLine1: string;
  headlineHighlight: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface AboutContentValue {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  overview: string;
  secondaryText: string;
  principles: string[];
  ctaLabel: string;
}

export interface FooterContentValue {
  companyName: string;
  tagline: string;
  shortSummary: string;
}

export interface ContactInfoContentValue {
  email: string | null;
  phone: string | null;
  address: string | null;
  whatsappUrl: string | null;
}

export type AllowedSiteContentKey = 'hero' | 'about' | 'footer' | 'contact_info';

export const DEFAULT_SITE_CONTENT: {
  hero: HeroContentValue;
  about: AboutContentValue;
  footer: FooterContentValue;
  contact_info: ContactInfoContentValue;
} = {
  hero: {
    eyebrow: HERO_CONTENT.eyebrow,
    headlineLine1: HERO_CONTENT.headlineLine1,
    headlineHighlight: HERO_CONTENT.headlineHighlight,
    description: HERO_CONTENT.description,
    primaryCta: HERO_CONTENT.primaryCta,
    secondaryCta: HERO_CONTENT.secondaryCta,
  },
  about: {
    eyebrow: ABOUT_CONTENT.eyebrow,
    headingPrefix: ABOUT_CONTENT.headingPrefix,
    headingHighlight: ABOUT_CONTENT.headingHighlight,
    overview: ABOUT_CONTENT.overview,
    secondaryText: ABOUT_CONTENT.secondaryText,
    principles: [...ABOUT_CONTENT.principles],
    ctaLabel: ABOUT_CONTENT.ctaLabel,
  },
  footer: {
    companyName: COMPANY_INFO.name,
    tagline: COMPANY_INFO.tagline,
    shortSummary: COMPANY_INFO.shortSummary,
  },
  contact_info: {
    email: COMPANY_INFO.verifiedContact.email,
    phone: COMPANY_INFO.verifiedContact.phone,
    address: COMPANY_INFO.verifiedContact.address,
    whatsappUrl: COMPANY_INFO.verifiedContact.whatsappUrl,
  },
};

export const getAllSiteContent = async (): Promise<{
  data: typeof DEFAULT_SITE_CONTENT;
  fromFallback: boolean;
  error?: string;
}> => {
  if (!isSupabaseConfigured()) {
    return { data: DEFAULT_SITE_CONTENT, fromFallback: true };
  }

  try {
    const { data, error } = await supabase.from('site_content').select('*');

    if (error) {
      console.warn('Error fetching site content from Supabase:', error.message);
      return { data: DEFAULT_SITE_CONTENT, fromFallback: true, error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: DEFAULT_SITE_CONTENT, fromFallback: false };
    }

    const merged = { ...DEFAULT_SITE_CONTENT };
    (data as DbSiteContent[]).forEach((item) => {
      if (item.key in merged) {
        (merged as any)[item.key] = {
          ...(merged as any)[item.key],
          ...item.value,
        };
      }
    });

    return { data: merged, fromFallback: false };
  } catch (err: any) {
    return { data: DEFAULT_SITE_CONTENT, fromFallback: true, error: err.message };
  }
};

export const updateSiteContent = async (
  key: AllowedSiteContentKey,
  value: any
): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase credentials not configured in .env.local' };
  }

  const { error } = await supabase
    .from('site_content')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
