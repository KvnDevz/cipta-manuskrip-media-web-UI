import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  Sparkles,
} from "lucide-react";
import { KONTAK } from "@/content/site";
import { HeroPhotoCard } from "@/components/HeroPhotoCard";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BukuTigaD } from "@/components/BukuTigaD";
import { PrinsipPublikasi } from "@/components/PrinsipPublikasi";

/**
 * Judul dan deskripsi beranda ditulis sendiri supaya hasil pencarian
 * menyebut dua layanan yang tersedia, bukan sekadar nama perusahaan.
 */
export const metadata: Metadata = {
  // Beranda memakai judul lengkap, bukan judul bawaan situs, karena judul
  // bawaan hanya berisi nama perusahaan dan tidak menjelaskan isinya di
  // hasil pencarian.
  title: {
    absolute: "Penerbitan Buku & Publikasi Artikel Ilmiah — CV Cipta Manuskrip Media",
  },
  description:
    "CV Cipta Manuskrip Media menerbitkan buku ber-ISBN dan mendampingi publikasi artikel ilmiah. Katalog, paket penerbitan, dan asistensi penulisan.",
};

/**
 * Pertanyaan yang benar-benar dijawab oleh halaman lain di situs ini.
 * Setiap jawaban merujuk perilaku yang sudah ada, supaya tidak ada janji
 * baru yang lahir dari bagian FAQ.
 */
