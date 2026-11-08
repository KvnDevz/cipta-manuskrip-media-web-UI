/* eslint-disable @next/next/no-img-element -- dokumen resmi lokal statis di
   public/aset/; src langsung dipakai agar mudah ditimpa klien, pola sama
   dengan banner/foto lain di halaman publik. */
import { IdCard, Landmark, ShieldCheck } from "lucide-react";

/**
 * Section “01 / LEGALITAS” pada /tentang-kami.
 *
 * Menggantikan narasi profil lama (“Setiap naskah punya perjalanan…”).
 * Tata letak mengikuti referensi klien: teks + dua badge di kiri, panel
 * dokumen di kanan, lalu catatan verifikasi selebar konten.
 *
 * Gambar pendaftaran CV dan NPWP memakai berkas yang dikirim klien.
 * Nomor/alamat pada dokumen tidak disalin ke teks halaman atau alt;
 * keduanya hanya tampil sebagai bagian dari gambar resmi tersebut.
 */
export function AboutLegalitas() {
  return (
    <section className="about-legalitas" id="legalitas" aria-labelledby="legalitas-title">
      <div className="about-legalitas-grid">
        <div className="about-legalitas-copy">
          <p className="about-kicker">01 / LEGALITAS</p>
          <h2 id="legalitas-title">
            Legalitas jelas.
            <br />
            Publikasi lebih <em>tenang.</em>
          </h2>
          <p className="about-legalitas-lede">
            CV Cipta Manuskrip Media terdaftar secara resmi di Kementerian Hukum
            Republik Indonesia dan memiliki NPWP badan usaha.
          </p>
          <ul className="about-legalitas-badges">
            <li>
              <Landmark size={22} strokeWidth={1.6} aria-hidden="true" />
              Terdaftar di Kementerian Hukum
            </li>
            <li>
              <IdCard size={22} strokeWidth={1.6} aria-hidden="true" />
              Memiliki NPWP Perusahaan
            </li>
          </ul>
        </div>

        <div className="about-legalitas-visual">
          <div className="about-legalitas-docs">
            <img
              className="about-legal-paper"
              src="/aset/legalitas-cv.png"
              width={443}
              height={552}
              alt="Surat keterangan terdaftar pendirian CV Cipta Manuskrip Media dari Kementerian Hukum Republik Indonesia."
              loading="lazy"
              decoding="async"
            />
            <img
              className="about-legal-card"
              src="/aset/legalitas-npwp.png"
              width={520}
              height={312}
              alt="Kartu NPWP badan usaha CV Cipta Manuskrip Media."
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-legalitas-captions">
            <span>Bukti pendaftaran CV</span>
            <span>NPWP perusahaan</span>
          </div>
        </div>
      </div>

      <div className="about-legalitas-note">
        <ShieldCheck size={26} strokeWidth={1.6} aria-hidden="true" />
        <span className="about-legalitas-note-divider" aria-hidden="true" />
        <p>
          Data legalitas perusahaan dapat dipastikan keabsahannya melalui sistem
          resmi Kementerian Hukum.
        </p>
      </div>
    </section>
  );
}
