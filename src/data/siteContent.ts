import {
  NavLinkItem,
  ServiceItem,
  WorkflowStageItem,
  CapabilityBandItem,
  PortfolioConceptItem,
  WhyChooseItem,
} from '../types';

export const COMPANY_INFO = {
  name: 'PT Innodesk',
  tagline: 'SOLUSI IoT & INTEGRASI TEKNOLOGI',
  shortSummary:
    'PT Innodesk menghadirkan pendekatan teknologi terintegrasi untuk membantu bisnis menghubungkan perangkat, memahami data, dan meningkatkan visibilitas operasional.',
  // Optional verified contact coordinates (kept empty by default per PRD 2.4 & 4.11 until verified details are provided)
  verifiedContact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    whatsappUrl: null as string | null,
  },
};

export const NAV_LINKS: NavLinkItem[] = [
  { id: 'beranda', label: 'Beranda', href: '#beranda' },
  { id: 'tentang', label: 'Tentang', href: '#tentang' },
  { id: 'layanan', label: 'Layanan', href: '#layanan' },
  { id: 'cara-kerja', label: 'Cara Kerja', href: '#cara-kerja' },
  { id: 'solusi', label: 'Solusi', href: '#solusi' },
  { id: 'kontak', label: 'Kontak', href: '#kontak' },
];

export const HERO_CONTENT = {
  eyebrow: 'SOLUSI IoT & INTEGRASI TEKNOLOGI',
  headlineLine1: 'Menghubungkan Perangkat.',
  headlineHighlight: 'Membuka Peluang Baru.',
  description:
    'PT Innodesk menghadirkan pendekatan teknologi terintegrasi untuk membantu bisnis menghubungkan perangkat, memahami data, dan meningkatkan visibilitas operasional.',
  primaryCta: 'Diskusikan Kebutuhan Anda',
  secondaryCta: 'Jelajahi Solusi',
  indicators: [
    { id: 'ind-1', label: 'Integrasi Perangkat' },
    { id: 'ind-2', label: 'Visibilitas Data' },
    { id: 'ind-3', label: 'Solusi Sesuai Kebutuhan' },
  ],
};

