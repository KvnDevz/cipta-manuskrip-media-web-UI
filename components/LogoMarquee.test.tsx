import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MARQUEE_SINTA } from "@/content/site";
import { LogoMarquee } from "./LogoMarquee";

describe("LogoMarquee", () => {
  const html = renderToStaticMarkup(<LogoMarquee />);

  it("memuat seluruh logo indeks dan pengakuan, diduplikasi untuk loop mulus", () => {
    for (const item of MARQUEE_SINTA) {
      expect(html).toContain(item.label);
      expect(html).toContain(item.sublabel);
      expect(html).toContain(item.src);
    }
    expect((html.match(/class="logo-marquee-item"/g) ?? [])).toHaveLength(
      MARQUEE_SINTA.length * 2,
    );
    expect((html.match(/class="logo-marquee-group"/g) ?? [])).toHaveLength(2);
  });

  it("grup duplikat ditandai aria-hidden agar tidak dibaca dua kali", () => {
    expect(html).toContain('class="logo-marquee-group" aria-hidden="true"');
  });

  it("menampilkan gambar logo resmi di dalam tiap kartu", () => {
    expect((html.match(/class="logo-marquee-gambar"/g) ?? [])).toHaveLength(
      MARQUEE_SINTA.length * 2,
    );
  });

  it("punya judul section yang bisa dirujuk pembaca layar", () => {
    expect(html).toContain('aria-labelledby="logo-marquee-judul"');
    expect(html).toContain('id="logo-marquee-judul"');
  });
});
