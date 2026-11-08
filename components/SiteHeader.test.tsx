// app/components/SiteHeader.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  const html = renderToStaticMarkup(<SiteHeader />);

  it("menautkan Beranda di tengah dan Tentang Kami di kanan", () => {
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/tentang-kami"');
  });

  it("navbar hanya dua tautan: Beranda di tengah, Tentang Kami di kanan", () => {
    const menu = html.match(/<div class="nav-links">([\s\S]*?)<\/div>/)?.[1] ?? "";
    expect(menu).toContain('href="/"');
    expect(menu).not.toContain('href="/publish-buku"');
    expect(menu).not.toContain('href="/publish-jurnal"');
    expect(menu).not.toContain('href="/katalog/');
    expect(menu).not.toContain('href="/tentang-kami"');
    // Satu tautan tengah + satu tautan kanan, tidak ada menu tambahan.
    expect((html.match(/<a class="nav-link/g) ?? [])).toHaveLength(2);
  });

  it("CTA lama 'Mulai berkarya' dan gaya tombolnya sudah hilang", () => {
    expect(html).not.toContain("Mulai berkarya");
    expect(html).not.toContain("nav-cta");
    // Tautan kanan tidak boleh membawa ikon panah bekas CTA.
    expect(html).not.toMatch(/nav-link-kanan[\s\S]{0,120}<svg/);
  });

  it("Tentang Kami memakai kelas tautan menu biasa", () => {
    expect(html).toMatch(/class="nav-link nav-link-kanan"[^>]*href="\/tentang-kami"|href="\/tentang-kami"[^>]*class="nav-link nav-link-kanan"/);
    expect(html).toContain("Tentang Kami");
  });
});