export const SERVICES_CONTENT = {
  eyebrow: 'LAYANAN KAMI',
  headingPrefix: 'Solusi IoT untuk ',
  headingHighlight: 'Operasional yang Lebih Terhubung',
  intro:
    'Kategori berikut menggambarkan area pengembangan dan integrasi potensial yang dapat disesuaikan dengan kebutuhan perangkat serta kesiapan sistem di perusahaan Anda.',
  ctaLabel: 'Lihat Ringkasan Layanan',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'iot-device-integration',
    title: 'IoT Device Integration',
    shortDescription:
      'Menghubungkan sensor, perangkat, gateway, dan sistem yang relevan dalam satu alur solusi.',
    fullDescription:
      'Perancangan skema konektivitas untuk menjembatani perangkat keras dan sensor di lapangan agar dapat mengirimkan parameter terukur secara terstruktur ke sistem terpusat.',
    icon: 'iot',
    scopePoints: [
      'Identifikasi kebutuhan sensor dan kompatibilitas antarmuka perangkat',
      'Perancangan topologi komunikasi antara perangkat lapangan dan gateway',
      'Standarisasi struktur paket data untuk memudahkan pemrosesan lanjutan',
      'Penyusunan dokumentasi teknis skema perangkat dan koneksi',
    ],
    deliverables: [
      'Rancangan Topologi Perangkat',
      'Konfigurasi Konektivitas Node & Gateway',
      'Dokumentasi Skema Integrasi',
    ],
    idealFor:
      'Organisasi yang ingin menghubungkan instrumen atau perangkat fisik ke sistem digital.',
  },
  {
    id: 'monitoring-data-visibility',
    title: 'Monitoring & Data Visibility',
    shortDescription:
      'Membantu merancang cara pengumpulan dan penyajian data agar lebih mudah dipahami.',
    fullDescription:
      'Penyusunan alur pencatatan dan penyajian parameter operasional agar tim lapangan maupun manajemen dapat melihat kondisi perangkat secara jelas dan terorganisir.',
    icon: 'monitoring',
    scopePoints: [
      'Penentuan parameter utama yang relevan untuk dipantau secara berkala',
      'Pengaturan indikator batas kondisi dan penanda status perangkat',
      'Penyusunan riwayat pembacaan data (log) untuk kebutuhan evaluasi',
      'Format ringkasan informasi yang mudah dibaca lintas fungsi tim',
    ],
    deliverables: [
      'Skema Akuisisi & Pencatatan Data',
      'Konfigurasi Indikator Status',
      'Format Ringkasan Evaluasi Data',
    ],
    idealFor:
      'Tim operasional dan pengelola fasilitas yang membutuhkan visibilitas kondisi aset.',
  },
  {
    id: 'iot-platform-dashboard',
    title: 'IoT Platform & Dashboard',
    shortDescription:
      'Konsep antarmuka untuk memantau status perangkat dan menyajikan data secara terstruktur.',
    fullDescription:
      'Pengembangan aplikasi web dashboard yang dirancang khusus untuk menampilkan status perangkat terhubung, grafik tren pengukuran, dan ringkasan indikator operasional.',
    icon: 'software',
    scopePoints: [
      'Desain antarmuka dashboard web yang bersih dan responsif di berbagai layar',
      'Visualisasi grafik parameter dan pengelompokan status unit perangkat',
      'Pengaturan tampilan berdasarkan peran pengguna dalam organisasi',
      'Kemudahan navigasi untuk menelusuri detail setiap titik perangkat',
    ],
    deliverables: [
      'Aplikasi Web Dashboard IoT',
      'Komponen Visualisasi Parameter',
      'Panduan Penggunaan Antarmuka',
    ],
    idealFor:
      'Perusahaan yang membutuhkan tampilan terpusat untuk memantau sejumlah perangkat.',
  },
  {
    id: 'system-integration-automation',
    title: 'System Integration & Automation',
    shortDescription:
      'Menghubungkan alur data dan sistem untuk mendukung proses operasional yang direncanakan.',
    fullDescription:
      'Penyelarasan aliran informasi antara platform IoT, basis data, dan aplikasi internal perusahaan agar pertukaran data berjalan konsisten serta mengurangi pencatatan berulang.',
    icon: 'automation',
    scopePoints: [
      'Pengembangan penghubung API dan middleware pertukaran data antar sistem',
      'Aturan pemicu otomatis (rule-based triggers) berdasarkan kondisi parameter',
      'Sinkronisasi informasi status perangkat ke sistem pelaporan internal',
      'Penanganan antrean data agar alur integrasi tetap terkelola',
    ],
    deliverables: [
      'Modul Integrasi API / Middleware',
      'Konfigurasi Alur Otomasi Terencana',
      'Dokumentasi Alur Pertukaran Data',
    ],
    idealFor:
      'Bisnis yang ingin menghubungkan data perangkat lapangan dengan sistem perangkat lunak yang ada.',
  },
  {
    id: 'iot-consulting-prototyping',
    title: 'IoT Consulting & Prototyping',
    shortDescription:
      'Membantu memetakan kebutuhan, memilih pendekatan, dan merancang konsep awal solusi.',
    fullDescription:
      'Pendampingan tahap awal bagi organisasi yang sedang mengeksplorasi penerapan IoT, mulai dari perumusan masalah operasional hingga pembuatan purwarupa (prototype) konsep solusi.',
    icon: 'consulting',
    scopePoints: [
      'Pemetaan konteks operasional dan tujuan yang ingin dicapai bersama tim',
      'Evaluasi alternatif perangkat, opsi konektivitas, dan arsitektur sistem',
      'Perancangan konsep awal (proof-of-concept / prototype) secara terarah',
      'Penyusunan rencana tahapan pengembangan jangka panjang yang realistis',
    ],
    deliverables: [
      'Dokumen Pemetaan Kebutuhan & Arsitektur',
      'Rancangan Konsep / Prototype Solusi',
      'Rekomendasi Tahapan Implementasi',
    ],
    idealFor:
      'Perusahaan yang ingin memvalidasi konsep solusi IoT sebelum implementasi skala penuh.',
  },
];

