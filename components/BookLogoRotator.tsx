"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import type { LogoBuku } from "@/lib/logo-buku";

/** Interval pergantian logo di tengah sampul, sesuai arahan: satu detik. */
export const INTERVAL_LOGO_BUKU_MS = 1000;

/** Dua logo tampil ATAS–BAWAH di tengah sampul, bukan kiri–kanan. */
export const JUMLAH_SLOT_LOGO = 2;

/**
 * Field logo di tengah buku 3D — 2 slot sekaligus.
 *
 * Daftar logo datang dari Server Component yang membaca folder
 * `public/logo/`; komponen ini tidak perlu tahu asalnya. Dua logo tampil
 * bersamaan secara vertikal. Bila ada lebih dari dua berkas, pasangannya bergeser setiap
 * 1 detik (A+B -> B+C -> C+A -> ...), jadi semua logo tetap tampil tanpa
 * ada slot yang kosong.
 *
 * Saat folder masih kosong, kedua slot sengaja dibiarkan KOSONG dengan
 * bingkai putus-putus — bukan diisi logo tiruan.
 */
export function BookLogoRotator({ logos }: { logos: LogoBuku[] }) {
  const [offset, setOffset] = useState(0);
  const jumlah = logos.length;

  useEffect(() => {
    // Nol/satu logo tidak perlu rotasi; `pasangan` di bawah sudah menormalkan.
    if (jumlah < 2) return;

    // Pengunjung yang meminta pengurangan gerak cukup melihat pasangan awal.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setOffset((sekarang) => (sekarang + 1) % jumlah);
    }, INTERVAL_LOGO_BUKU_MS);

    return () => window.clearInterval(timer);
  }, [jumlah]);

  const geser = jumlah === 0 ? 0 : offset % jumlah;

  /** Dua slot: kalau cuma satu logo, slot kedua tetap kosong (tanpa duplikat). */
  const pasangan: Array<LogoBuku | undefined> = Array.from(
    { length: JUMLAH_SLOT_LOGO },
    (_, i) => (jumlah >= 2 ? logos[(geser + i) % jumlah] : i === 0 ? logos[0] : undefined),
  );

  return (
    <div
      className="buku-slot-area"
      data-jumlah-logo={jumlah}
      data-jumlah-slot={JUMLAH_SLOT_LOGO}
    >
      <div className="buku-slot-pasangan">
        {pasangan.map((logo, i) => (
          <div className="buku-slot-kolom" key={`slot-${i + 1}`}>
            {/* Label hanya muncul saat slot terisi; slot kosong sengaja tanpa
                tulisan "Logo 1"/"Logo 2" sesuai arahan klien. */}
            {logo && (
              <span className="buku-slot__nama" key={`nama-${logo.id}`}>
                {logo.label}
              </span>
            )}
            <div
              className={`buku-slot${logo ? "" : " buku-slot--kosong"}`}
              data-slot={i + 1}
              data-kosong={logo ? undefined : "true"}
            >
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- sumber logo dinamis dari folder public/logo/ (termasuk SVG), tidak bisa memakai import statis next/image
                <img
                  key={logo.id}
                  className="buku-slot__gambar"
                  src={logo.src}
                  alt={logo.alt}
                />
              ) : (
                <span className="buku-slot__kosong">
                  <ImageIcon size={21} strokeWidth={1.4} aria-hidden="true" />
                  <span>Slot kosong</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {jumlah > 2 && (
        <span className="buku-slot__titik" aria-hidden="true">
          {logos.map((logo) => (
            <i key={logo.id} className={logos[geser]?.id === logo.id ? "is-aktif" : ""} />
          ))}
        </span>
      )}
    </div>
  );
}
