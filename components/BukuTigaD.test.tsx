import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BukuTigaD } from "./BukuTigaD";
import {
  INTERVAL_LOGO_BUKU_MS,
  JUMLAH_SLOT_LOGO,
} from "./BookLogoRotator";
import type { LogoBuku } from "@/lib/logo-buku";

const CONTOH: LogoBuku[] = [
  { id: "sinta-s1.png", src: "/logo/sinta-s1.png", label: "Sinta S1", alt: "Logo Sinta S1" },
  { id: "scopus.svg", src: "/logo/scopus.svg", label: "Scopus", alt: "Logo Scopus" },
  { id: "perpusnas.png", src: "/logo/perpusnas.png", label: "Perpusnas", alt: "Logo Perpusnas" },
];

describe("BukuTigaD — dua lapis buku dari repo lama, kini di hero", () => {
  it("struktur dua lapis, punggung, tepi halaman, dan merek CMM utuh", () => {
    const html = renderToStaticMarkup(<BukuTigaD logos={[]} />);
    expect(html).toContain("buku3d__belakang");
    expect(html).toContain("buku3d__depan");
    expect(html).toContain("buku3d__punggung");
    expect(html).toContain("buku3d__tepi");
    expect(html).toContain("buku3d__glow");
    expect(html).toContain("CMM");
  });

  it("dua slot logo tersedia dan KEDUANYA kosong saat folder belum diisi", () => {
    const html = renderToStaticMarkup(<BukuTigaD logos={[]} />);
    expect(JUMLAH_SLOT_LOGO).toBe(2);
    expect(html).toContain('data-jumlah-slot="2"');
    expect(html).toContain('data-slot="1"');
    expect(html).toContain('data-slot="2"');
    expect((html.match(/buku-slot--kosong/g) ?? [])).toHaveLength(2);
    expect((html.match(/Slot kosong/g) ?? [])).toHaveLength(2);
    expect(html).not.toContain("buku-slot__gambar");
  });

  it("dua logo tampil SEKALIGUS tanpa tulisan label di atasnya", () => {
    const html = renderToStaticMarkup(<BukuTigaD logos={CONTOH.slice(0, 2)} />);
    expect(html).toContain('data-jumlah-logo="2"');
    expect((html.match(/class="buku-slot__gambar"/g) ?? [])).toHaveLength(2);
    expect(html).toContain('src="/logo/sinta-s1.png"');
    expect(html).toContain('src="/logo/scopus.svg"');
    expect(html).not.toContain("buku-slot__nama");
    expect(html).not.toContain("buku-slot--kosong");
  });

  it("satu logo mengisi slot pertama, slot kedua tetap kosong", () => {
    const html = renderToStaticMarkup(<BukuTigaD logos={[CONTOH[0]]} />);
    expect((html.match(/class="buku-slot__gambar"/g) ?? [])).toHaveLength(1);
    expect((html.match(/buku-slot--kosong/g) ?? [])).toHaveLength(1);
    expect(html).toContain('data-jumlah-logo="1"');
  });

  it("lebih dari dua logo menampilkan pasangan awal TANPA bullet titik halaman", () => {
    const html = renderToStaticMarkup(<BukuTigaD logos={CONTOH} />);
    expect((html.match(/class="buku-slot__gambar"/g) ?? [])).toHaveLength(2);
    expect(html).toContain('src="/logo/sinta-s1.png"');
    expect(html).toContain('src="/logo/scopus.svg"');
    expect(html).not.toContain("buku-slot__titik");
    expect(html).not.toContain("buku-slot__nama");
  });

  it("pasangan bergeser otomatis dengan transisi crossfade keluar-masuk", () => {
    const sumber = readFileSync(
      join(process.cwd(), "components/BookLogoRotator.tsx"),
      "utf8",
    );
    expect(INTERVAL_LOGO_BUKU_MS).toBeGreaterThanOrEqual(1500);
    expect(JUMLAH_SLOT_LOGO).toBe(2);
    expect(sumber).toContain("window.setInterval");
    expect(sumber).toContain("is-keluar");
    expect(sumber).toContain("prefers-reduced-motion");
  });

  it("slot logo tidak memiliki outline border dan tulisan nama logo dihapus", () => {
    const html = renderToStaticMarkup(<BukuTigaD logos={CONTOH} />);
    expect(html).not.toContain("buku-slot__nama");
    expect(html).not.toContain("buku-slot__titik");

    const css = readFileSync(
      join(process.cwd(), "app/home-sections.css"),
      "utf8",
    );
    const blokSlot = css.slice(
      css.indexOf(".buku-slot {"),
      css.indexOf(".buku-slot--kosong {"),
    );
    expect(blokSlot).toContain("border: 0");
    expect(blokSlot).toContain("background: transparent");
    expect(css).toContain("@keyframes buku-logo-muncul");
    expect(css).toContain("@keyframes buku-logo-keluar");
  });

  it("CSS: buku besar di hero dan dua slot tersusun ATAS–BAWAH", () => {
    const css = readFileSync(
      join(process.cwd(), "app/home-sections.css"),
      "utf8",
    );
    const blokPasangan = css.slice(
      css.indexOf(".buku-slot-pasangan {"),
      css.indexOf(".buku-slot-kolom {"),
    );
    expect(blokPasangan).toContain("flex-direction: column");
    expect(blokPasangan).not.toContain("grid-template-columns: repeat(2");

    const blokHero = css.slice(
      css.indexOf(".hero-buku .buku3d {"),
      css.indexOf("/* --- Dua lapis buku"),
    );
    const skala = Number(blokHero.match(/scale\(([\d.]+)\)/)?.[1] ?? 0);
    expect(skala).toBeGreaterThanOrEqual(0.85);
  });
});
