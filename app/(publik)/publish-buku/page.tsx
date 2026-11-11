/* eslint-disable @next/next/no-img-element -- foto lokal statis di public/aset/,
   sudah dioptimasi ke JPEG; src langsung dipakai agar preview & tes visual
   tidak bergantung pada image optimizer Next (pola sama dengan HeroPhotoCard). */
import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, BookOpen, PenLine, ServerCrash } from "lucide-react";
import { listBooks } from "@/lib/books/repository";
import { catalogueKind } from "@/lib/books/status";
import { CataloguePreview } from "@/components/CataloguePreview";
import { FormAsistensi } from "@/components/FormAsistensi";
import { PackagePicker } from "@/components/PackagePicker";
import { PackageSelectionStatus } from "@/components/PackageSelectionStatus";
import { TrustPillars } from "@/components/TrustPillars";
import { PAKET_BUKU, PREVIEW_LIMIT } from "@/content/site";

// Wajib: halaman membaca database. Tanpa ini Next.js membekukan hasil query
// saat build dan previewnya tidak melihat buku yang baru ditambahkan admin —
// kelas bug yang sama dengan katalog.
/** Judul tab halaman layanan buku. */
export const metadata: Metadata = {
  title: "Publish Buku",
  description:
    "Layanan penerbitan dan penulisan buku fiksi/nonfiksi. Sekali klik, buku terbit dan terjual.",
};

export const dynamic = "force-dynamic";

/**
 * Halaman layanan publish buku. Data dan aturan bisnis tetap bersumber dari
 * content/site.ts dan komponen yang sudah ada; perubahan di file ini khusus UI.
 * Layout publik memiliki satu-satunya <main>, jadi pembungkusnya <div>.
 */
export default async function Page() {
  const sudahTerbit = catalogueKind("telah-terbit");
  const segeraTerbit = catalogueKind("segera-terbit");

  let hasil: Awaited<ReturnType<typeof duaPreview>> | null;
  try {
    hasil = sudahTerbit === null || segeraTerbit === null ? null : await duaPreview();
  } catch {
    hasil = null;
  }

  return (
    <div className="publish-page">
      <section className="publish-hero">
        <div aria-hidden="true" className="publish-orb publish-orb-one" />
        <div aria-hidden="true" className="publish-orb publish-orb-two" />
        <div className="publish-hero-content">
          <p className="publish-eyebrow"><BookOpen size={14} /> PENERBITAN BUKU</p>
          <h1>Terbit Buku Sekali Klik</h1>
          <p className="publish-lede">
            Layanan penerbitan dan penulisan buku fiksi/nonfiksi<br />
            Sekali klik, buku terbit dan terjual.
          </p>
          <div className="publish-hero-actions">
            <a href="#paket" className="publish-button publish-button-primary">Kirim Naskah <ArrowUpRight size={16} /></a>
            <a href="#asistensi" className="publish-button publish-button-secondary">Asistensi Penulisan <ArrowUpRight size={16} /></a>
          </div>
          <a href="#paket" className="publish-scroll"><span>Lihat pilihan paket</span><ArrowDown size={14} /></a>
        </div>
        <div className="publish-hero-art publish-hero-art--foto">
          <img
            className="publish-hero-foto"
            src="/aset/buku-hero.jpg"
            width={687}
            height={492}
            alt="Penulis muda Indonesia tersenyum menunjukkan ponsel bertanda PUBLISHED, disertai ilustrasi lambang Perpustakaan Nasional dan barcode ISBN."
          />
        </div>
      </section>

      <PackagePicker tiers={PAKET_BUKU} />

      <section id="asistensi" className="assist-section assist-section--foto scroll-mt-24">
        <div className="assist-copy">
          <p className="publish-section-kicker">ASISTENSI PENULISAN NASKAH BUKU</p>
          <h2>Ketik Topik Buku, Naskah Anda Langsung Jadi</h2>
          <p>
            Terbit buku tapi Anda belum ada naskah? Bisa!<br />
            Kami bantu susunkan naskah buku dan jual di website
          </p>
          <div className="assist-note">
            <PenLine size={17} />
            <span>Silakan ketik topik naskah buku yang Anda inginkan. Fiksi/nonfiksi, kami bisa.</span>
          </div>
        </div>
        <div className="assist-media">
          <img
            className="assist-foto"
            src="/aset/asistensi-buku.jpg"
            width={963}
            height={423}
            alt="Dua perempuan Indonesia di meja kayu dengan laptop dan buku catatan terbuka; yang satu bertanya “Belum punya naskah buku?”, yang lain menenangkan sambil menulis, “Tenang, kami bantu mulai dari ide.”"
          />
        </div>
        <div className="assist-form-card"><PackageSelectionStatus /><FormAsistensi jenis="buku" /></div>
      </section>

      {/* Komponen asli dari beranda, dipakai kembali setelah asistensi buku. */}
      <div className="publish-trust">
        <TrustPillars />
      </div>

      <section className="book-preview-section">
        <div className="preview-intro">
          <p className="publish-section-kicker">KATALOG</p>
          <h2>Sebagian buku kami</h2>
          <p>
            Pratinjau singkat dari katalog. Seluruh judul tersedia di halaman katalog,
            terurut A–Z.
          </p>
        </div>

        {sudahTerbit === null || hasil === null ? (
          <div data-testid="db-error" className="preview-error" role="status">
            <span className="preview-error-icon" aria-hidden="true">
              <ServerCrash size={19} strokeWidth={1.6} />
            </span>
            <div>
              <strong>Preview katalog sedang tidak dapat dimuat</strong>
              <p>Silakan coba beberapa saat lagi. Bagian lain halaman ini tetap dapat digunakan.</p>
            </div>
          </div>
        ) : (
          <>
            <div data-testid="preview-telah-terbit">
              <CataloguePreview heading={sudahTerbit.heading} emptyMessage={sudahTerbit.emptyMessage} items={hasil.terbit.items} lihatSemuaHref="/katalog/telah-terbit" />
            </div>
            {segeraTerbit === null ? null : (
              <div data-testid="preview-segera-terbit">
                <CataloguePreview heading={segeraTerbit.heading} emptyMessage={segeraTerbit.emptyMessage} items={hasil.segera.items} lihatSemuaHref="/katalog/segera-terbit" />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

async function duaPreview() {
  const sudah = await listBooks({ status: "published", page: 1, pageSize: PREVIEW_LIMIT });
  const akan = await listBooks({ status: "upcoming", page: 1, pageSize: PREVIEW_LIMIT });
  return { terbit: sudah, segera: akan };
}
