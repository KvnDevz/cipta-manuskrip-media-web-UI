/**
 * Sumber satu-satunya teks statis situs publik — nav, footer, kontak,
 * paket buku, dan daftar jurnal. Saat UI dirakit ulang di Arena cukup
 * mengimpor dari sini, jadi tidak ada teks yang tersalin dobel atau
 * berbeda antarhalaman.
 *
 * Placeholder dalam kurung siku tetap menandai materi klien yang belum ada.
 * PAKET_BUKU saat ini pengecualian eksperimental: tier dan harga simulasi,
 * dibuat atas izin pemilik proyek dan bukan penawaran resmi. Ganti dengan
 * paket klien yang disetujui sebelum rilis produksi (docs/DESIGN-STACK.md §8).
 *
 * Teks yang dikunci brief (nomor WhatsApp format tampil, 13 fasilitas,
 * kategori jurnal dengan en dash `–`) diperiksa di `site.test.ts`, jadi
 * tidak berubah tanpa sengaja saat UI dirombak.
 */

/**
 * Navigasi utama di tengah header.
 *
 * Arahan terbaru klien: navbar cukup dua menu — `Beranda` di tengah dan
 * `Tentang Kami` di kanan. Tautan layanan dan katalog tetap tersedia lewat
 * footer serta kartu di beranda, jadi pengunjung tidak kehilangan akses.
 * Ukuran huruf sengaja dibesarkan karena audiens utamanya dosen senior.
 */
export const NAV_UTAMA: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Beranda", href: "/" },
];

/**
 * Slot kanan header. Kontrak Tahap 1 mengganti tombol CTA "Mulai berkarya"
 * dengan tautan menu biasa tanpa pill dan tanpa ikon panah.
 */
export const NAV_KANAN: Readonly<{ label: string; href: string }> = {
  label: "Tentang Kami",
  href: "/tentang-kami",
};

/**
 * Menu LAYANAN di footer (kontrak Tahap 1 §1.2). Asistensi dipecah menjadi
 * dua tautan eksplisit, masing-masing langsung menuju formulirnya:
 * buku ke jangkar `#asistensi` di halaman Publish Buku, artikel jurnal ke
 * halaman asistensi jurnal. Tidak ada lagi tautan umum "Asistensi penulisan".
 */
export const TAUTAN_LAYANAN: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Publish Buku", href: "/publish-buku" },
  { label: "Publish Jurnal", href: "/publish-jurnal" },
  { label: "Asistensi penulisan buku", href: "/publish-buku#asistensi" },
  { label: "Asistensi penulisan artikel jurnal", href: "/publish-jurnal/asistensi" },
];

/**
 * Nomor tampil (bukan nomor wa.me) yang ditetapkan brief §10. Nomor
 * wa.me yang sama ada terpisah di `lib/whatsapp.ts`, dalam bentuk
 * internasional — kalau klien mengganti nomornya, keduanya wajib
 * diganti bersama.
 */
export const KONTAK: { adminBuku: string; adminJurnal: string } = {
  adminBuku: "0896-7189-4900",
  adminJurnal: "0895-6292-03142",
};

/**
 * Akun media sosial resmi yang dikirim klien untuk section "Medsos" di
 * halaman Tentang Kami. Handle dan alamat surel disalin persis dari materi
 * klien; tidak ada akun yang dikarang.
 *
 * Catatan: materi klien menyebut halaman Facebook sebagai "Penerbit Cipta
 * Manuskrip" tanpa menuliskan URL-nya, jadi URL di bawah memakai pola handle
 * yang sama dengan akun lain dan perlu dikonfirmasi klien sebelum rilis.
 */
