import { Share2 } from "lucide-react";
import { MEDIA_SOSIAL } from "@/content/site";
import { SocialBrandIcon } from "@/components/SocialBrandIcon";

/**
 * Section "Medsos" pada /tentang-kami.
 *
 * Diletakkan setelah dua kartu ringkasan (legalitas perusahaan dan media
 * sosial), sebelum catatan kaki halaman. Tata letak mengikuti referensi
 * klien: pengantar berikon di kiri, daftar akun di kanan dengan Gmail
 * melebar satu baris penuh.
 *
 * Akun dan surel bersumber dari `MEDIA_SOSIAL` di content/site.ts — satu
 * sumber kebenaran, tidak ada handle yang ditulis ulang di sini.
 */
export function AboutMedsos() {
  return (
    <section className="about-medsos" id="medsos" aria-labelledby="medsos-title">
      <div className="about-medsos-card">
        <div className="about-medsos-intro">
          <div className="about-medsos-head">
            <span className="about-medsos-icon" aria-hidden="true">
              <Share2 size={22} strokeWidth={1.7} />
            </span>
            <div>
              <p className="about-kicker">TERHUBUNG DENGAN KAMI</p>
              <h2 id="medsos-title">Medsos</h2>
            </div>
          </div>
          <p className="about-medsos-desc">
            Ikuti kabar dan informasi penerbitan kami.
          </p>
        </div>

        <ul className="about-medsos-grid">
          {MEDIA_SOSIAL.map(({ jenis, label, nilai, href }) => {
            const surel = href.startsWith("mailto:");
            return (
              <li
                key={jenis}
                className={surel ? "about-medsos-item about-medsos-item--wide" : "about-medsos-item"}
              >
                <a
                  href={href}
                  {...(surel ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <SocialBrandIcon jenis={jenis} />
                  <span className="about-medsos-copy">
                    <strong>{label}</strong>
                    <small>{nilai}</small>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
