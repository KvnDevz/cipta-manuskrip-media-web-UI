import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LogoMarquee } from "./LogoMarquee";

describe("LogoMarquee", () => {
  const html = renderToStaticMarkup(<LogoMarquee />);

  it("memuat enam slot placeholder SINTA, diduplikasi untuk loop mulus", () => {
    for (const n of [1, 2, 3, 4, 5, 6]) {
      expect(html).toContain(`SINTA ${n}`);
    }
    // 6 slot × 2 grup identik.
    expect((html.match(/class="logo-marquee-item"/g) ?? [])).toHaveLength(12);
    expect((html.match(/class="logo-marquee-group"/g) ?? [])).toHaveLength(2);
  });

  it("grup duplikat ditandai aria-hidden agar tidak dibaca dua kali", () => {
    expect(html).toContain('class="logo-marquee-group" aria-hidden="true"');
  });

  it("masih placeholder: belum ada gambar logo resmi", () => {
    expect(html).not.toContain("<img");
    expect(html).toContain("Placeholder logo");
    expect(html).toContain("placeholder sementara");
  });

  it("punya judul section yang bisa dirujuk pembaca layar", () => {
    expect(html).toContain('aria-labelledby="logo-marquee-judul"');
    expect(html).toContain('id="logo-marquee-judul"');
  });
});
