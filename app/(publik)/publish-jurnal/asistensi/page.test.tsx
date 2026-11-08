// app/app/(publik)/publish-jurnal/asistensi/page.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "./page";
import { KATEGORI_JURNAL } from "@/content/site";

/**
 * Halaman `/publish-jurnal/asistensi` — statis, tanpa database. Topik
 * asistensi tidak pernah dikirim ke server: ia hanya pernah masuk isi
 * pesan WhatsApp lewat `pesanAsistensiJurnal`, jadi halaman ini tidak punya
 * tes pengiriman data — hanya markup kategori dan input berlabel.
 */
describe("asistensi", () => {
  const html = renderToStaticMarkup(<Page />);

  it("menampilkan tiga kategori yang sama", () => {
    for (const k of KATEGORI_JURNAL) expect(html).toContain(k);
  });

  it("menyediakan input topik yang diberi label", () => {
    expect(html).toContain('name="topik"');
    expect(html).toContain('id="topik-jurnal"');
    expect(html).toContain("Topik Asistensi Penulisan Artikel Jurnal Ilmiah");
    expect(html).toMatch(/<label[^>]*for="topik-jurnal"/);
  });

  it("§5.1 memakai headline & subheadline baru persis", () => {
    expect(html).toContain("Publikasi Jurnal Ilmiah, Hanya Perlu Mention Topik");
    expect(html).toContain("Tuliskan topik penelitian, kami bantu asistensi sampai jadi artikel ilmiah berkualitas");
  });

  it("§5.1 memuat banner dua peneliti dan ketiga logo resmi", () => {
    expect(html).toContain("/aset/asistensi-jurnal.jpg");
    for (const src of ["/logo-resmi/sinta.png", "/logo-resmi/ici.png", "/logo-resmi/scopus.png", "/logo-resmi/sjr.png"]) {
      expect(html).toContain(src);
    }
    expect((html.match(/data-warna=/g) ?? [])).toHaveLength(4);
  });
});