export const MEDIA_SOSIAL: ReadonlyArray<{
  jenis: "facebook" | "threads" | "tiktok" | "instagram" | "gmail";
  label: string;
  nilai: string;
  href: string;
}> = [
  {
    jenis: "facebook",
    label: "Facebook",
    nilai: "Penerbit Cipta Manuskrip",
    href: "https://www.facebook.com/ciptamanuskripmedia",
  },
  {
    jenis: "threads",
    label: "Threads",
    nilai: "@ciptamanuskripmedia",
    href: "https://www.threads.net/@ciptamanuskripmedia",
  },
  {
    jenis: "tiktok",
    label: "TikTok",
    nilai: "@ciptamanuskripmedia",
    href: "https://www.tiktok.com/@ciptamanuskripmedia",
  },
  {
    jenis: "instagram",
    label: "Instagram",
    nilai: "@ciptamanuskripmedia",
    href: "https://www.instagram.com/ciptamanuskripmedia/",
  },
  {
    jenis: "gmail",
    label: "Gmail",
    nilai: "ciptamanuskripmedia@gmail.com",
    href: "mailto:ciptamanuskripmedia@gmail.com",
  },
];

/**
 * Tiga tier contoh untuk prototipe visual, tertinggi ke terendah.
 * Nama, harga, dan fasilitas ini dikarang atas persetujuan pemilik proyek
 * (21 Oktober 2026) dan BUKAN penawaran resmi. Ganti setelah klien
 * mengirim paket dan harga final.
 */
export const PAKET_BUKU: ReadonlyArray<{
  nama: string;
  harga: string;
  fasilitas: readonly string[];
}> = [
  {
    nama: "Paket Eksklusif",
    harga: "Rp7.500.000",
    fasilitas: [
      "Penyuntingan naskah",
      "Proofreading akhir",
      "Desain sampul dan tata letak isi",
      "Pendampingan proses ISBN",
      "10 buku cetak",
    ],
  },
  {
    nama: "Paket Profesional",
    harga: "Rp4.500.000",
    fasilitas: [
      "Proofreading akhir",
      "Desain sampul dan tata letak isi",
      "Pendampingan proses ISBN",
      "5 buku cetak",
    ],
  },
  {
    nama: "Paket Dasar",
    harga: "Rp2.500.000",
    fasilitas: [
      "Tata letak isi buku",
      "Desain sampul buku",
      "Pendampingan proses ISBN",
    ],
  },
];

/**
 * 13 fasilitas jurnal persis dari brief §10 — urutan dan ejaannya
 * terkunci oleh tes; halaman jurnal tidak boleh menambah janji lain
 * (statistik, jumlah terbit, dan sebagainya).
 */
export const FASILITAS_JURNAL: readonly string[] = [
  "LOA Cepat",
  "DOI Aktif",
  "Dokumentasi Korespondensi Lengkap",
  "Review Transparan",
  "Jurnal Non-Predator",
  "Revisi Minor–Mayor",
  "Turnitin",
  "Konversi Skripsi/Tesis/Disertasi",
  "Penerjemahan Artikel",
  "Proofreading",
  "Layout",
  "Template Artikel",
  "Garansi Terbit",
];

/** Tepat tiga kategori; en dash pada `SINTA 1–4` persis dari brief. */
export const KATEGORI_JURNAL: readonly string[] = [
  "Jurnal Nasional Terakreditasi SINTA 1–4 dan GARUDA",
  "Jurnal Internasional Index Copernicus & CrossRef",
  "Jurnal Internasional Scopus dan SCImago",
];

/**
 * Batas preview katalog di `/publish-buku` — kedua preview (published
 * dan upcoming) memakai nilai yang ini, bukan memotong keduanya
 * sendiri.
 */
export const PREVIEW_LIMIT: number = 3;

/**
 * Slot logo indeks & pengakuan untuk marquee di bawah hero beranda.
 */
