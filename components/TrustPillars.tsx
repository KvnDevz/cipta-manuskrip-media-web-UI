import {
  BadgeCheck,
  BookOpen,
  Landmark,
  MessageCircle,
  PenLine,
  Scale,
  TabletSmartphone,
} from "lucide-react";
import { PILAR_KEPERCAYAAN, type JenisVisualPilar } from "@/content/site";

/**
 * "Mengapa Memilih Penerbit Cipta Manuskrip Media?"
 * Komponen lama dipakai kembali di /publish-buku, tepat setelah asistensi.
 * Beranda tetap memakai Prinsip Publikasi CMM, bukan section ini.
 *
 * Empat pilar kepercayaan dengan kartu elegan. Dua pilar pertama meminta
 * logo resmi (Kemenkumham, Perpusnas RI + barcode ISBN); berkas itu belum
 * dikirim klien, jadi tampilannya sengaja berupa bingkai PLACEHOLDER yang
 * diberi keterangan — bukan logo tiruan yang bisa terbaca sebagai bukti
 * sah. Dua pilar lain cukup memakai ikon editorial/distribusi.
 *
 * Saat aset resmi tiba: ganti `VisualLegalitas` / `VisualIsbn` menjadi
 * <img> dan hapus catatan placeholder di bawah grid.
 */
function VisualPilar({ jenis }: { jenis: JenisVisualPilar }) {
  if (jenis === "legalitas") {
    return (
      <div className="trust-visual trust-visual--legalitas">
        <span className="trust-segel" aria-hidden="true"><Scale size={26} strokeWidth={1.6} /></span>
        <span className="trust-visual-caption">Badge Kemenkumham / Legal Seal · placeholder</span>
      </div>
    );
  }

  if (jenis === "isbn") {
    return (
      <div className="trust-visual trust-visual--isbn">
        <span className="trust-ikon" aria-hidden="true"><Landmark size={23} strokeWidth={1.6} /></span>
        <span className="trust-barcode" aria-hidden="true" />
        <span className="trust-visual-caption">Logo Perpusnas RI &amp; Barcode ISBN · placeholder</span>
      </div>
    );
  }

  if (jenis === "naskah") {
    return (
      <div className="trust-visual trust-visual--naskah">
        <span className="trust-ikon" aria-hidden="true"><PenLine size={23} strokeWidth={1.6} /></span>
        <span className="trust-penghubung" aria-hidden="true" />
        <span className="trust-ikon" aria-hidden="true"><MessageCircle size={23} strokeWidth={1.6} /></span>
        <span className="trust-visual-caption">Ilustrasi editorial &amp; konsultasi naskah</span>
      </div>
    );
  }

  return (
    <div className="trust-visual trust-visual--distribusi">
      <span className="trust-ikon" aria-hidden="true"><BookOpen size={23} strokeWidth={1.6} /></span>
      <span className="trust-penghubung" aria-hidden="true" />
      <span className="trust-ikon" aria-hidden="true"><TabletSmartphone size={23} strokeWidth={1.6} /></span>
      <span className="trust-visual-caption">Buku cetak &amp; E-Book digital reader</span>
    </div>
  );
}

export function TrustPillars() {
  return (
    <section
      className="trust-pillars mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 sm:px-8"
      aria-labelledby="trust-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-kicker">Mengapa memilih kami</p>
          <h2 id="trust-title" className="section-title">
            Mengapa Memilih Penerbit <em>Cipta Manuskrip Media?</em>
          </h2>
        </div>
        <p className="section-intro">
          Empat pilar yang menopang kepercayaan pada setiap proses penerbitan.
        </p>
      </div>

      <div className="trust-grid">
        {PILAR_KEPERCAYAAN.map((pilar) => (
          <article className="trust-card" key={pilar.id}>
            <div className="trust-card-top">
              <span className="trust-nomor">{pilar.nomor}</span>
              <span className="trust-card-cek" aria-hidden="true">
                <BadgeCheck size={17} strokeWidth={1.7} />
              </span>
            </div>

            <VisualPilar jenis={pilar.jenisVisual} />

            <h3 className="trust-card-judul">{pilar.judul}</h3>
            <p className="trust-card-deskripsi">{pilar.deskripsi}</p>
          </article>
        ))}
      </div>

      <p className="trust-catatan">
        * Logo resmi Kemenkumham, Perpusnas RI, dan barcode ISBN masih berupa
        placeholder hingga berkas aslinya dikirimkan.
      </p>
    </section>
  );
}
