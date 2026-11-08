/* eslint-disable @next/next/no-img-element -- foto lokal statis di public/hero,
   sudah dipangkas ke 360px; dipakai sebagai thumbnail dekoratif bertanda alt,
   jadi tidak perlu melewati optimizer gambar Next. */
import { Coffee, Globe, Mail, PenLine } from "lucide-react";

/**
 * Dua kolom foto di dalam satu panel landscape beranda.
 *
 * Arahan inti: vektor/animasi CSS abstrak (garis orbit, buku 3D melayang)
 * diganti foto orang Indonesia dalam suasana hangat — kafe untuk analogi
 * "Beli kopi", ruang riset/meja kerja untuk "Publikasi di CMM". Kolom CMM
 * menutup dengan bukti otentik: logo resmi, sistem OJS, dan korespondensi
 * surel. Seluruh foto bersifat ilustrasi dan mudah diganti materi klien.
 *
 * Komponen ini sengaja tidak membungkus diri dengan bingkai kartu sendiri;
 * wadah `.hero-comparison` di halaman yang memberi latar landscape menyatu.
 */

type LangkahFoto = {
  nomor: string;
  judul: string;
  isi: string;
  foto: string;
  alt: string;
};

const LANGKAH_KOPI: readonly LangkahFoto[] = [
  {
    nomor: "1",
    judul: "Pilih kopi",
    isi: "Pilih minuman favorit Anda.",
    foto: "/hero/kopi-pilih.jpg",
    alt: "Mahasiswi Indonesia menerima secangkir kopi dari barista di kafe hangat",
  },
  {
    nomor: "2",
    judul: "Bayar",
    isi: "Selesaikan pembayaran.",
    foto: "/hero/kopi-bayar.jpg",
    alt: "Mahasiswa Indonesia membayar kopi dengan ponsel di meja kayu kafe",
  },
  {
    nomor: "3",
    judul: "Nikmati",
    isi: "Nikmati kopi pilihan Anda.",
    foto: "/hero/kopi-nikmati.jpg",
    alt: "Penulis muda Indonesia menikmati kopi sambil membuka buku catatan",
  },
];

const LANGKAH_CMM: readonly LangkahFoto[] = [
  {
    nomor: "1",
    judul: "Pilih layanan",
    isi: "Sudah atau belum punya naskah? Bisa!",
    foto: "/hero/cmm-pilih-layanan.jpg",
    alt: "Dosen dan mahasiswa Indonesia mendiskusikan naskah di ruang riset",
  },
  {
    nomor: "2",
    judul: "Bayar",
    isi: "Proses pembayaran praktis.",
    foto: "/hero/cmm-bayar.jpg",
    alt: "Tangan penulis Indonesia memegang ponsel di meja kerja bersama berkas cetak",
  },
  {
    nomor: "3",
    judul: "Terbit",
    isi: "Karya melangkah menuju publikasi.",
    foto: "/hero/cmm-terbit.jpg",
    alt: "Penulis Indonesia memegang buku cetak baru di ruang perpustakaan hangat",
  },
];

const KARTU = {
  kopi: {
    kicker: "Mulai dari yang sederhana",
    judul: "Beli kopi",
    Ikon: Coffee,
    langkah: LANGKAH_KOPI,
    latar: "/hero/kopi-pilih.jpg",
  },
  cmm: {
    kicker: "Perjalanan karya Anda",
    judul: "Publikasi di CMM",
    Ikon: PenLine,
    langkah: LANGKAH_CMM,
    latar: "/hero/cmm-pilih-layanan.jpg",
  },
} as const;

export function HeroPhotoCard({ varian }: { varian: "kopi" | "cmm" }) {
  const kartu = KARTU[varian];
  const Ikon = kartu.Ikon;

  return (
    <div className={`hero-photo-card hero-photo-card--${varian}`}>
      <div
        className="hero-photo-card-latar"
        aria-hidden="true"
        style={{ backgroundImage: `url(${kartu.latar})` }}
      />

      <div className="hero-card-head">
        <div>
          <p className="hero-card-kicker">{kartu.kicker}</p>
          <h2 className="hero-card-title">{kartu.judul}</h2>
        </div>
        <span className="hero-card-badge" aria-hidden="true">
          <Ikon size={17} strokeWidth={1.7} />
        </span>
      </div>

      <ol className="hero-step-list">
        {kartu.langkah.map((langkah) => (
          <li key={langkah.nomor} className="hero-step">
            <span className="hero-step-no" aria-hidden="true">{langkah.nomor}</span>
            <img
              className="hero-step-foto"
              src={langkah.foto}
              alt={langkah.alt}
              width={72}
              height={72}
              loading="lazy"
            />
            <span className="hero-step-copy">
              <strong>{langkah.judul}</strong>
              <span>{langkah.isi}</span>
            </span>
          </li>
        ))}
      </ol>

      {varian === "cmm" && (
        <div className="hero-card-bukti" aria-label="Bukti proses penerbitan">
          <span className="hero-bukti-chip">
            <img src="/logo-cmm-mark.png" alt="" width={14} height={14} /> Logo resmi
          </span>
          <span className="hero-bukti-chip">
            <Globe aria-hidden="true" size={12} strokeWidth={1.8} /> Sistem OJS
          </span>
          <span className="hero-bukti-chip">
            <Mail aria-hidden="true" size={12} strokeWidth={1.8} /> Email korespondensi
          </span>
        </div>
      )}
    </div>
  );
}