const TANYA_JAWAB = [
  {
    tanya: "Bagaimana cara memesan buku dari katalog?",
    jawab:
      "Buka halaman buku, lalu pilih Beli Buku Cetak atau Sewa Ebook. Tautan tersebut membuka WhatsApp admin dengan judul buku sudah terisi otomatis.",
  },
  {
    tanya: "Mengapa buku segera terbit tidak mencantumkan harga?",
    jawab:
      "Karena bukunya belum dapat dipesan. Halamannya menampilkan status ISBN dan estimasi terbit apa adanya, tanpa angka harga.",
  },
  {
    tanya: "Haruskah naskah saya sudah lengkap?",
    jawab:
      "Tidak selalu. Halaman asistensi penulisan menerima topik atau gagasan yang sedang Anda kerjakan untuk dibicarakan lebih dulu dengan admin.",
  },
  {
    tanya: "Bagaimana cara mengirim artikel jurnal?",
    jawab:
      "Pilih kategori jurnal tujuan di halaman Kirim Artikel, lalu kirimkan naskah lewat WhatsApp. Naskah tidak diunggah ke server situs ini.",
  },
  {
    tanya: "Apakah isian formulir disimpan di situs?",
    jawab:
      "Tidak. Formulir asistensi hanya menyusun pesan WhatsApp; topik dan nama yang Anda tulis tidak disimpan di situs ini.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="home-hero home-hero--foto relative isolate overflow-hidden">
        <div className="hero-copy relative z-10 flex flex-col items-center px-5 text-center">
          <div className="eyebrow-pill"><Sparkles size={13} /> Ruang untuk karya yang berarti</div>
          <h1 className="hero-title mt-7 text-teks">
            Publikasi{" "}<br />
            <span className="hero-title-line">Semudah <span className="headline-accent">Beli Kopi.</span></span>
          </h1>
          <p className="hero-description mt-5 max-w-xl text-teks-sec">
            Layanan penerbitan buku dan publikasi artikel ilmiah.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/publish-buku" className="button-primary">
              Publish Buku <ArrowUpRight size={17} />
            </Link>
            <Link href="/publish-jurnal" className="button-secondary">
              Publish Jurnal <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-buku">
            {/* Dua lapis buku 3D dari repo lama + 2 slot logo resmi. */}
            <BukuTigaD />
          </div>
        </div>

        {/* Dua alur disatukan dalam satu panel landscape, bukan dua kotak terpisah. */}
        <div
          className="hero-photo-layout hero-comparison"
          role="group"
          aria-label="Perbandingan alur beli kopi dan publikasi di CMM"
        >
          <HeroPhotoCard varian="kopi" />
          <HeroPhotoCard varian="cmm" />
        </div>

        <Link href="#prinsip-publikasi" className="scroll-cue"><span>Jelajahi layanan</span><ArrowDown size={15} /></Link>
      </section>

      {/* Strip marquee indeks: placeholder sampai logo resmi SINTA dikirim. */}
      <LogoMarquee />

      {/* Pengganti "Bukan janji besar": empat prinsip publikasi sesuai referensi. */}
      <PrinsipPublikasi />

      {/* Tanya jawab memakai <details> bawaan browser: bisa dibuka tanpa JavaScript. */}
      <section className="home-faq mx-auto max-w-6xl px-5 pb-24 sm:px-8" aria-labelledby="faq-title">
        <div className="home-section-head">
          <p className="section-kicker">Tanya jawab</p>
          <h2 id="faq-title" className="section-title">Hal yang sering ditanyakan <em>sebelum mulai.</em></h2>
        </div>

        <div className="home-faq-list">
          {TANYA_JAWAB.map(({ tanya, jawab }) => (
            <details key={tanya} className="home-faq-item">
              <summary className="home-faq-question">
                <span>{tanya}</span>
                <ChevronDown size={17} className="home-faq-chevron" aria-hidden="true" />
              </summary>
              <div className="home-faq-answer"><p>{jawab}</p></div>
            </details>
          ))}
        </div>
      </section>

      {/* Kontak: nomor yang sama dengan footer dan halaman Tentang Kami. */}
      <section className="home-contact mx-auto max-w-6xl px-5 pb-24 sm:px-8" aria-labelledby="kontak-title">
        <div className="home-contact-panel">
          <div className="home-contact-copy">
            <p className="home-contact-kicker"><span aria-hidden="true" /> Mulai dari percakapan</p>
            <h2 id="kontak-title">Punya naskah yang ingin <em>dibicarakan?</em></h2>
            <p>
              Pilih tim yang paling dekat dengan kebutuhan Anda. Keduanya dihubungi lewat telepon atau WhatsApp
              dengan nomor yang sama seperti di halaman kontak.
            </p>
            <ul className="home-contact-points">
              <li><Check size={14} aria-hidden="true" /> Tanpa akun, tanpa keranjang</li>
              <li><Check size={14} aria-hidden="true" /> Naskah tidak diunggah ke situs</li>
            </ul>
          </div>

          <div className="home-contact-cards">
            <a className="home-contact-card" href={`tel:${KONTAK.adminBuku}`}>
              <span className="home-contact-icon" aria-hidden="true"><BookOpen size={18} strokeWidth={1.7} /></span>
              <span className="home-contact-body">
                <small>Penerbitan buku</small>
                <strong>Admin Buku</strong>
                <b>{KONTAK.adminBuku}</b>
              </span>
              <ArrowUpRight size={16} className="home-contact-arrow" aria-hidden="true" />
            </a>
            <a className="home-contact-card" href={`tel:${KONTAK.adminJurnal}`}>
              <span className="home-contact-icon home-contact-icon-lime" aria-hidden="true"><FileText size={18} strokeWidth={1.7} /></span>
              <span className="home-contact-body">
                <small>Publikasi jurnal</small>
                <strong>Admin Jurnal</strong>
                <b>{KONTAK.adminJurnal}</b>
              </span>
              <ArrowUpRight size={16} className="home-contact-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <div className="home-closing mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="closing-note">
          <div className="closing-mark">
            {/* eslint-disable-next-line @next/next/no-img-element -- local transparent client mark; preserve direct src as required by handoff tests */}
            <img src="/logo-cmm-trim.png" alt="" />
          </div>
          <p><strong>Setiap karya punya cerita.</strong><br /><span>Mulai ceritakan karya Anda bersama Cipta Manuskrip Media.</span></p>
          <Link href="/tentang-kami" aria-label="Kenali Cipta Manuskrip Media"><ArrowUpRight size={20} /></Link>
        </div>
      </div>
    </div>
  );
}
