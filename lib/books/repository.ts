import { slugify } from "../validation/slug";
import { validateBookInput, validateBookUpdateInput } from "../validation/book";
import { normalizePage } from "./pagination";
import { mapRow, KOLOM_BUKU } from "./types";
import type { Book, BookStatus, Page, WriteResult } from "./types";

export { normalizePage } from "./pagination";
export { mapRow, KOLOM_BUKU } from "./types";
export type { Book, BookStatus, Page, WriteResult } from "./types";

const PAGE_SIZE_BAWAAN = 12;

/**
 * Data contoh buku in-memory untuk mode front-end tanpa database MySQL.
 */
const SAMPLE_BOOKS: Book[] = [
  {
    id: "cmm-buku-01",
    title: "Metodologi Penelitian Kualitatif & Kuantitatif",
    slug: "metodologi-penelitian-kualitatif-kuantitatif",
    author: "Dr. H. Rahmat Hidayat, M.Pd.",
    synopsis:
      "Panduan komprehensif metodologi penelitian untuk mahasiswa, dosen, dan peneliti dalam merancang dan menyusun karya ilmiah bermutu tinggi.",
    publisherInfo: "CV Cipta Manuskrip Media",
    bookInfo: "Cetakan I, 2024. 240 hlm. 15,5 x 23 cm.",
    coverPath: "covers/buku-01.webp",
    status: "published",
    estimatedRelease: null,
    isbn: "978-623-00-1234-5",
    pricePrint: 85000,
    priceEbook: 45000,
    createdAt: new Date("2024-01-15T08:00:00Z"),
    updatedAt: new Date("2024-01-15T08:00:00Z"),
  },
  {
    id: "cmm-buku-02",
    title: "Pengantar Tata Kelola & Kebijakan Publik",
    slug: "pengantar-tata-kelola-kebijakan-publik",
    author: "Prof. Dr. Siti Aminah, M.Si.",
    synopsis:
      "Analisis komparatif mengenai dinamika perumusan, implementasi, dan evaluasi kebijakan publik di tengah akselerasi transformasi digital.",
    publisherInfo: "CV Cipta Manuskrip Media",
    bookInfo: "Cetakan I, 2024. 280 hlm. 15,5 x 23 cm.",
    coverPath: "covers/buku-02.webp",
    status: "published",
    estimatedRelease: null,
    isbn: "978-623-00-1235-2",
    pricePrint: 95000,
    priceEbook: 50000,
    createdAt: new Date("2024-02-10T08:00:00Z"),
    updatedAt: new Date("2024-02-10T08:00:00Z"),
  },
  {
    id: "cmm-buku-03",
    title: "Manajemen Inovasi dan Kewirausahaan Digital",
    slug: "manajemen-inovasi-dan-kewirausahaan-digital",
    author: "Budi Santoso, S.E., M.M.",
    synopsis:
      "Strategi praktis membangun dan mengembangkan keunggulan bersaing bagi startup dan pelaku usaha kreatif di era disrupsi.",
    publisherInfo: "CV Cipta Manuskrip Media",
    bookInfo: "Cetakan I, 2024. 210 hlm. 14,8 x 21 cm.",
    coverPath: "covers/buku-03.webp",
    status: "published",
    estimatedRelease: null,
    isbn: "978-623-00-1236-9",
    pricePrint: 78000,
    priceEbook: 40000,
    createdAt: new Date("2024-03-05T08:00:00Z"),
    updatedAt: new Date("2024-03-05T08:00:00Z"),
  },
  {
    id: "cmm-buku-04",
    title: "Komunikasi Interpersonal dalam Praktik Pendidikan",
    slug: "komunikasi-interpersonal-dalam-praktik-pendidikan",
    author: "Dra. Nurul Hidayati, M.I.Kom.",
    synopsis:
      "Kupas tuntas pola relasi komunikatif antara pendidik dan peserta didik guna menciptakan lingkungan belajar inklusif dan kolaboratif.",
    publisherInfo: "CV Cipta Manuskrip Media",
    bookInfo: "Cetakan I, 2024. 195 hlm. 14,8 x 21 cm.",
    coverPath: "covers/buku-04.webp",
    status: "published",
    estimatedRelease: null,
    isbn: "978-623-00-1237-6",
    pricePrint: 72000,
    priceEbook: 38000,
    createdAt: new Date("2024-04-12T08:00:00Z"),
    updatedAt: new Date("2024-04-12T08:00:00Z"),
  },
  {
    id: "cmm-buku-05",
    title: "Statistika Terapan untuk Sains dan Sosial",
    slug: "statistika-terapan-untuk-sains-dan-sosial",
    author: "Dr. Ahmad Fauzi, M.Sc.",
    synopsis:
      "Pengantar analisis data kuantitatif mulai dari uji beda rata-rata hingga regresi multivariat dengan aplikasi komputer.",
    publisherInfo: "CV Cipta Manuskrip Media",
    bookInfo: "Sedang dalam proses tata letak dan pengajuan ISBN.",
    coverPath: "covers/buku-05.webp",
    status: "upcoming",
    estimatedRelease: "Desember 2024",
    isbn: null,
    pricePrint: null,
    priceEbook: null,
    createdAt: new Date("2024-05-01T08:00:00Z"),
    updatedAt: new Date("2024-05-01T08:00:00Z"),
  },
  {
    id: "cmm-buku-06",
    title: "Hukum Bisnis dan Perlindungan Konsumen",
    slug: "hukum-bisnis-dan-perlindungan-konsumen",
    author: "Dr. Hendra Wijaya, S.H., M.H.",
    synopsis:
      "Aspek-aspek yuridis transaksi niaga elektronik dan jaminan kepastian hukum bagi pelaku usaha serta konsumen.",
    publisherInfo: "CV Cipta Manuskrip Media",
    bookInfo: "Sedang dalam proses penyuntingan naskah.",
    coverPath: "covers/buku-06.webp",
    status: "upcoming",
    estimatedRelease: "Januari 2025",
    isbn: null,
    pricePrint: null,
    priceEbook: null,
    createdAt: new Date("2024-05-15T08:00:00Z"),
    updatedAt: new Date("2024-05-15T08:00:00Z"),
  },
];

