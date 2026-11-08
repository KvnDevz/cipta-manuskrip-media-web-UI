import { ImageIcon } from "lucide-react";
import { MARQUEE_SINTA } from "@/content/site";

/**
 * Strip marquee logo indeks, tepat di bawah hero beranda.
 *
 * Sesuai arahan klien isinya MASIH PLACEHOLDER: logo resmi SINTA akan
 * dikirim belakangan. Karena itu tiap slot sengaja memakai bingkai putus-
 * putus + ikon gambar generik, bukan lambang yang dibuat-buat, dan diberi
 * keterangan "Placeholder logo" agar tidak terbaca sebagai pengakuan resmi.
 *
 * Cara mengganti nanti: tambahkan `src`/`alt` pada entri MARQUEE_SINTA,
 * lalu tukar isi <li> di bawah menjadi <img>. Struktur dua grup (grup
 * kedua `aria-hidden`) dan animasi `cmm-marquee` tidak perlu diubah.
 */
export function LogoMarquee() {
  const slot = MARQUEE_SINTA.map((item) => (
    <li className="logo-marquee-item" key={item.id}>
      <span className="logo-marquee-bingkai" aria-hidden="true">
        <ImageIcon size={19} />
      </span>
      <span className="logo-marquee-teks">
        <strong>{item.label}</strong>
        <small>Placeholder logo</small>
      </span>
    </li>
  ));

  return (
    <section className="logo-marquee" aria-labelledby="logo-marquee-judul">
      <div className="logo-marquee-head">
        <h2 className="logo-marquee-judul" id="logo-marquee-judul">Indeks &amp; pengakuan</h2>
        <p className="logo-marquee-catatan">
          Slot logo resmi SINTA · placeholder sementara
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