export const MARQUEE_SINTA: ReadonlyArray<{
  id: string;
  label: string;
  sublabel: string;
  src: string;
  alt: string;
}> = [
  {
    id: "sinta-1",
    label: "SINTA 1",
    sublabel: "Jurnal Nasional Bereputasi",
    src: "/logo/logo%20sinta%201.png",
    alt: "Logo SINTA 1",
  },
  {
    id: "sinta-2",
    label: "SINTA 2",
    sublabel: "Jurnal Nasional Unggulan",
    src: "/logo/logo%20sinta%202.png",
    alt: "Logo SINTA 2",
  },
  {
    id: "sinta-3",
    label: "SINTA 3",
    sublabel: "Jurnal Ilmiah Terakreditasi",
    src: "/logo/logo%20sinta%203.png",
    alt: "Logo SINTA 3",
  },
  {
    id: "sinta-4",
    label: "SINTA 4",
    sublabel: "Standar Akreditasi Nasional",
    src: "/logo/sinta%204%20logo.jpg",
    alt: "Logo SINTA 4",
  },
  {
    id: "scimago",
    label: "Scimago",
    sublabel: "Pemeringkatan Kuartil Q1–Q4",
    src: "/logo/logo%20schimago.png",
    alt: "Logo Scimago",
  },
  {
    id: "scopus",
    label: "Scopus",
    sublabel: "Indeksasi Bereputasi Global",
    src: "/logo/logo%20scopus.webp",
    alt: "Logo Scopus",
  },
  {
    id: "copernicus",
    label: "Copernicus",
    sublabel: "Basis Data Internasional",
    src: "/logo/logo%20copernicus.jpg",
    alt: "Logo Index Copernicus",
  },
  {
    id: "garuda",
    label: "Garuda",
    sublabel: "Garba Rujukan Digital",
    src: "/logo/logo%20garuda.png",
    alt: "Logo Garuda",
  },
  {
    id: "crossref",
    label: "Crossref",
    sublabel: "Registrasi DOI Resmi",
    src: "/logo/logo%20crossref.png",
    alt: "Logo Crossref",
  },
];

/**
 * Section 6.1 — nilai tampil standar untuk empat spesifikasi buku.
 *
 * Nilai ini DITAMPILKAN sebagai default, bukan disimpan ke database: skema
 * `books` belum punya kolomnya dan brief melarang perubahan DB. Begitu admin
 * menyediakan data per buku, `BookDetail` otomatis memakai field opsional
 * `formatBuku` / `jenisBuku` / `bahasa` / `ukuranBuku` bila tersedia.
 * Berlaku untuk buku terbit MAUPUN segera terbit.
 */
export const SPESIFIKASI_BUKU = {
  format: "Buku Cetak & E-Book",
  jenis: "Nonfiksi",
  bahasa: "Bahasa Indonesia",
  ukuran: "UNESCO 15.5 x 23 cm",
} as const;

/** Jenis visual pendukung pada kartu pilar kepercayaan. */
export type JenisVisualPilar = "legalitas" | "isbn" | "naskah" | "distribusi";

/**
 * Empat pilar kepercayaan pada /publish-buku, setelah section asistensi.
 * Teks judul & deskripsi mengikuti brief kata per kata.
 *
 * `jenisVisual` menentukan ilustrasi kartu. Dua entri pertama masih
 * PLACEHOLDER: logo resmi Kemenkumham, Perpusnas RI, dan barcode ISBN
 * belum dikirim klien, jadi jangan dibuat-buat.
 */
export const PILAR_KEPERCAYAAN: ReadonlyArray<{
  id: string;
  nomor: string;
  judul: string;
  deskripsi: string;
  jenisVisual: JenisVisualPilar;
}> = [
  {
    id: "legalitas",
    nomor: "01",
    judul: "Legalitas Resmi",
    deskripsi:
      "CV Cipta Manuskrip Media telah resmi berbadan hukum dengan kegiatan usaha penerbitan buku dan jurnal ilmiah.",
    jenisVisual: "legalitas",
  },
  {
    id: "isbn",
    nomor: "02",
    judul: "ISBN Resmi",
    deskripsi:
      "Setiap buku memiliki nomor ISBN dari Perpustakaan Nasional yang bisa divalidasi di website resmi Perpusnas.",
    jenisVisual: "isbn",
  },
  {
    id: "naskah",
    nomor: "03",
    judul: "Tidak Harus Ada Naskah di Awal",
    deskripsi:
      "Belum ada naskah buku? Tak masalah. Tim kami siap bantu asistensi penulisan buku kamu. Fiksi ataupun Nonfiksi.",
    jenisVisual: "naskah",
  },
  {
    id: "distribusi",
    nomor: "04",
    judul: "Distribusi Beragam",
    deskripsi:
      "Buku kamu tak hanya dijual secara cetak, tapi bisa disewa secara online juga.",
    jenisVisual: "distribusi",
  },
];