export const ABOUT_CONTENT = {
  eyebrow: 'TENTANG PT INNODESK',
  headingPrefix: 'Mengubah Kebutuhan Teknologi Menjadi ',
  headingHighlight: 'Solusi Terintegrasi',
  overview:
    'PT Innodesk diposisikan sebagai mitra teknologi yang berfokus pada eksplorasi dan pengembangan solusi Internet of Things (IoT) serta integrasi sistem. Kami membantu organisasi menjembatani perangkat fisik di lapangan dengan antarmuka informasi yang terstruktur.',
  secondaryText:
    'Setiap organisasi memiliki karakteristik perangkat dan alur operasional yang berbeda. Oleh karena itu, pendekatan kerja kami selalu dimulai dari pemahaman konteks kebutuhan sebelum merumuskan arsitektur konektivitas maupun tampilan dashboard.',
  principles: [
    'Berangkat dari kebutuhan pengguna.',
    'Mempertimbangkan kompatibilitas sistem.',
    'Mengutamakan keterbacaan data.',
    'Memperhatikan pengembangan jangka panjang.',
  ],
  floatingCard: {
    badge: 'PRINSIP SOLUSI',
    title: 'Pendekatan Terintegrasi',
    subtitle: 'Perangkat · Konektivitas · Sistem',
  },
  ctaLabel: 'Lihat Cara Kerja',
};

export const WORKFLOW_CONTENT = {
  eyebrow: 'CARA KERJA SOLUSI IoT',
  headingPrefix: 'Bagaimana ',
  headingHighlight: 'Solusi IoT Bekerja',
  intro:
    'Gambaran empat tahapan konseptual bagaimana data dari perangkat fisik di lapangan dikumpulkan, diteruskan, diproses, hingga disajikan menjadi informasi yang mudah dipahami.',
  disclaimerNote:
    'Ilustrasi alur konseptual. Implementasi aktual bergantung pada kebutuhan perangkat, konektivitas, dan sistem.',
  stages: [
    {
      id: 'stage-device',
      stepNumber: '01',
      layerBadge: 'Physical Layer',
      title: 'Perangkat & Sensor',
      shortDescription:
        'Perangkat mengukur atau menghasilkan data sesuai kebutuhan implementasi.',
      detailPoints: [
        'Sensor lingkungan, suhu, kelembaban, daya, atau status sakelar perangkat',
        'Akuisisi sinyal fisik pada titik operasional yang relevan',
        'Pemilihan instrumen disesuaikan dengan kondisi lokasi kerja',
      ],
      icon: 'device',
    },
    {
      id: 'stage-gateway',
      stepNumber: '02',
      layerBadge: 'Network Layer',
      title: 'Konektivitas & Gateway',
      shortDescription:
        'Data diteruskan melalui koneksi yang sesuai dengan rancangan sistem.',
      detailPoints: [
        'Pengumpulan data dari node sensor melalui koneksi kabel maupun nirkabel',
        'Peran gateway dalam meneruskan paket data menuju jaringan sistem',
        'Pemilihan protokol komunikasi yang selaras dengan infrastruktur lokasi',
      ],
      icon: 'gateway',
    },
    {
      id: 'stage-processing',
      stepNumber: '03',
      layerBadge: 'Processing Layer',
      title: 'Pemrosesan & Integrasi',
      shortDescription:
        'Data diproses atau dihubungkan dengan platform dan sistem terkait.',
      detailPoints: [
        'Penataan struktur data agar siap diolah dan disimpan secara konsisten',
        'Evaluasi aturan kondisi atau batas ambang parameter yang ditentukan',
        'Pertukaran data melalui API dengan aplikasi atau sistem internal',
      ],
      icon: 'processing',
    },
    {
      id: 'stage-dashboard',
      stepNumber: '04',
      layerBadge: 'Application Layer',
      title: 'Dashboard & Insight',
      shortDescription:
        'Informasi ditampilkan agar pengguna dapat memahami kondisi dan pola data.',
      detailPoints: [
        'Penyajian indikator status perangkat dan grafik parameter secara ringkas',
        'Pemberitahuan kondisi tertentu untuk membantu respons tim operasional',
        'Kemudahan akses informasi bagi pengguna sesuai wewenangnya',
      ],
      icon: 'dashboard',
    },
  ] as WorkflowStageItem[],
};

