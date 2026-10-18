# Panduan Konfigurasi Supabase — PT Innodesk

Dokumen ini menjelaskan langkah demi langkah pengaturan backend Supabase (PostgreSQL, Row Level Security, Supabase Auth, dan Data API) untuk aplikasi profil perusahaan IoT PT Innodesk.

---

## 1. Buat / Buka Proyek Supabase

1. Kunjungi [Supabase Dashboard](https://supabase.com/dashboard).
2. Buat proyek baru dengan nama `PT Innodesk` (pilih region terdekat, misalnya `Southeast Asia (Singapore)`).
3. Catat kata sandi database Anda dengan aman.

---

## 2. Dapatkan Project URL & Publishable / Anon Key

1. Buka menu **Project Settings** (ikon gerigi) -> **API**.
2. Salin nilai berikut:
   - **Project URL** (contoh: `https://xyzcompany.supabase.co`)
   - **Project API Keys** -> `anon` / `public` (kunci publishable aman untuk browser).
3. Buat file `.env.local` pada root proyek `PT-Innodesk-Corporate-Website` dengan konten:
   ```env
   VITE_SUPABASE_URL=https://xyzcompany.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJh...
   ```
   *(PENTING: Jangan gunakan `service_role` key pada kode frontend atau file `.env.local`).*

---

## 3. Eksekusi Skema Database, RLS, dan Seed Data

Buka **SQL Editor** pada Supabase Dashboard, lalu salin dan jalankan isi dari:
[`supabase/full_schema_and_seed.sql`](./supabase/full_schema_and_seed.sql)

Skrip ini akan otomatis membuat:
1. **Tabel & Indeks**:
   - `public.admin_users`: Pemetaan ID auth ke peran administrator.
   - `public.services`: Layanan IoT, status terbit, slug unik, rincian teknis scope & deliverables.
   - `public.solutions`: Kartu solusi konsep IoT, label "Ilustrasi Konsep", tag, dan disclaimer.
   - `public.site_content`: Konten teks resmi hero, about, footer, dan koordinat kontak.
   - `public.inquiries`: Formulir konsultasi masuk dengan alur status (`NEW`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`).
2. **Triggers**: Auto-update kolom `updated_at`.
3. **Security Function**: `public.is_admin()` berdasar `auth.uid()` dan tabel `public.admin_users`.
4. **Row Level Security (RLS)**: Enforced pada seluruh tabel dengan aturan tanpa celah kebocoran data.
5. **Initial Data**: 5 layanan IoT, 3 solusi konsep bertanda eksplisit, dan konten profil terstruktur.

---

## 4. Otorisasi Administrator (Supabase Auth & RBAC)

Per PRD: Pendaftaran publik dinonaktifkan. Akun admin dibuat secara terkontrol.

### Langkah A: Buat User di Supabase Auth
1. Buka **Authentication** -> **Users** -> Klik **Add User** -> **Create User**.
2. Masukkan email (misal: `admin@innodesk.id`) dan password yang kuat.
3. Centang opsi **Auto Confirm User?** agar dapat langsung login tanpa konfirmasi email.

### Langkah B: Daftarkan ke Tabel `admin_users`
Jalankan query berikut di **SQL Editor**:
```sql
INSERT INTO public.admin_users (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'admin@innodesk.id'
ON CONFLICT (id) DO NOTHING;
```

Sekarang akun tersebut memiliki otorisasi penuh untuk mengakses portal admin di `/admin/login`.

---

## 5. Matriks Kebijakan Row Level Security (RLS)

| Tabel | Anonymous Visitor (Publik) | Authenticated Admin | Catatan Keamanan |
|---|---|---|---|
| `services` | `SELECT` (hanya `is_published = true`) | `ALL` (CRUD lengkap) | Layanan draf tidak bocor ke publik |
| `solutions` | `SELECT` (hanya `is_published = true`) | `ALL` (CRUD lengkap) | Konsep draf terisolasi |
| `site_content` | `SELECT` (baca publik) | `ALL` (CRUD lengkap) | Konten hanya dapat diedit admin |
| `inquiries` | `INSERT` (validasi payload) | `ALL` (baca & ubah status) | **Zero public read:** Pengunjung tidak dapat membaca, mengubah, atau menghapus inquiry |
| `admin_users` | Tidak ada akses sama sekali | `SELECT` (hanya baris sendiri / admin) | Mencegah eskalasi hak istimewa |

---

## 6. Verifikasi & Pengujian RLS

Gunakan skrip pengujian SQL yang telah disediakan:
[`supabase/tests/rls_tests.sql`](./supabase/tests/rls_tests.sql)

Jalankan skrip di SQL Editor untuk memvalidasi:
- Pengunjung publik dapat membaca layanan & solusi terbit.
- Pengunjung publik ditolak saat mencoba membaca inquiry atau mengubah data.
- Pengunjung publik dapat mengirim inquiry baru dengan payload yang valid.
