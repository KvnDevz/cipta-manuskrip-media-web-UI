/* eslint-disable @next/next/no-img-element -- berkas logo resmi statis di public/logo-resmi/, src langsung dipakai agar mudah ditimpa klien tanpa mengubah kode */
import type { ReactElement } from "react";

/**
 * Logo resmi untuk tiga kategori jurnal (brief §4.3).
 *
 * Berkas di `public/logo-resmi/` adalah logo ASLI yang diunduh dari sumber
 * publik; daftar dan tautan sumbernya ada di `public/logo-resmi/README.md`.
 * Saat klien mengirim versi resmi mereka, cukup timpa berkasnya.
 *
 * Khusus SINTA: wordmark resmi ditampilkan bersama empat badge peringkat
 * S1–S4. Badge peringkat TIDAK digambar ulang sebagai seal tiruan; warnanya
 * (oranye, hijau, biru, kuning) dirender lewat CSS sesuai arahan brief,
 * karena berkas badge resmi per tingkat belum disuplai klien.
 *
 * Komponen ini dipakai di kartu `/publish-jurnal/kirim-artikel` dan daftar
 * kategori `/publish-jurnal/asistensi`. Marquee SINTA di beranda dan
 * `TrustPillars` sengaja TIDAK memakai logo ini — keduanya masih placeholder.
 */

const DASAR = "/logo-resmi";

export const BADGE_SINTA = [
  { kode: "S1", warna: "oranye" },
  { kode: "S2", warna: "hijau" },
  { kode: "S3", warna: "biru" },
  { kode: "S4", warna: "kuning" },
] as const;

function Bingkai({
  kategori,
  ringkas,
  children,
}: {
  kategori: string;
  ringkas: boolean;
  children: ReactElement | ReactElement[];
}) {
  return (
    <div
      className={`category-logo${ringkas ? " category-logo--ringkas" : ""}`}
      data-kategori={kategori}
    >
      {children}
      <span className="category-logo__tag">LOGO RESMI</span>
    </div>
  );
}

/** `indeks` mengikuti urutan `KATEGORI_JURNAL` di `content/site.ts`. */
export function LogoKategoriJurnal({
  indeks,
  ringkas = false,
}: {
  indeks: number;
  ringkas?: boolean;
}): ReactElement {
  if (indeks === 0) {
    return (
      <Bingkai kategori="sinta" ringkas={ringkas}>
        <div className="category-logo__baris">
          <img
            className="category-logo__img"
            src={`${DASAR}/sinta.png`}
            alt="Logo resmi SINTA, Science and Technology Index"
            width={168}
            height={62}
          />
          <span className="category-logo__badges" aria-label="Peringkat SINTA 1 sampai 4">
            {BADGE_SINTA.map((b) => (
              <span
                key={b.kode}
                className={`sinta-rank sinta-rank--${b.kode.toLowerCase()}`}
                data-warna={b.warna}
              >
                {b.kode}
              </span>
            ))}
          </span>
        </div>
      </Bingkai>
    );
  }

  if (indeks === 1) {
    return (
      <Bingkai kategori="ici" ringkas={ringkas}>
        <img
          className="category-logo__img category-logo__img--lebar"
          src={`${DASAR}/ici.png`}
          alt="Logo resmi Index Copernicus International, ICI World of Journals"
          width={444}
          height={121}
        />
      </Bingkai>
    );
  }

  return (
    <Bingkai kategori="scopus-sjr" ringkas={ringkas}>
      <div className="category-logo__baris">
        <img
          className="category-logo__img"
          src={`${DASAR}/scopus.png`}
          alt="Logo resmi Scopus"
          width={150}
          height={49}
        />
        <img
          className="category-logo__img"
          src={`${DASAR}/sjr.png`}
          alt="Logo resmi SJR, SCImago Journal & Country Rank"
          width={150}
          height={53}
        />
      </div>
    </Bingkai>
  );
}
