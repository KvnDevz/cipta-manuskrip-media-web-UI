/* eslint-disable @next/next/no-img-element -- banner foto lokal statis di public/aset/, src langsung dipakai agar mudah ditimpa klien. */
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText, PenLine } from "lucide-react";
import { KATEGORI_JURNAL } from "@/content/site";
import type { Metadata } from "next";
import { FormAsistensi } from "@/components/FormAsistensi";
import { LogoKategoriJurnal } from "@/components/LogoKategoriJurnal";

/** Judul tab halaman asistensi. */
export const metadata: Metadata = {
  title: "Asistensi Penulisan Artikel Jurnal",
  description:
    "Tuliskan topik penelitian, kami bantu asistensi sampai jadi artikel ilmiah berkualitas.",
};

/** Topik hanya pernah masuk ke teks WhatsApp; tidak disimpan ke database. */
export default function Page() {
  return (
    <div className="journal-page journal-flow-page journal-assist-page">
      <section className="journal-flow-hero journal-assist-hero journal-flow-hero--banner">
        <div className="journal-flow-banner">
          <img
            src="/aset/asistensi-jurnal.jpg"
            width={763}
            height={426}
            alt="Dua peneliti perempuan Indonesia berdiskusi di depan laptop mengenai bantuan penyusunan artikel penelitian dari topik."
          />
        </div>
        <Link className="journal-back-link" href="/publish-jurnal"><ArrowLeft size={15} /> Kembali ke Publish Jurnal</Link>
        <p className="journal-kicker"><span className="journal-kicker-line" /> ASISTENSI PENULISAN</p>
        <h1>Publikasi Jurnal Ilmiah, Hanya Perlu Mention Topik</h1>
        <p className="journal-hero-description">Tuliskan topik penelitian, kami bantu asistensi sampai jadi artikel ilmiah berkualitas</p>
      </section>

      <section className="journal-assist-workspace">
        <div className="journal-assist-info">
          <div className="journal-assist-label"><FileText size={16} /> KATEGORI JURNAL</div>
          <h2>Pilih Tujuan Jurnal Sesuai Kebutuhan</h2>
          <p>Tiga kategori jurnal yang tersedia pada layanan ini.</p>
          <ol className="journal-assist-categories">
            {KATEGORI_JURNAL.map((kategori, i) => (
              <li key={kategori} className="journal-assist-category">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div><strong>{kategori}</strong><LogoKategoriJurnal indeks={i} ringkas /></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="journal-assist-right">
          <div className="journal-assist-form-panel">
            <div className="journal-form-heading"><span className="journal-form-icon"><PenLine size={18} /></span><div><p>LANGKAH TERAKHIR</p><h2>Belum ada artikel? Tak masalah</h2></div></div>
            <FormAsistensi jenis="jurnal" />
          </div>
          <div className="journal-return-link"><Link href="/publish-jurnal/kirim-artikel">Sudah memiliki artikel? Kirim artikel <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>
    </div>
  );
}
