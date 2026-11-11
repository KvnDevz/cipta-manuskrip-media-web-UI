/* eslint-disable @next/next/no-img-element -- logo indeks lokal di public/logo/, dimuat langsung agar mudah diganti berkasnya */
import { MARQUEE_SINTA } from "@/content/site";

/**
 * Strip marquee logo indeks, tepat di bawah hero beranda.
 *
 * Struktur dua grup identik (grup kedua `aria-hidden`) digeser -50%
 * sehingga putaran berjalan mulus tanpa jeda.
 */
export function LogoMarquee() {
  const slot = MARQUEE_SINTA.map((item) => (
    <li className="logo-marquee-item" key={item.id}>
      <span className="logo-marquee-bingkai" aria-hidden="true">
        <img
          className="logo-marquee-gambar"
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="logo-marquee-teks">
        <strong>{item.label}</strong>
        <small>{item.sublabel}</small>
      </span>
    </li>
  ));

  return (
    <section className="logo-marquee" aria-labelledby="logo-marquee-judul">
      <div className="logo-marquee-head">
        <h2 className="logo-marquee-judul" id="logo-marquee-judul">Indeks &amp; pengakuan</h2>
        <p className="logo-marquee-catatan">
          Jurnal nasional terakreditasi &amp; indeksasi internasional
        </p>
      </div>

      {/* Dua grup identik: animasi menggeser -50% sehingga putaran terasa
          tanpa jeda. Grup kedua disembunyikan dari pembaca layar. */}
      <div className="logo-marquee-viewport">
        <div className="logo-marquee-track">
          <ul className="logo-marquee-group">{slot}</ul>
          <ul className="logo-marquee-group" aria-hidden="true">{slot}</ul>
        </div>
      </div>
    </section>
  );
}
