/* eslint-disable @next/next/no-img-element -- banner foto lokal statis di public/aset/, src langsung dipakai agar mudah ditimpa klien. */
import { ArrowLeft, ArrowUpRight, FileUp, Landmark, Network, Orbit } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { KATEGORI_JURNAL } from "@/content/site";
import { buildJournalSubmitUrl } from "@/lib/whatsapp";
import { LogoKategoriJurnal } from "@/components/LogoKategoriJurnal";

/** Judul tab halaman pengiriman naskah jurnal. */
export const metadata: Metadata = {
  title: "Kirim Artikel Jurnal",
  description:
    "Pilih kategori jurnal tujuan, lalu kirimkan naskah Anda langsung ke admin lewat WhatsApp.",
};

const IKON_KATEGORI = [Landmark, Orbit, Network] as const;

/** Naskah dikirim langsung melalui WhatsApp; tidak diunggah ke server. */
export default function Page() {
  return (
    <div className="journal-page journal-flow-page">
      <section className="journal-flow-hero journal-flow-hero--banner">
        <div className="journal-flow-banner">
          <img
            src="/aset/kirim-artikel.jpg"
            width={1200}
            height={800}
            alt="Akademik Indonesia tersenyum percaya diri memegang berkas naskah di meja kayu dengan laptop dan ponsel, cahaya siang hangat."
          />
        </div>
        <Link className="journal-back-link" href="/publish-jurnal"><ArrowLeft size={15} /> Kembali ke Publish Jurnal</Link>
        <p className="journal-kicker"><span className="journal-kicker-line" /> KIRIM ARTIKEL</p>
        <h1>Kirim Artikel Jurnal Anda.</h1>
        <p className="journal-hero-description">Pilih kategori jurnal tujuan, lalu kirimkan naskah Anda langsung ke admin lewat WhatsApp.</p>
        <div className="journal-flow-meta"><span><FileUp size={16} /> Naskah dikirim lewat WhatsApp</span><span className="meta-divider" /><span>3 kategori jurnal</span></div>
      </section>

      <section className="journal-category-section">
        <div className="journal-section-heading">
          <div><p className="journal-section-kicker">PILIH TUJUAN</p><h2>Kategori jurnal</h2></div>
          <p>Pilih kategori yang sesuai dengan tujuan publikasi Anda.</p>
        </div>
        <ol className="journal-category-grid">
          {KATEGORI_JURNAL.map((kategori, i) => {
            const IkonKategori = IKON_KATEGORI[i];
            return (
              <li key={kategori} className={`journal-category-card journal-category-${i + 1}`}>
                <div className="category-card-top"><span>0{i + 1} <i>/ 03</i></span><span className="category-card-icon"><IkonKategori size={18} strokeWidth={1.7} /></span></div>
                <h2>{kategori}</h2>
                <LogoKategoriJurnal indeks={i} />
                <div className="category-card-bottom"><span>PILIHAN KATEGORI</span><span className="category-arrow">↗</span></div>
                <a href={buildJournalSubmitUrl(kategori)} target="_blank" rel="noopener noreferrer" className="journal-category-cta">
                  Kirim naskah via WhatsApp <ArrowUpRight size={16} />
                </a>
              </li>
            );
          })}
        </ol>
        <p className="journal-privacy-note"><span aria-hidden="true">i</span> Naskah dikirim langsung melalui WhatsApp, bukan diunggah ke situs.</p>
      </section>
    </div>
  );
}
