/* eslint-disable @next/next/no-img-element -- banner foto lokal statis di public/aset/, src langsung dipakai agar mudah ditimpa klien. */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Share2,
  Phone,
} from "lucide-react";
import { KONTAK } from "@/content/site";
import { AboutLegalitas } from "@/components/AboutLegalitas";
import { AboutTeam } from "@/components/AboutTeam";
import { AboutMedsos } from "@/components/AboutMedsos";
import { WhatsappIcon } from "@/components/WhatsappIcon";

/** Judul tab halaman profil. */
export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Publikasi ilmiah seharusnya lebih mudah, cepat, dan tanpa ribet. Kami mendampingi dari tahap ide awal hingga karya siap terbit.",
};

/**
 * Halaman profil. Hero, legalitas, tim kami, dan medsos mengikuti referensi
 * klien. Gambar pendaftaran CV dan NPWP memakai berkas yang dikirim klien;
 * nomor/alamat di dalamnya tidak disalin ke teks halaman atau alt. Foto tim
 * masih ilustrasi AI sampai foto asli tiba. Akun medsos bersumber dari
 * `MEDIA_SOSIAL`. `<main>` dimiliki layout publik.
 */
export default function Page() {
  return (
    <div className="about-page">
      <section className="about-hero about-hero--baru" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="about-eyebrow"><span /> TENTANG CIPTA MANUSKRIP MEDIA</p>
          <h1 id="about-title">Publikasi Itu Penting. Ribetnya Tidak Perlu.</h1>
          <p className="about-hero-lede">Kami hadir dengan satu keyakinan: publikasi ilmiah seharusnya lebih mudah, cepat, dan tanpa ribet. Kami mendampingi dari tahap ide awal hingga karya siap terbit.</p>
          <div className="about-hero-actions">
            <Link href="/publish-jurnal/kirim-artikel" className="about-button about-button-light">Publikasikan Artikel Jurnal <ArrowUpRight size={15} /></Link>
            <Link href="/publish-buku" className="about-button about-button-outline">Terbitkan Buku <ArrowUpRight size={15} /></Link>
          </div>
        </div>
        <div className="about-hero-banner">
          <img
            src="/aset/tentang-kami.jpg"
            width={1400}
            height={640}
            alt="Banner editorial: seorang pria Indonesia tersenyum menikmati kopi sambil memegang ponsel di sebelah kiri, dan dua akademisi berdiskusi tentang naskah buku serta dokumen tinjauan di sebelah kanan."
          />
          <span className="about-hero-banner__catatan">Ilustrasi AI · foto tim menyusul dari klien</span>
        </div>
      </section>

      <AboutLegalitas />

      <AboutTeam />

      <section className="about-contact" aria-labelledby="about-contact-title">
        <div className="about-contact-heading"><p className="about-kicker">03 / HUBUNGI KAMI</p><h2 id="about-contact-title">Kontak dan konsultasi naskah</h2><p>Silakan pilih tim yang sesuai dengan kebutuhan Anda.</p></div>
        <div className="about-contact-grid">
          <a className="about-contact-card" href={`tel:${KONTAK.adminBuku}`}><span className="about-contact-icon about-contact-icon--whatsapp"><WhatsappIcon size={21} /></span><span className="about-contact-copy"><small>UNTUK PENERBITAN BUKU</small><strong>Admin Buku</strong><b>{KONTAK.adminBuku}</b></span><Phone size={16} className="about-contact-arrow" /></a>
          <a className="about-contact-card" href={`tel:${KONTAK.adminJurnal}`}><span className="about-contact-icon about-contact-icon--whatsapp"><WhatsappIcon size={21} /></span><span className="about-contact-copy"><small>UNTUK PUBLIKASI JURNAL</small><strong>Admin Jurnal</strong><b>{KONTAK.adminJurnal}</b></span><Phone size={16} className="about-contact-arrow" /></a>
        </div>
      </section>

      <section className="about-pending" aria-label="Ringkasan dokumen dan media sosial">
        <article className="about-pending-card"><span className="about-pending-icon"><FileText size={17} /></span><div><p className="about-kicker">LEGALITAS PERUSAHAAN</p><h2>Dokumen Resmi</h2><p>Bukti pendaftaran CV dan NPWP perusahaan ditampilkan pada section legalitas di atas.</p></div><span className="about-pending-tag">TERSEDIA</span></article>
        <article className="about-pending-card"><span className="about-pending-icon"><Share2 size={17} /></span><div><p className="about-kicker">MEDIA SOSIAL RESMI</p><h2>Media Sosial</h2><p>Akun media sosial dan surel resmi tercantum pada section medsos di bawah.</p></div><span className="about-pending-tag">TERSEDIA</span></article>
      </section>

      <AboutMedsos />

      <div className="about-endnote"><span>CV CIPTA MANUSKRIP MEDIA</span><span>PENERBIT BUKU &amp; JURNAL</span></div>
    </div>
  );
}
