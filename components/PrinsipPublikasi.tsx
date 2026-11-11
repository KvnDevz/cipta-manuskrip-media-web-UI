/* eslint-disable @next/next/no-img-element -- foto lokal dari referensi klien; src langsung lebih sederhana untuk aset statis kecil. */

/**
 * Section "Prinsip Publikasi CMM" — pengganti bagian "Bukan janji besar".
 *
 * Tata letak mengikuti referensi klien: judul besar di kiri, pengantar di
 * kanan, lalu empat kartu landscape bernomor dengan foto di sisi kanan.
 * Isi tidak menambah janji baru di luar kalimat pada referensi.
 */
const PRINSIP = [
  {
    nomor: "01",
    judul: "Semudah Beli Kopi",
    isi: "Pilih layanan, bayar, dan terbit",
    foto: "/aset/prinsip-kopi.jpg",
    alt: "Barista menyerahkan secangkir kopi kepada pelanggan di kafe",
  },
  {
    nomor: "02",
    judul: "Segala Kondisi Naskah, Kami Terima & Proses",
    isi: "Naskah berantakan atau belum berkualitas? Kami siap bantu jadi berkualitas",
    foto: "/aset/prinsip-naskah.jpg",
    alt: "Naskah dengan coretan penyuntingan dan pena merah di atas meja",
  },
  {
    nomor: "03",
    judul: "Belum Ada Naskah? Bukan Masalah",
    isi: "Cukup sampaikan ide/topik, naskah langsung jadi",
    foto: "/aset/prinsip-ide.jpg",
    alt: "Dua orang berdiskusi menyampaikan ide sambil membuka buku catatan",
  },
  {
    nomor: "04",
    judul: "Fast Track, Tanpa Ribet",
    isi: "Proses publikasi lebih cepat tanpa administrasi ribet",
    foto: "/aset/prinsip-fast-track.jpg",
    alt: "Seseorang mengetik di laptop dengan cangkir kopi di dekatnya",
  },
] as const;

export function PrinsipPublikasi() {
  return (
    <section
      id="prinsip-publikasi"
      className="home-prinsip mx-auto max-w-6xl px-5 sm:px-8"
      aria-labelledby="prinsip-title"
    >
      <div className="prinsip-head">
        <div>
          <p className="section-kicker prinsip-kicker">Prinsip Publikasi CMM</p>
          <h2 id="prinsip-title" className="prinsip-title">
            Empat prinsip, satu tujuan: <em>publikasi lebih mudah.</em>
          </h2>
        </div>
        <p className="prinsip-intro">
          Di Cipta Manuskrip Media, proses publikasi dibuat lebih praktis sejak
          langkah pertama.
        </p>
      </div>

      <div className="prinsip-grid">
        {PRINSIP.map((item) => (
          <article className="prinsip-card" key={item.nomor}>
            <div className="prinsip-copy">
              <span className="prinsip-no" aria-hidden="true">{item.nomor}</span>
              <h3>{item.judul}</h3>
              <p>{item.isi}</p>
            </div>
            <img
              className="prinsip-foto"
              src={item.foto}
              alt={item.alt}
              width={170}
              height={170}
              loading="lazy"
              decoding="async"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
