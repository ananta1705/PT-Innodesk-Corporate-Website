-- PT INNODESK - Supabase Seed Data
-- Initial verified illustrative content for services, solutions, and site_content.
-- Note: Sample solutions are explicitly marked with is_illustrative = true per PRD.

-- ==============================================================================
-- 1. Initial Services (Proposed IoT Offerings)
-- ==============================================================================
INSERT INTO public.services (
    title, slug, short_description, description, icon_key, scope_points, deliverables, ideal_for, is_published, sort_order
) VALUES
(
    'IoT Device Integration',
    'iot-device-integration',
    'Menghubungkan sensor, perangkat, gateway, dan sistem yang relevan dalam satu alur solusi.',
    'Perancangan skema konektivitas untuk menjembatani perangkat keras dan sensor di lapangan agar dapat mengirimkan parameter terukur secara terstruktur ke sistem terpusat.',
    'iot',
    '["Identifikasi kebutuhan sensor dan kompatibilitas antarmuka perangkat", "Perancangan topologi komunikasi antara perangkat lapangan dan gateway", "Standarisasi struktur paket data untuk memudahkan pemrosesan lanjutan", "Penyusunan dokumentasi teknis skema perangkat dan koneksi"]'::jsonb,
    '["Rancangan Topologi Perangkat", "Konfigurasi Konektivitas Node & Gateway", "Dokumentasi Skema Integrasi"]'::jsonb,
    'Organisasi yang ingin menghubungkan instrumen atau perangkat fisik ke sistem digital.',
    true,
    1
),
(
    'Monitoring & Data Visibility',
    'monitoring-data-visibility',
    'Membantu merancang cara pengumpulan dan penyajian data agar lebih mudah dipahami.',
    'Penyusunan alur pencatatan dan penyajian parameter operasional agar tim lapangan maupun manajemen dapat melihat kondisi perangkat secara jelas dan terorganisir.',
    'monitoring',
    '["Penentuan parameter utama yang relevan untuk dipantau secara berkala", "Pengaturan indikator batas kondisi dan penanda status perangkat", "Penyusunan riwayat pembacaan data (log) untuk kebutuhan evaluasi", "Format ringkasan informasi yang mudah dibaca lintas fungsi tim"]'::jsonb,
    '["Skema Akuisisi & Pencatatan Data", "Konfigurasi Indikator Status", "Format Ringkasan Evaluasi Data"]'::jsonb,
    'Tim operasional dan pengelola fasilitas yang membutuhkan visibilitas kondisi aset.',
    true,
    2
),
(
    'IoT Platform & Dashboard',
    'iot-platform-dashboard',
    'Konsep antarmuka untuk memantau status perangkat dan menyajikan data secara terstruktur.',
    'Pengembangan aplikasi web dashboard yang dirancang khusus untuk menampilkan status perangkat terhubung, grafik tren pengukuran, dan ringkasan indikator operasional.',
    'software',
    '["Desain antarmuka dashboard web yang bersih dan responsif di berbagai layar", "Visualisasi grafik parameter dan pengelompokan status unit perangkat", "Pengaturan tampilan berdasarkan peran pengguna dalam organisasi", "Kemudahan navigasi untuk menelusuri detail setiap titik perangkat"]'::jsonb,
    '["Aplikasi Web Dashboard IoT", "Komponen Visualisasi Parameter", "Panduan Penggunaan Antarmuka"]'::jsonb,
    'Perusahaan yang membutuhkan tampilan terpusat untuk memantau sejumlah perangkat.',
    true,
    3
),
(
    'System Integration & Automation',
    'system-integration-automation',
    'Menghubungkan alur data dan sistem untuk mendukung proses operasional yang direncanakan.',
    'Penyelarasan aliran informasi antara platform IoT, basis data, dan aplikasi internal perusahaan agar pertukaran data berjalan konsisten serta mengurangi pencatatan berulang.',
    'automation',
    '["Pengembangan penghubung API dan middleware pertukaran data antar sistem", "Aturan pemicu otomatis (rule-based triggers) berdasarkan kondisi parameter", "Sinkronisasi informasi status perangkat ke sistem pelaporan internal", "Penanganan antrean data agar alur integrasi tetap terkelola"]'::jsonb,
    '["Modul Integrasi API / Middleware", "Konfigurasi Alur Otomasi Terencana", "Dokumentasi Alur Pertukaran Data"]'::jsonb,
    'Bisnis yang ingin menghubungkan data perangkat lapangan dengan sistem perangkat lunak yang ada.',
    true,
    4
),
(
    'IoT Consulting & Prototyping',
    'iot-consulting-prototyping',
    'Membantu memetakan kebutuhan, memilih pendekatan, dan merancang konsep awal solusi.',
    'Pendampingan tahap awal bagi organisasi yang sedang mengeksplorasi penerapan IoT, mulai dari perumusan masalah operasional hingga pembuatan purwarupa (prototype) konsep solusi.',
    'consulting',
    '["Pemetaan konteks operasional dan tujuan yang ingin dicapai bersama tim", "Evaluasi alternatif perangkat, opsi konektivitas, dan arsitektur sistem", "Perancangan konsep awal (proof-of-concept / prototype) secara terarah", "Penyusunan rencana tahapan pengembangan jangka panjang yang realistis"]'::jsonb,
    '["Dokumen Pemetaan Kebutuhan & Arsitektur", "Rancangan Konsep / Prototype Solusi", "Rekomendasi Tahapan Implementasi"]'::jsonb,
    'Perusahaan yang ingin memvalidasi konsep solusi IoT sebelum implementasi skala penuh.',
    true,
    5
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    icon_key = EXCLUDED.icon_key,
    scope_points = EXCLUDED.scope_points,
    deliverables = EXCLUDED.deliverables,
    ideal_for = EXCLUDED.ideal_for,
    is_published = EXCLUDED.is_published,
    sort_order = EXCLUDED.sort_order;

-- ==============================================================================
-- 2. Initial Solutions (Concept Illustrations)
-- ==============================================================================
INSERT INTO public.solutions (
    title, slug, category, concept_badge, thumb_type, summary, description,
    architecture_highlights, tags, is_illustrative, is_published, sort_order
) VALUES
(
    'Pemantauan Kondisi Perangkat',
    'pemantauan-kondisi-perangkat',
    'Ilustrasi Konsep',
    'Ilustrasi Konsep · Device Status',
    'monitoring',
    'Contoh konsep untuk melihat status perangkat terhubung serta parameter pengukuran terpilih secara terpusat.',
    'Konsep ini mengilustrasikan bagaimana sejumlah unit perangkat atau sensor pada suatu fasilitas dapat dipantau status konektivitas serta nilai pengukurannya melalui satu tampilan ringkas.',
    '["Indikator status koneksi perangkat dan pembacaan parameter berkala", "Penanda visual apabila nilai pembacaan melewati batas yang ditentukan", "Ringkasan riwayat waktu pencatatan untuk memudahkan pemeriksaan rutin"]'::jsonb,
    ARRAY['Sensor', 'Status Perangkat', 'Monitoring'],
    true,
    true,
    1
),
(
    'Dashboard Data Operasional',
    'dashboard-data-operasional',
    'Ilustrasi Konsep',
    'Ilustrasi Konsep · Operational UI',
    'dashboard',
    'Contoh konsep pengorganisasian indikator operasional ke dalam antarmuka web yang rapi dan mudah dibaca.',
    'Konsep ini menggambarkan penataan berbagai indikator data operasional ke dalam panel-panel visual yang terstruktur, sehingga tim dapat memahami tren dan ringkasan kondisi dengan cepat.',
    '["Pengelompokan metrik berdasarkan area atau kategori perangkat", "Grafik perbandingan waktu untuk mengamati pola perubahan data", "Tampilan responsif yang nyaman diakses melalui komputer maupun tablet"]'::jsonb,
    ARRAY['Dashboard', 'Visualisasi Data', 'Insight'],
    true,
    true,
    2
),
(
    'Integrasi Sensor dan Platform',
    'integrasi-sensor-dan-platform',
    'Ilustrasi Konsep',
    'Ilustrasi Konsep · Data Pipeline',
    'integration',
    'Contoh konsep alur pengiriman data dari sensor lapangan menuju platform perangkat lunak yang saling terhubung.',
    'Konsep ini memperlihatkan bagaimana data yang dihasilkan oleh perangkat sensor dapat diteruskan melalui gateway dan diintegrasikan ke dalam aplikasi atau sistem informasi organisasi.',
    '["Alur pengiriman data terstruktur dari perangkat menuju gateway", "Penyelarasan format data melalui API agar kompatibel dengan platform tujuan", "Desain modular yang mendukung penambahan titik sensor secara bertahap"]'::jsonb,
    ARRAY['Sensor', 'Gateway', 'Integrasi'],
    true,
    true,
    3
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    concept_badge = EXCLUDED.concept_badge,
    thumb_type = EXCLUDED.thumb_type,
    summary = EXCLUDED.summary,
    description = EXCLUDED.description,
    architecture_highlights = EXCLUDED.architecture_highlights,
    tags = EXCLUDED.tags,
    is_illustrative = EXCLUDED.is_illustrative,
    is_published = EXCLUDED.is_published,
    sort_order = EXCLUDED.sort_order;

-- ==============================================================================
-- 3. Initial Site Content
-- ==============================================================================
INSERT INTO public.site_content (key, value) VALUES
(
    'hero',
    '{
        "eyebrow": "SOLUSI IoT & INTEGRASI TEKNOLOGI",
        "headlineLine1": "Menghubungkan Perangkat.",
        "headlineHighlight": "Membuka Peluang Baru.",
        "description": "PT Innodesk menghadirkan pendekatan teknologi terintegrasi untuk membantu bisnis menghubungkan perangkat, memahami data, dan meningkatkan visibilitas operasional.",
        "primaryCta": "Diskusikan Kebutuhan Anda",
        "secondaryCta": "Jelajahi Solusi"
    }'::jsonb
),
(
    'about',
    '{
        "eyebrow": "TENTANG PT INNODESK",
        "headingPrefix": "Mengubah Kebutuhan Teknologi Menjadi ",
        "headingHighlight": "Solusi Terintegrasi",
        "overview": "PT Innodesk diposisikan sebagai mitra teknologi yang berfokus pada eksplorasi dan pengembangan solusi Internet of Things (IoT) serta integrasi sistem. Kami membantu organisasi menjembatani perangkat fisik di lapangan dengan antarmuka informasi yang terstruktur.",
        "secondaryText": "Setiap organisasi memiliki karakteristik perangkat dan alur operasional yang berbeda. Oleh karena itu, pendekatan kerja kami selalu dimulai dari pemahaman konteks kebutuhan sebelum merumuskan arsitektur konektivitas maupun tampilan dashboard.",
        "principles": [
            "Berangkat dari kebutuhan pengguna.",
            "Mempertimbangkan kompatibilitas sistem.",
            "Mengutamakan keterbacaan data.",
            "Memperhatikan pengembangan jangka panjang."
        ],
        "ctaLabel": "Lihat Cara Kerja"
    }'::jsonb
),
(
    'footer',
    '{
        "companyName": "PT Innodesk",
        "tagline": "SOLUSI IoT & INTEGRASI TEKNOLOGI",
        "shortSummary": "PT Innodesk menghadirkan pendekatan teknologi terintegrasi untuk membantu bisnis menghubungkan perangkat, memahami data, dan meningkatkan visibilitas operasional."
    }'::jsonb
),
(
    'contact_info',
    '{
        "email": null,
        "phone": null,
        "address": null,
        "whatsappUrl": null
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = now();
