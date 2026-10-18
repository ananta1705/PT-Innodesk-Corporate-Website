-- PT INNODESK - Supabase RLS & Security Policies Migration 02
-- Secure Row Level Security (RLS) enforcement and admin role verification

-- ==============================================================================
-- 1. Helper Function: is_admin()
-- ==============================================================================
-- Checks if the currently authenticated user exists in the admin_users table.
-- SECURITY DEFINER ensures it runs with owner privileges to safely verify membership
-- without allowing public users to query the admin_users table directly.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
  );
$$;

-- Revoke execute from public, grant to authenticated and anon (returns false for anon)
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- ==============================================================================
-- 2. Enable RLS on All Tables
-- ==============================================================================
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 3. RLS Policies: admin_users
-- ==============================================================================
-- Admins can read admin_users to inspect administrative staff.
DROP POLICY IF EXISTS "admin_users_select_admin" ON public.admin_users;
CREATE POLICY "admin_users_select_admin"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (id = auth.uid() OR public.is_admin());

-- Only superadmins or database direct administrators can mutate admin_users.
-- No public INSERT, UPDATE, or DELETE permitted.

-- ==============================================================================
-- 4. RLS Policies: services
-- ==============================================================================
-- Public visitors can only view published services.
DROP POLICY IF EXISTS "services_public_select" ON public.services;
CREATE POLICY "services_public_select"
    ON public.services
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

-- Administrators have full read and write access.
DROP POLICY IF EXISTS "services_admin_all" ON public.services;
CREATE POLICY "services_admin_all"
    ON public.services
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ==============================================================================
-- 5. RLS Policies: solutions
-- ==============================================================================
-- Public visitors can only view published solutions & concepts.
DROP POLICY IF EXISTS "solutions_public_select" ON public.solutions;
CREATE POLICY "solutions_public_select"
    ON public.solutions
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

-- Administrators have full read and write access.
DROP POLICY IF EXISTS "solutions_admin_all" ON public.solutions;
CREATE POLICY "solutions_admin_all"
    ON public.solutions
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ==============================================================================
-- 6. RLS Policies: site_content
-- ==============================================================================
-- Public visitors can read approved company content.
DROP POLICY IF EXISTS "site_content_public_select" ON public.site_content;
CREATE POLICY "site_content_public_select"
    ON public.site_content
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Administrators can insert, update, or delete site content.
DROP POLICY IF EXISTS "site_content_admin_all" ON public.site_content;
CREATE POLICY "site_content_admin_all"
    ON public.site_content
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ==============================================================================
-- 7. RLS Policies: inquiries
-- ==============================================================================
-- Anonymous/public visitors can INSERT a new consultation inquiry with basic validation.
-- Notice: Visitors CANNOT SELECT, UPDATE, or DELETE inquiries. Zero public read access!
DROP POLICY IF EXISTS "inquiries_public_insert" ON public.inquiries;
CREATE POLICY "inquiries_public_insert"
    ON public.inquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        char_length(trim(name)) > 0
        AND char_length(trim(email)) > 3
        AND position('@' in email) > 1
        AND char_length(trim(service_interest)) > 0
        AND char_length(trim(message)) >= 5
        AND (status = 'NEW' OR status IS NULL)
    );

-- Verified administrators can read, update status, and manage inquiries.
DROP POLICY IF EXISTS "inquiries_admin_all" ON public.inquiries;
CREATE POLICY "inquiries_admin_all"
    ON public.inquiries
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
