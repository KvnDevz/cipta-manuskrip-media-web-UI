/* eslint-disable @next/next/no-img-element -- banner foto lokal statis di public/aset/, src langsung dipakai agar mudah ditimpa klien. */
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText, MessageCircle, PenLine } from "lucide-react";
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
            width={1200}
            height={800}
            alt="Dua peneliti perempuan Indonesia berdiskusi di depan laptop sambil menganalisis grafik dan lembar data akademik."
          />
        </div>
        <Link className="journal-back-link" href="/publish-jurnal"><ArrowLeft size={15} /> Kembali ke Publish Jurnal</Link>
        <p className="journal-kicker"><span className="journal-kicker-line" /> ASISTENSI PENULISAN</p>
        <h1>Publikasi Jurnal Ilmiah, Hanya Perlu Mention Topik</h1>
        <p className="journal-hero-description">Tuliskan topik penelitian, kami bantu asistensi sampai jadi artikel ilmiah berkualitas</p>
        <div className="journal-flow-meta"><span><PenLine size={16} /> Masukkan topik penelitian</span><span className="meta-divider" /><span><MessageCircle size={16} /> Lanjut lewat WhatsApp</span></div>
      </section>

      <section className="journal-assist-workspace">
        <div className="journal-assist-info">
          <div className="journal-assist-label"><FileText size={16} /> KATEGORI JURNAL</div>
          <h2>Ruang lingkup jurnal</h2>
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
        <div className="journal-assist-form-panel">
          <div className="journal-form-heading"><span className="journal-form-icon"><PenLine size={18} /></span><div><p>LANGKAH TERAKHIR</p><h2>Ceritakan topik Anda.</h2></div></div>
          <p className="journal-form-intro">Isi topik penelitian agar admin dapat menerima konteks asistensi Anda.</p>
          <FormAsistensi jenis="jurnal" />
        </div>
      </section>
      <div className="journal-return-link"><Link href="/publish-jurnal/kirim-artikel">Sudah memiliki artikel? Kirim artikel <ArrowUpRight size={15} /></Link></div>
    </div>
  );
}
