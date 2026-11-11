import { BadgeCheck } from "lucide-react";
import { PILAR_KEPERCAYAAN, type JenisVisualPilar } from "@/content/site";

/**
 * "Mengapa Memilih Penerbit Cipta Manuskrip Media?"
 * Komponen empat pilar kepercayaan di /publish-buku, tepat setelah asistensi.
 */
function VisualPilar({ jenis }: { jenis: JenisVisualPilar }) {
  if (jenis === "legalitas") {
    return (
      <div className="trust-visual trust-visual--legalitas">
        <span className="trust-logo-bulat" aria-hidden="true">
          <img
            src="/aset/trust-legalitas.png"
            alt=""
            width={78}
            height={73}
            className="trust-logo-img"
          />
        </span>
        <span className="trust-visual-caption">
          Badge Kemenkumham / Legal Seal
        </span>
      </div>
    );
  }

  if (jenis === "isbn") {
    return (
      <div className="trust-visual trust-visual--isbn">
        <span className="trust-logo-bulat" aria-hidden="true">
          <img
            src="/aset/trust-perpusnas.png"
            alt=""
            width={78}
            height={73}
            className="trust-logo-img"
          />
        </span>
        <span className="trust-barcode" aria-hidden="true" />
        <span className="trust-visual-caption">
          Logo Perpusnas RI &amp; Barcode ISBN
        </span>
      </div>
    );
  }

  if (jenis === "naskah") {
    return (
      <div className="trust-visual trust-visual--naskah">
        <img
          src="/aset/trust-naskah.png"
          alt=""
          aria-hidden="true"
          width={204}
          height={68}
          className="trust-ilustrasi-img"
        />
        <span className="trust-visual-caption">
          Ilustrasi editorial &amp; konsultasi naskah
        </span>
      </div>
    );
  }

  return (
    <div className="trust-visual trust-visual--distribusi">
      <img
        src="/aset/trust-distribusi.png"
        alt=""
        aria-hidden="true"
        width={202}
        height={76}
        className="trust-ilustrasi-img"
      />
      <span className="trust-visual-caption">
        Buku cetak &amp; E-Book digital reader
      </span>
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
    </section>
  );
}