export const CAPABILITIES_BAND: CapabilityBandItem[] = [
  {
    id: 'cap-device',
    title: 'Integrasi Perangkat',
    subtitle: 'Sensor, node & gateway',
    icon: 'device',
  },
  {
    id: 'cap-architecture',
    title: 'Arsitektur Sistem',
    subtitle: 'Alur data & konektivitas',
    icon: 'architecture',
  },
  {
    id: 'cap-visualization',
    title: 'Visualisasi Data',
    subtitle: 'Dashboard & keterbacaan insight',
    icon: 'visualization',
  },
  {
    id: 'cap-planning',
    title: 'Perencanaan Implementasi',
    subtitle: 'Pemetaan kebutuhan bertahap',
    icon: 'planning',
  },
];

export const SOLUTIONS_CONTENT = {
  eyebrow: 'SOLUSI & KONSEP',
  headingPrefix: 'Eksplorasi Solusi dan ',
  headingHighlight: 'Konsep IoT',
  intro: 'Lihat contoh area penerapan yang dapat dieksplorasi sesuai kebutuhan organisasi.',
};

export const PORTFOLIO_CONCEPTS: PortfolioConceptItem[] = [
  {
    id: 'pemantauan-kondisi-perangkat',
    title: 'Pemantauan Kondisi Perangkat',
    category: 'Ilustrasi Konsep',
    conceptBadge: 'Ilustrasi Konsep · Device Status',
    thumbType: 'monitoring',
    shortSummary:
      'Contoh konsep untuk melihat status perangkat terhubung serta parameter pengukuran terpilih secara terpusat.',
    fullExplanation:
      'Konsep ini mengilustrasikan bagaimana sejumlah unit perangkat atau sensor pada suatu fasilitas dapat dipantau status konektivitas serta nilai pengukurannya melalui satu tampilan ringkas.',
    architectureHighlights: [
      'Indikator status koneksi perangkat dan pembacaan parameter berkala',
      'Penanda visual apabila nilai pembacaan melewati batas yang ditentukan',
      'Ringkasan riwayat waktu pencatatan untuk memudahkan pemeriksaan rutin',
    ],
    tags: ['Sensor', 'Status Perangkat', 'Monitoring'],
    disclaimer:
      'Catatan: Kartu ini adalah ilustrasi konsep untuk menjelaskan contoh rancangan solusi, bukan proyek klien yang diklaim telah selesai.',
  },
  {
    id: 'dashboard-data-operasional',
    title: 'Dashboard Data Operasional',
    category: 'Ilustrasi Konsep',
    conceptBadge: 'Ilustrasi Konsep · Operational UI',
    thumbType: 'dashboard',
    shortSummary:
      'Contoh konsep pengorganisasian indikator operasional ke dalam antarmuka web yang rapi dan mudah dibaca.',
    fullExplanation:
      'Konsep ini menggambarkan penataan berbagai indikator data operasional ke dalam panel-panel visual yang terstruktur, sehingga tim dapat memahami tren dan ringkasan kondisi dengan cepat.',
    architectureHighlights: [
      'Pengelompokan metrik berdasarkan area atau kategori perangkat',
      'Grafik perbandingan waktu untuk mengamati pola perubahan data',
      'Tampilan responsif yang nyaman diakses melalui komputer maupun tablet',
    ],
    tags: ['Dashboard', 'Visualisasi Data', 'Insight'],
    disclaimer:
      'Catatan: Kartu ini adalah ilustrasi konsep antarmuka pengguna, bukan data telemetri langsung dari instalasi lapangan.',
  },
  {
    id: 'integrasi-sensor-dan-platform',
    title: 'Integrasi Sensor dan Platform',
    category: 'Ilustrasi Konsep',
    conceptBadge: 'Ilustrasi Konsep · Data Pipeline',
    thumbType: 'integration',
    shortSummary:
      'Contoh konsep alur pengiriman data dari sensor lapangan menuju platform perangkat lunak yang saling terhubung.',
    fullExplanation:
      'Konsep ini memperlihatkan bagaimana data yang dihasilkan oleh perangkat sensor dapat diteruskan melalui gateway dan diintegrasikan ke dalam aplikasi atau sistem informasi organisasi.',
    architectureHighlights: [
      'Alur pengiriman data terstruktur dari perangkat menuju gateway',
      'Penyelarasan format data melalui API agar kompatibel dengan platform tujuan',
      'Desain modular yang mendukung penambahan titik sensor secara bertahap',
    ],
    tags: ['Sensor', 'Gateway', 'Integrasi'],
    disclaimer:
      'Catatan: Kartu ini adalah ilustrasi konsep arsitektur integrasi, bukan klaim implementasi pada pelanggan tertentu.',
  },
];

