import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Pengaman regresi untuk masalah "CSS marquee tidak ke-load" di pratinjau.
 *
 * Di mode dev Turbopack memakai nama chunk CSS yang stabil, sehingga salinan
 * lama di peramban/proxy bisa terus dipakai meski berkas CSS sudah disunting.
 * Dua penangkalnya: header no-store khusus dev, dan URL chunk yang baru
 * lewat berkas CSS terpisah. Tes ini memastikan keduanya tidak hilang saat
 * ada perubahan di kemudian hari.
 */
const baca = (berkas: string) => readFileSync(join(process.cwd(), berkas), "utf8");

describe("pengiriman CSS section beranda", () => {
  const konfigurasi = baca("next.config.mjs");
  const tataLetak = baca("app/layout.tsx");
  const cssGlobal = baca("app/globals.css");
  const cssSection = baca("app/home-sections.css");

  it("aset CSS dev dipaksa no-store, dan hanya di mode dev", () => {
    expect(konfigurasi).toContain('process.env.NODE_ENV !== "production"');
    expect(konfigurasi).toContain('source: "/_next/static/chunks/:file"');
    expect(konfigurasi).toContain('"no-store, max-age=0"');
    expect(konfigurasi).toContain('"CDN-Cache-Control", value: "no-store"');
    expect(konfigurasi).toContain('"Surrogate-Control", value: "no-store"');
  });

  it("CSS section baru hidup di berkas terpisah yang diimpor layout", () => {
    expect(tataLetak).toContain('import "./home-sections.css";');
    expect(cssSection).toContain(".logo-marquee-viewport");
    expect(cssSection).toContain(".logo-marquee-track");
    expect(cssSection).toContain(".trust-grid");
    expect(cssSection).toContain(".trust-card");
  });

  it("keyframes marquee tetap tersedia di CSS dasar", () => {
    expect(cssGlobal).toContain("@keyframes cmm-marquee");
  });
});
