import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LogoKategoriJurnal, BADGE_SINTA } from "./LogoKategoriJurnal";

/**
 * Penjaga §4.3: tiga kategori memakai berkas logo ASLI yang berbeda, dan
 * badge SINTA S1–S4 tampil semua dengan urutan warna sesuai brief.
 * Marquee/TrustPillars tidak tersentuh komponen ini.
 */
describe("LogoKategoriJurnal", () => {
  it("kategori SINTA memakai wordmark resmi + 4 badge berwarna urut", () => {
    const html = renderToStaticMarkup(<LogoKategoriJurnal indeks={0} />);
    expect(html).toContain('src="/logo-resmi/sinta.png"');
    expect(html).toContain("Science and Technology Index");
    expect(BADGE_SINTA.map((b) => b.warna)).toEqual(["oranye", "hijau", "biru", "kuning"]);
    for (const b of BADGE_SINTA) {
      expect(html).toContain(`>${b.kode}<`);
      expect(html).toContain(`data-warna="${b.warna}"`);
    }
    expect(html).toContain("LOGO RESMI");
  });

  it("kategori Index Copernicus memakai logo ICI asli", () => {
    const html = renderToStaticMarkup(<LogoKategoriJurnal indeks={1} />);
    expect(html).toContain('src="/logo-resmi/ici.png"');
    expect(html).toContain("ICI World of Journals");
  });

  it("kategori Scopus/SCImago memuat dua logo sekaligus", () => {
    const html = renderToStaticMarkup(<LogoKategoriJurnal indeks={2} />);
    expect(html).toContain('src="/logo-resmi/scopus.png"');
    expect(html).toContain('src="/logo-resmi/sjr.png"');
    expect(html).toContain("SCImago Journal &amp; Country Rank");
  });

  it("setiap logo diberi alt teks, bukan alt kosong", () => {
    for (const i of [0, 1, 2]) {
      const html = renderToStaticMarkup(<LogoKategoriJurnal indeks={i} />);
      expect(html).not.toContain('alt=""');
      expect((html.match(/alt="Logo resmi/g) ?? []).length).toBeGreaterThan(0);
    }
  });

  it("varian ringkas tetap memuat logonya", () => {
    const html = renderToStaticMarkup(<LogoKategoriJurnal indeks={2} ringkas />);
    expect(html).toContain("category-logo--ringkas");
    expect(html).toContain('src="/logo-resmi/scopus.png"');
  });
});
