/* eslint-disable @next/next/no-img-element -- foto lokal statis di public/aset/,
   sudah dioptimasi ke JPEG; src langsung dipakai agar preview & tes visual
   tidak bergantung pada image optimizer Next (pola sama dengan HeroPhotoCard). */
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BadgeCheck, Eye, Fingerprint, GraduationCap, Languages, LayoutTemplate, Link2, MessagesSquare, PanelsTopLeft, PenLine, ScanSearch, ShieldCheck, Timer } from "lucide-react";
import type { Metadata } from "next";
import { FASILITAS_JURNAL } from "@/content/site";
import { JournalAdvantages } from "@/components/JournalAdvantages";

/** Judul tab halaman layanan jurnal. */
export const metadata: Metadata = {
  title: "Publish Jurnal",
  description:
    "Fasilitas publikasi, dokumentasi, dan pilihan layanan artikel ilmiah dari CV Cipta Manuskrip Media.",
};

const IKON_FASILITAS = [
  Timer,
  Link2,
  MessagesSquare,
  Eye,
  ShieldCheck,
  PenLine,
  Fingerprint,
  GraduationCap,
  Languages,
  ScanSearch,
  PanelsTopLeft,
  LayoutTemplate,
  BadgeCheck,
] as const;

/** UI editorial jurnal; seluruh konten layanan tetap mengikuti desain Figma terbaru. */
export default function Page() {
  return (
    <div className="journal-page journal-overview">
      <section className="journal-hero">
        <div className="journal-hero-copy">
          <p className="journal-kicker"><span className="journal-kicker-line" /> LAYANAN PUBLIKASI JURNAL</p>
          <h1>Publikasi Artikel Ilmiah Sekali Klik</h1>
          <p className="journal-hero-description">Kejar Jabfung atau kelulusan? Publikasi jurnal lebih mudah dengan fast review!</p>
          <div className="journal-hero-actions">
            <Link href="/publish-jurnal/kirim-artikel" className="journal-button journal-button-bright">Kirim Artikel <ArrowUpRight size={17} /></Link>
            <Link href="/publish-jurnal/asistensi" className="journal-button journal-button-outline">Belum Ada Artikel <ArrowUpRight size={17} /></Link>
          </div>
          <a className="journal-scroll" href="#fasilitas">Lihat fasilitas <ArrowDown size={14} /></a>
        </div>
        <div className="journal-hero-visual journal-hero-visual--foto">
          <img
            className="journal-hero-foto"
            src="/aset/jurnal-dosen.jpg"
            width={851}
            height={482}
            alt="Dosen Indonesia berjas biru dongker memegang laptop dengan latar teal polos serta bukti korespondensi email, timeline publikasi SINTA 2, dan notifikasi OJS."
          />
        </div>
      </section>

      <JournalAdvantages />

      <section id="fasilitas" className="journal-facilities-section">
        <div className="journal-facilities-heading">
          <div><p className="journal-section-kicker">CAKUPAN LAYANAN</p><h2>Fasilitas</h2></div>
          <p>Daftar fasilitas publikasi artikel ilmiah.</p>
        </div>
        <ul className="journal-facilities-grid">
          {FASILITAS_JURNAL.map((fasilitas, i) => {
            const IkonFasilitas = IKON_FASILITAS[i];
            return (
              <li key={fasilitas} className="journal-facility">
                <span className="facility-number">{String(i + 1).padStart(2, "0")}</span>
                <span className="facility-check" aria-hidden="true"><IkonFasilitas size={14} strokeWidth={1.8} /></span>
                <span>{fasilitas}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="journal-next-step">
        <div><p className="journal-section-kicker">LANGKAH BERIKUTNYA</p><h2>Siap melanjutkan artikel?</h2></div>
        <div className="journal-next-actions">
          <Link href="/publish-jurnal/kirim-artikel" className="journal-button journal-button-dark">Kirim Artikel <ArrowUpRight size={16} /></Link>
          <Link href="/publish-jurnal/asistensi" className="journal-text-link">Belum Ada Artikel <ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </div>
  );
}