let booksStore: Book[] = [...SAMPLE_BOOKS];

export function pageSizeBawaan(): number {
  const mentah = process.env.BOOKS_PER_PAGE;
  if (mentah === undefined || mentah.trim() === "") return PAGE_SIZE_BAWAAN;

  const angka = Number(mentah);
  if (!Number.isInteger(angka) || angka < 1) return PAGE_SIZE_BAWAAN;

  return angka;
}

function pageSizeDipakai(diminta: number | undefined): number {
  if (diminta === undefined) return pageSizeBawaan();
  if (!Number.isInteger(diminta) || diminta < 1) return pageSizeBawaan();
  return diminta;
}

function jadikanHalaman(
  items: Book[],
  total: number,
  page: number,
  pageSize: number
): Page<Book> {
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

/**
 * Daftar buku satu status, terurut A–Z, satu halaman.
 */
export async function listBooks(opts: {
  status: BookStatus;
  page?: number;
  pageSize?: number;
}): Promise<Page<Book>> {
  const { status } = opts;
  const pageSize = pageSizeDipakai(opts.pageSize);

  const disaring = booksStore
    .filter((b) => b.status === status)
    .sort((a, b) => a.title.localeCompare(b.title, "id"));

  const total = disaring.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = normalizePage(opts.page, totalPages);

  const offset = (page - 1) * pageSize;
  const items = disaring.slice(offset, offset + pageSize);

  return jadikanHalaman(items, total, page, pageSize);
}

/**
 * Seluruh buku, kedua status, untuk sitemap.
 */
export async function listBooksForSitemap(): Promise<Book[]> {
  return [...booksStore].sort((a, b) => a.title.localeCompare(b.title, "id"));
}

/**
 * Seluruh buku, kedua status, untuk daftar admin.
 */
export async function listAllBooks(
  opts: {
    page?: number;
    pageSize?: number;
  } = {}
): Promise<Page<Book>> {
  const pageSize = pageSizeDipakai(opts.pageSize);

  const diurut = [...booksStore].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  const total = diurut.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = normalizePage(opts.page, totalPages);

  const offset = (page - 1) * pageSize;
  const items = diurut.slice(offset, offset + pageSize);

  return jadikanHalaman(items, total, page, pageSize);
}

/**
 * Jumlah buku per status, untuk ringkasan dashboard.
 */
export async function countBooksByStatus(): Promise<Record<BookStatus, number>> {
  const hasil: Record<BookStatus, number> = { published: 0, upcoming: 0 };
  for (const b of booksStore) {
    hasil[b.status] = (hasil[b.status] ?? 0) + 1;
  }
  return hasil;
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const buku = booksStore.find((b) => b.slug === slug);
  return buku ?? null;
}

export async function getBookById(id: string): Promise<Book | null> {
  const buku = booksStore.find((b) => b.id === id);
  return buku ?? null;
}

/**
 * Menyimpan buku baru (in-memory).
 */
export async function createBook(input: unknown): Promise<WriteResult> {
  const divalidasi = validateBookInput(input);
  if (!divalidasi.ok) return { ok: false, errors: divalidasi.errors };

  const value = divalidasi.value;
  const slug = slugify(value.title);

  if (slug === "") {
    return {
      ok: false,
      errors: {
        title: "Judul harus memuat huruf atau angka agar alamat halamannya bisa dibentuk.",
      },
    };
  }

  if (booksStore.some((b) => b.slug === slug)) {
    return { ok: false, errors: { slug: "Slug sudah dipakai buku lain." } };
  }

  const now = new Date();
  const bukuBaru: Book = {
    id: `cmm-buku-${Date.now()}`,
    title: value.title,
    slug,
    author: value.author,
    synopsis: value.synopsis,
    publisherInfo: value.publisherInfo,
    bookInfo: value.bookInfo,
    coverPath: value.coverPath,
    status: value.status,
    estimatedRelease: value.estimatedRelease,
    isbn: value.isbn,
    pricePrint: value.pricePrint,
    priceEbook: value.priceEbook,
    createdAt: now,
    updatedAt: now,
  };

  booksStore.unshift(bukuBaru);
  return { ok: true, book: bukuBaru };
}

/**
 * Memperbarui buku yang ada (in-memory).
 */
export async function updateBook(id: string, input: unknown): Promise<WriteResult> {
  const divalidasi = validateBookUpdateInput(input);
  if (!divalidasi.ok) return { ok: false, errors: divalidasi.errors };

  const value = divalidasi.value;
  const index = booksStore.findIndex((b) => b.id === id);
  if (index === -1) {
    return { ok: false, errors: { form: "Buku tidak ditemukan." } };
  }

  const adaSlugLain = booksStore.some(
    (b) => b.slug === value.slug && b.id !== id
  );
  if (adaSlugLain) {
    return { ok: false, errors: { slug: "Slug sudah dipakai buku lain." } };
  }

  const bukuLama = booksStore[index];
  const bukuBaru: Book = {
    ...bukuLama,
    title: value.title,
    slug: value.slug,
    author: value.author,
    synopsis: value.synopsis,
    publisherInfo: value.publisherInfo,
    bookInfo: value.bookInfo,
    coverPath: value.coverPath,
    status: value.status,
    estimatedRelease: value.estimatedRelease,
    isbn: value.isbn,
    pricePrint: value.pricePrint,
    priceEbook: value.priceEbook,
    updatedAt: new Date(),
  };

  booksStore[index] = bukuBaru;
  return { ok: true, book: bukuBaru };
}

export async function deleteBook(id: string): Promise<{ ok: boolean }> {
  const sebelum = booksStore.length;
  booksStore = booksStore.filter((b) => b.id !== id);
  return { ok: booksStore.length < sebelum };
}