export const WHY_CHOOSE_CONTENT = {
  eyebrow: 'PRINSIP KERJA KAMI',
  headingPrefix: 'Pendekatan yang Berangkat dari ',
  headingHighlight: 'Kebutuhan',
  intro:
    'Kami menyusun setiap rancangan solusi dengan mengutamakan kejelasan fungsi, kecocokan integrasi, dan kemudahan pengembangan di masa depan.',
  items: [
    {
      id: 'why-context',
      title: 'Memahami konteks terlebih dahulu',
      description:
        'Memperjelas permasalahan operasional dan kondisi di lapangan sebelum memilih pendekatan perangkat maupun teknis.',
      icon: 'context',
    },
    {
      id: 'why-integration',
      title: 'Mempertimbangkan integrasi',
      description:
        'Merancang bagaimana perangkat baru dan sistem yang sudah berjalan dapat saling bertukar informasi secara selaras.',
      icon: 'integration',
    },
    {
      id: 'why-clarity',
      title: 'Menyajikan informasi dengan jelas',
      description:
        'Merencanakan penyajian data pada antarmuka dashboard berdasarkan kebutuhan pembacaan dan keputusan pengguna.',
      icon: 'clarity',
    },
    {
      id: 'why-scalability',
      title: 'Memikirkan pengembangan berikutnya',
      description:
        'Memperhatikan kemudahan pemeliharaan sistem serta kesiapan arsitektur untuk perluasan fungsi ke depan.',
      icon: 'scalability',
    },
  ] as WhyChooseItem[],
};

export const CONTACT_SECTION_CONTENT = {
  ctaStrip: {
    heading: 'Punya Ide atau Kebutuhan IoT?',
    subtext:
      'Mari diskusikan kebutuhan perangkat, integrasi, atau konsep solusi yang ingin Anda kembangkan.',
    primaryButton: 'Diskusikan Proyek',
    secondaryButton: 'Lihat Cara Kerja',
  },
  formSection: {
    eyebrow: 'KONSULTASI & DISKUSI',
    headingPrefix: 'Sampaikan Kebutuhan ',
    headingHighlight: 'Solusi IoT Anda',
    intro:
      'Gunakan formulir di bawah ini untuk mendiskusikan rencana integrasi perangkat, konsep sistem monitoring, atau kebutuhan pengembangan dashboard.',
    demoNotice:
      'Formulir berhasil divalidasi. Mode demo ini belum mengirim data ke PT Innodesk.',
  },
};
