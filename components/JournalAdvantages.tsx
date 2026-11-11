/* eslint-disable @next/next/no-img-element -- poster statis lokal di public/aset/;
   pola sama dengan foto hero jurnal agar preview tidak bergantung pada
   image optimizer Next. */
import { Coffee, Inbox, Lightbulb, Play } from "lucide-react";

/**
 * Section “Keunggulan Kami” pada /publish-jurnal.
 *
 * Menggantikan section lama “Ruang untuk bukti publikasi”. Tata letak dan
 * isi mengikuti referensi klien: kicker + judul, tiga kartu keunggulan,
 * lalu bidang video proses publikasi dengan poster, tombol putar, dan
 * badge autoplay/muted.
 */
const KEUNGGULAN = [
  {
    nomor: "01",
    judul: "Bukti korespondensi lengkap",
    isi: "Bukti submit, review, revisi, rebuttal letter, hingga terbit. Semua kami siapkan. Tanpa ribet.",
    ikon: Inbox,
  },
  {
    nomor: "02",
    judul: "Belum ada artikel? Tidak masalah.",
    isi: "Cukup mention topik penelitian, selanjutnya kami bantu sampai tuntas.",
    ikon: Lightbulb,
  },
  {
    nomor: "03",
    judul: "Prosesnya semudah beli kopi",
    isi: "Pesan, bayar, dan terbit.",
    ikon: Coffee,
  },
] as const;

export function JournalAdvantages() {
  return (
    <section className="journal-advantages-section" aria-labelledby="journal-advantages-title">
      <div className="journal-advantages-head">
        <p className="journal-section-kicker">KEUNGGULAN KAMI</p>
        <h2 id="journal-advantages-title">Mengapa pilih publikasi jurnal di kami?</h2>
      </div>

      <div className="journal-advantages-grid">
        {KEUNGGULAN.map(({ nomor, judul, isi, ikon: Icon }) => (
          <article key={nomor} className="journal-advantage-card">
            <span className="journal-advantage-icon" aria-hidden="true">
              <Icon size={24} strokeWidth={1.5} />
            </span>
            <span className="journal-advantage-number">{nomor}</span>
            <h3>{judul}</h3>
            <p>{isi}</p>
          </article>
        ))}
      </div>

      <figure className="journal-video">
        <img
          className="journal-video-poster"
          src="/aset/jurnal-video-poster.jpg"
          width={1920}
          height={1080}
          alt="Poster video proses publikasi: meja kerja dengan buku, naskah terbuka, pena, dan secangkir kopi."
          loading="lazy"
          decoding="async"
        />
        <span className="journal-video-chip journal-video-chip--left">
          <Play size={11} strokeWidth={2} aria-hidden="true" /> VIDEO PROSES PUBLIKASI
        </span>
        <span className="journal-video-chip journal-video-chip--right">AUTOPLAY · MUTED</span>
        <button type="button" className="journal-video-play" aria-label="Putar video proses publikasi">
          <Play size={22} strokeWidth={2} aria-hidden="true" />
        </button>
        <figcaption className="sr-only">Video proses publikasi jurnal.</figcaption>
      </figure>
    </section>
  );
}
