// app/app/(publik)/publish-jurnal/asistensi/page.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "./page";
import { KATEGORI_JURNAL } from "@/content/site";

describe("asistensi", () => {
  const html = renderToStaticMarkup(<Page />);

  it("menampilkan tiga kategori yang sama", () => {
    const teks = html.replace(/&amp;/g, "&");
    for (const k of KATEGORI_JURNAL) expect(teks).toContain(k);
  });

  it("menyediakan input topik yang diberi label", () => {
    expect(html).toContain('name="topik"');
    expect(html).toContain('id="topik-jurnal"');
    expect(html).toContain("Topik Asistensi Penulisan Artikel Jurnal Ilmiah");
    expect(html).toContain("Isi topik penelitian untuk kami bantu asistensi penulisan artikel ilmiah.");
    expect(html).toContain("Kuantitatif/kualitatif bisa kami bantu");
    expect(html).toMatch(/<label[^>]*for="topik-jurnal"/);
  });

  it("§5.1 memakai headline & subheadline sesuai Figma", () => {
    expect(html).toContain("Publikasi Jurnal Ilmiah, Hanya Perlu Mention Topik");
    expect(html).toContain("Tuliskan topik penelitian, kami bantu asistensi sampai jadi artikel ilmiah berkualitas");
    expect(html).toContain("Pilih Tujuan Jurnal Sesuai Kebutuhan");
    expect(html).toContain("Belum ada artikel? Tak masalah");
  });

  it("§5.1 memuat banner dua peneliti dan logo-logo kategori jurnal", () => {
    expect(html).toContain("/aset/asistensi-jurnal.jpg");
    for (const src of [
      "/logo/logo%20sinta%201.png",
      "/logo/logo%20garuda.png",
      "/logo/logo%20copernicus.jpg",
      "/logo/logo%20crossref.png",
      "/logo-resmi/scopus.png",
      "/logo-resmi/sjr.png",
    ]) {
      expect(html).toContain(src);
    }
    expect((html.match(/data-warna=/g) ?? [])).toHaveLength(4);
  });
});
