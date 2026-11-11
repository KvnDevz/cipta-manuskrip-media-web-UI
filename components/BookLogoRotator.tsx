"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import type { LogoBuku } from "@/lib/logo-buku";

/** Interval pergantian logo di tengah sampul supaya transisi crossfade terasa halus. */
export const INTERVAL_LOGO_BUKU_MS = 2200;

/** Dua logo tampil ATAS–BAWAH di tengah sampul, bukan kiri–kanan. */
export const JUMLAH_SLOT_LOGO = 2;

type LayerLogoSlot = {
  logo: LogoBuku;
  keluar: boolean;
};

/**
 * Field logo di tengah buku 3D — 2 slot sekaligus.
 *
 * Daftar logo datang dari Server Component yang membaca folder
 * `public/logo/`; komponen ini tidak perlu tahu asalnya. Dua logo tampil
 * bersamaan secara vertikal tanpa teks label maupun indikator titik.
 * Saat berganti, logo lama dan baru bertumpuk di sel yang sama sehingga
 * crossfade + geser vertikal berjalan mulus tanpa jeda kosong.
 */
export function BookLogoRotator({ logos }: { logos: LogoBuku[] }) {
  const [langkah, setLangkah] = useState(0);
  const jumlah = logos.length;

  useEffect(() => {
    if (jumlah < 2) return;

    // Preload semua gambar logo agar pergantian tidak berkedip saat decode pertama.
    for (const item of logos) {
      const pratinjau = new window.Image();
      pratinjau.src = item.src;
    }

    // Pengunjung yang meminta pengurangan gerak cukup melihat pasangan awal.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setLangkah((sekarang) => sekarang + 1);
    }, INTERVAL_LOGO_BUKU_MS);

    return () => window.clearInterval(timer);
  }, [jumlah, logos]);

  const geser = jumlah === 0 ? 0 : langkah % jumlah;
  const geserSebelum =
    langkah > 0 && jumlah >= 2 ? (langkah - 1) % jumlah : null;

  return (
    <div
      className="buku-slot-area"
      data-jumlah-logo={jumlah}
      data-jumlah-slot={JUMLAH_SLOT_LOGO}
    >
      <div className="buku-slot-pasangan">
        {Array.from({ length: JUMLAH_SLOT_LOGO }, (_, i) => {
          const logoAktif =
            jumlah >= 2
              ? logos[(geser + i) % jumlah]
              : i === 0
                ? logos[0]
                : undefined;

          const logoKeluar =
            geserSebelum !== null
              ? logos[(geserSebelum + i) % jumlah]
              : undefined;

          const lapisan: LayerLogoSlot[] = [];
          if (logoKeluar && logoKeluar.id !== logoAktif?.id) {
            lapisan.push({ logo: logoKeluar, keluar: true });
          }
          if (logoAktif) {
            lapisan.push({ logo: logoAktif, keluar: false });
          }

          return (
            <div className="buku-slot-kolom" key={`slot-${i + 1}`}>
              <div
                className={`buku-slot${logoAktif ? "" : " buku-slot--kosong"}`}
                data-slot={i + 1}
                data-kosong={logoAktif ? undefined : "true"}
              >
                {logoAktif ? (
                  lapisan.map(({ logo, keluar }) => (
                    // eslint-disable-next-line @next/next/no-img-element -- sumber logo dinamis dari folder public/logo/ (termasuk SVG), tidak bisa memakai import statis next/image
                    <img
                      key={logo.id}
                      className={
                        keluar
                          ? "buku-slot__gambar is-keluar"
                          : "buku-slot__gambar"
                      }
                      src={logo.src}
                      alt={keluar ? "" : logo.alt}
                      aria-hidden={keluar ? "true" : undefined}
                    />
                  ))
                ) : (
                  <span className="buku-slot__kosong">
                    <ImageIcon size={21} strokeWidth={1.4} aria-hidden="true" />
                    <span>Slot kosong</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
