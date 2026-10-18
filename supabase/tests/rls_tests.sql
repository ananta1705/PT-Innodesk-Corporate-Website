-- PT INNODESK - Supabase RLS Policy Verification Tests
-- Test suite verifying security rules for anonymous visitors vs authenticated administrators.

-- ==============================================================================
-- TEST CASE 1: Anonymous Read on Services
-- EXPECTED: Can only view rows where is_published = true
-- ==============================================================================
-- Run as anon:
SET ROLE anon;
SELECT count(*) AS published_services_count FROM public.services WHERE is_published = true;
-- Should succeed and return count of published rows.

SELECT count(*) AS unpublished_services_attempt FROM public.services WHERE is_published = false;
-- Should return 0 rows (invisible due to RLS).

-- ==============================================================================
-- TEST CASE 2: Anonymous Mutation on Services
-- EXPECTED: ERROR / Denied by RLS
-- ==============================================================================
SET ROLE anon;
-- Attempt unauthorized INSERT:
-- INSERT INTO public.services (title, slug, short_description) VALUES ('Hacked Service', 'hacked', 'desc');
-- Expected: ERROR: new row violates row-level security policy for table "services"

-- ==============================================================================
-- TEST CASE 3: Anonymous Read on Inquiries
-- EXPECTED: 0 rows returned (SELECT denied)
-- ==============================================================================
SET ROLE anon;
SELECT count(*) FROM public.inquiries;
-- Expected: Returns 0 rows (cannot read any inquiries submitted by clients).

-- ==============================================================================
-- TEST CASE 4: Anonymous Inquiry Submission
-- EXPECTED: Allowed with valid payload, Rejected with empty payload
-- ==============================================================================
SET ROLE anon;

-- Valid submission:
INSERT INTO public.inquiries (name, company, email, service_interest, message, status)
VALUES ('Budi Santoso', 'PT Maju Bersama', 'budi@example.com', 'IoT Device Integration', 'Halo, kami butuh integrasi sensor.', 'NEW');
-- Expected: Success (1 row inserted)

-- Invalid submission (violating WITH CHECK constraint - missing message):
-- INSERT INTO public.inquiries (name, company, email, service_interest, message, status)
-- VALUES ('Spammer', '', 'spam@bad.com', 'IoT', '', 'NEW');
-- Expected: ERROR: new row violates row-level security policy for table "inquiries"

-- ==============================================================================
-- TEST CASE 5: Anonymous Mutation/Update on Inquiries
-- EXPECTED: Denied / 0 rows affected
-- ==============================================================================
SET ROLE anon;
UPDATE public.inquiries SET status = 'COMPLETED';
-- Expected: 0 rows affected or permission denied.

-- Reset role to postgres:
RESET ROLE;
