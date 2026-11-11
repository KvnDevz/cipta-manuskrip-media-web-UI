import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LogoKategoriJurnal, BADGE_SINTA } from "./LogoKategoriJurnal";

describe("LogoKategoriJurnal", () => {
  it("kategori SINTA memakai 4 logo SINTA 1–4 + logo GARUDA", () => {
    const html = renderToStaticMarkup(<LogoKategoriJurnal indeks={0} />);
    expect(html).toContain("/logo/logo%20sinta%201.png");
    expect(html).toContain("/logo/logo%20sinta%202.png");
    expect(html).toContain("/logo/logo%20sinta%203.png");
    expect(html).toContain("/logo/sinta%204%20logo.jpg");
    expect(html).toContain("/logo/logo%20garuda.png");
    expect(BADGE_SINTA.map((b) => b.warna)).toEqual(["oranye", "hijau", "biru", "kuning"]);
    for (const b of BADGE_SINTA) {
      expect(html).toContain(`data-warna="${b.warna}"`);
    }
  });

  it("kategori Index Copernicus memakai logo Copernicus & Crossref", () => {
    const html = renderToStaticMarkup(<LogoKategoriJurnal indeks={1} />);
    expect(html).toContain("/logo/logo%20copernicus.jpg");
    expect(html).toContain("/logo/logo%20crossref.png");
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
