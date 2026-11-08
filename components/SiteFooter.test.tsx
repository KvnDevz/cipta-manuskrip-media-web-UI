// app/components/SiteFooter.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  const html = renderToStaticMarkup(<SiteFooter />);

  it("menu LAYANAN memuat empat tautan eksplisit", () => {
    expect(html).toContain('href="/publish-buku"');
    expect(html).toContain('href="/publish-jurnal"');
    expect(html).toContain('href="/publish-buku#asistensi"');
    expect(html).toContain('href="/publish-jurnal/asistensi"');
    expect(html).toContain("Asistensi penulisan buku");
    expect(html).toContain("Asistensi penulisan artikel jurnal");
  });

  it("tidak ada lagi tautan asistensi umum yang menyatukan dua layanan", () => {
    expect(html).not.toContain(">Asistensi penulisan<");
  });

  it("banner lama tentang rujukan data terbit dihapus total", () => {
    expect(html).not.toContain("Katalog buku menjadi rujukan data terbit");
    expect(html).not.toContain("Setiap tindak lanjut berlangsung lewat");
    expect(html).not.toContain("site-footer-note");
  });

  it("menyebut nama perusahaan tanpa data karangan", () => {
    expect(html).toContain("CV Cipta Manuskrip Media");
    expect(html).not.toMatch(/NIB|NPWP|@gmail|@yahoo/);
  });
});
