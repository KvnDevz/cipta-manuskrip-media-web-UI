/* eslint-disable @next/next/no-img-element -- berkas logo resmi statis di public/logo dan public/logo-resmi/, src langsung dipakai agar mudah ditimpa klien tanpa mengubah kode */
import type { ReactElement, ReactNode } from "react";

/**
 * Logo resmi untuk tiga kategori jurnal:
 * 1. SINTA 1–4 (grid 2x2) + GARUDA
 * 2. Index Copernicus + Crossref
 * 3. Scopus + SJR SCImago
 */

export const BADGE_SINTA = [
  { kode: "S1", warna: "oranye", src: "/logo/logo%20sinta%201.png", alt: "Logo resmi SINTA 1" },
  { kode: "S2", warna: "hijau", src: "/logo/logo%20sinta%202.png", alt: "Logo resmi SINTA 2" },
  { kode: "S3", warna: "biru", src: "/logo/logo%20sinta%203.png", alt: "Logo resmi SINTA 3" },
  { kode: "S4", warna: "kuning", src: "/logo/sinta%204%20logo.jpg", alt: "Logo resmi SINTA 4" },
] as const;

function Bingkai({
  kategori,
  ringkas,
  children,
}: {
  kategori: string;
  ringkas: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`category-logo${ringkas ? " category-logo--ringkas" : ""}`}
      data-kategori={kategori}
    >
      {children}
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
        <div className="category-logo__baris category-logo__baris--sinta-garuda">
          <div className="category-logo__sinta-grid" aria-label="Logo resmi SINTA 1 sampai 4">
            {BADGE_SINTA.map((b) => (
              <span
                key={b.kode}
                className="category-logo__sinta-item"
                data-warna={b.warna}
              >
                <img
                  className="category-logo__sinta-img"
                  src={b.src}
                  alt={b.alt}
                  width={50}
                  height={27}
                />
              </span>
            ))}
          </div>
          <img
            className="category-logo__img category-logo__img--garuda"
            src="/logo/logo%20garuda.png"
            alt="Logo resmi GARUDA, Garba Rujukan Digital"
            width={116}
            height={36}
          />
        </div>
      </Bingkai>
    );
  }

  if (indeks === 1) {
    return (
      <Bingkai kategori="ici" ringkas={ringkas}>
        <div className="category-logo__baris category-logo__baris--tengah">
          <img
            className="category-logo__img category-logo__img--copernicus"
            src="/logo/logo%20copernicus.jpg"
            alt="Logo resmi Index Copernicus International"
            width={138}
            height={32}
          />
          <img
            className="category-logo__img category-logo__img--crossref"
            src="/logo/logo%20crossref.png"
            alt="Logo resmi Crossref"
            width={96}
            height={30}
          />
        </div>
      </Bingkai>
    );
  }

  return (
    <Bingkai kategori="scopus-sjr" ringkas={ringkas}>
      <div className="category-logo__baris category-logo__baris--tengah">
        <img
          className="category-logo__img"
          src="/logo-resmi/scopus.png"
          alt="Logo resmi Scopus"
          width={114}
          height={36}
        />
        <img
          className="category-logo__img"
          src="/logo-resmi/sjr.png"
          alt="Logo resmi SJR, SCImago Journal & Country Rank"
          width={114}
          height={36}
        />
      </div>
      {!ringkas ? (
        <span className="category-logo__tag" aria-hidden="true">
          LOGO RESMI
        </span>
      ) : null}
    </Bingkai>
  );
}
