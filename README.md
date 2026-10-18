# PT Innodesk — Dynamic IoT Corporate Website & Admin Panel

Aplikasi profil perusahaan dan integrasi IoT modern untuk **PT Innodesk**, dibangun dengan **React + Vite**, antarmuka terkurasi bertema *navy-blue-white* IoT, serta didukung oleh **Supabase (PostgreSQL, Supabase Auth, Row Level Security, dan Supabase Data API)**.

---

## 🌟 Fitur Utama

### 1. Halaman Publik (Preserved IoT Visual Identity)
- **Navbar & Logo**: Navigasi sticky responsif dengan scroll spy mulus.
- **Hero Section**: Ilustrasi isometrik kustom IoT, indikator pendekatan solusi, dan headline adaptif.
- **Dynamic Services**: 5 kategori layanan IoT fetched dari Supabase (`is_published = true`) dengan modal rincian teknis *scope points* dan *deliverables*.
- **About PT Innodesk**: Pernyataan posisi, 4 prinsip kerja, dan grafis visual kantor/tim.
- **IoT Workflow**: 4 tahapan konseptual alur data dari sensor fisik hingga dashboard operasional.
- **Capabilities Band**: Strip sorotan kapabilitas perangkat, arsitektur, visualisasi, dan perencanaan.
- **Solutions & Concept Portfolio**: Eksplorasi solusi IoT dengan label wajib **"Ilustrasi Konsep"** untuk menjaga integritas data tanpa mengklaim proyek klien fiktif.
- **Why PT Innodesk**: Prinsip pendekatan berbasis kebutuhan nyata.
- **Consultation Form**: Formulir konsultasi interaktif terhubung langsung ke tabel `inquiries` di Supabase dengan validasi masukan dan feedback real-time.
- **Footer**: Tautan cepat, area layanan dinamis, kontak terverifikasi, dan tautan Portal Admin.

### 2. Administrator Portal & Dashboard (`/admin`)
- **Autentikasi Aman**: Didukung Supabase Auth terikat tabel `admin_users` dengan verifikasi fungsi `is_admin()`.
- **Dashboard Ringkasan (`/admin`)**: Metrik langsung dari database (total layanan terbit, total solusi konsep, inquiry baru & total).
- **Manajemen Layanan (`/admin/services`)**: CRUD lengkap, tombol toggle terbit/draf, validasi slug unik, pengaturan *deliverables* dan *scope points*.
- **Manajemen Solusi (`/admin/solutions`)**: CRUD lengkap, pengelolaan tag, SVG visualizer, dan transparansi label konsep.
- **Manajemen Konten Situs (`/admin/content`)**: Pengubahan aman untuk teks Hero, Tentang Perusahaan, Footer, dan koordinat kontak resmi.
- **Inbox Konsultasi (`/admin/inquiries`)**: Inbox manajemen pesan masuk dengan filter status (`NEW`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`), modal rincian pesan, dan tombol respons email langsung.

---

## 🛠️ Tech Stack & Arsitektur

- **Frontend**: React 19, TypeScript, Vite 8, TailwindCSS, Lucide Icons, React Router DOM.
- **Backend / Database**: Supabase PostgreSQL.
- **Akses Data**: `@supabase/supabase-js` menggunakan Supabase Data API.
- **Keamanan**: Row Level Security (RLS) pada seluruh tabel publik dan privat.
- **Zero-Secret Client**: Hanya kredensial publishable/anon key yang digunakan di frontend.

---

## 🚀 Panduan Memulai Cepat

### 1. Prasyarat
- Node.js (v18+)
- Proyek Supabase aktif (dapat dibuat gratis di [supabase.com](https://supabase.com))

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (.env.local)
Salin `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Isi dengan kredensial Supabase Anda:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

### 4. Eksekusi Skrip SQL di Supabase
Buka Supabase Dashboard -> **SQL Editor**, jalankan isi dari:
`supabase/full_schema_and_seed.sql`

Untuk detail panduan otorisasi admin dan pembuatan pengguna pertama, baca:
👉 [**SUPABASE_SETUP.md**](./SUPABASE_SETUP.md)

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada: `http://localhost:3000`

### 6. Build Produksi
```bash
npm run build
```

---

## 📁 Struktur Kode

```
PT-Innodesk-Corporate-Website/
├── supabase/
│   ├── full_schema_and_seed.sql   # Skrip SQL lengkap (Tabel, RLS, Trigger, Seed)
│   ├── seed.sql                   # Data awal layanan & solusi konsep
│   ├── migrations/
│   │   ├── 20261018000001_create_schema.sql
│   │   └── 20261018000002_rls_policies.sql
│   └── tests/
│       └── rls_tests.sql          # Test suite validasi keamanan RLS
├── src/
│   ├── components/                # Komponen UI publik (Navbar, Footer, Modal, Graphics)
│   ├── sections/                  # Seksi landing page (Hero, Services, Portfolio, dll.)
│   ├── pages/
│   │   └── admin/                 # Halaman Portal Admin (Login, Dashboard, CRUD, Inbox)
│   ├── lib/
│   │   └── supabase.ts            # Client Supabase & Tipe Entitas Database
│   ├── services/                  # Data access layer (services, solutions, content, inquiries, auth)
│   ├── hooks/                     # Custom hook useAdminAuth
│   ├── data/                      # Data fallback & struktur awal
│   ├── types/                     # TypeScript Interfaces
│   ├── App.tsx                    # React Router configuration
│   └── main.tsx                   # Entrypoint React
├── SUPABASE_SETUP.md              # Dokumentasi lengkap setup backend Supabase
├── .env.example                   # Contoh konfigurasi environment variable
└── README.md
```

---

## 🛡️ Standar Keamanan & Integritas Data
1. **Row Level Security (RLS)** aktif pada semua tabel.
2. Pengunjung publik **dilarang membaca (SELECT)** isi tabel `inquiries` milik pengunjung lain.
3. Kredensial rahasia (`service_role` key atau password DB) tidak pernah diekspos ke frontend.
4. Data konsep solusi secara konsisten dilabeli **"Ilustrasi Konsep"** untuk menjamin kejujuran publikasi korporat.
