import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "./page";

/**
 * Visual Section 3 pada `/publish-buku` (brief §3.1 & §3.2).
 *
 * Sengaja terpisah dari page.test.tsx yang butuh database: di sini hanya
 * dibuktikan bahwa hero memakai FOTO (bukan lembaran CSS abstrak) dan foto
 * pendukung hadir di samping form asistensi. `Page()` menangkap kegagalan DB
 * sendiri, jadi berkas ini tetap hijau tanpa MySQL.
 */
describe("visual §3 publish-buku", () => {
  it("§3.1 hero memakai foto PUBLISHED + ISBN dan teks/CTA sesuai Figma", async () => {
    const html = renderToStaticMarkup(await Page());
    expect(html).toContain("/aset/buku-hero.jpg");
    expect(html).toContain("Terbit Buku Sekali Klik");
    expect(html).toContain("Layanan penerbitan dan penulisan buku fiksi/nonfiksi");
    expect(html).toContain("Sekali klik, buku terbit dan terjual.");
    expect(html).toContain("Kirim Naskah");
    expect(html).toContain("Asistensi Penulisan");
    expect(html).not.toContain("publish-sheet");
    expect(html).not.toContain("sheet-front");
  });

  it("§3.2 foto pendukung berada di samping form asistensi", async () => {
    const html = renderToStaticMarkup(await Page());
    expect(html).toContain("assist-section--foto");
    expect(html).toContain("/aset/asistensi-buku.jpg");
    expect(html).toContain("ASISTENSI PENULISAN NASKAH BUKU");
    expect(html).toContain("Ketik Topik Buku, Naskah Anda Langsung Jadi");
    expect(html).toContain("Topik Asistensi Penulisan Buku");
    // Urutan DOM: foto sebelum form, dan keduanya dalam section yang sama.
    expect(html.indexOf("assist-media")).toBeLessThan(html.indexOf("assist-form-card"));
  });

  it("empat pilar lama muncul tepat setelah asistensi dan sebelum katalog", async () => {
    const html = renderToStaticMarkup(await Page());
    const posisiAsistensi = html.indexOf('id="asistensi"');
    const posisiPilar = html.indexOf('class="trust-pillars ');
    const posisiKatalog = html.indexOf('class="book-preview-section"');

    expect(posisiAsistensi).toBeGreaterThanOrEqual(0);
    expect(posisiPilar).toBeGreaterThan(posisiAsistensi);
    expect(posisiKatalog).toBeGreaterThan(posisiPilar);
    expect((html.match(/class="trust-card"/g) ?? [])).toHaveLength(4);
    expect(html).toContain('id="trust-title"');
    expect(html).toContain("Mengapa Memilih Penerbit ");
    expect(html).toContain("Cipta Manuskrip Media?");
  });

  it("foto diberi alt yang menjelaskan isinya (bukan alt kosong)", async () => {
    const html = renderToStaticMarkup(await Page());
    expect(html).toMatch(/alt="Penulis muda Indonesia[^"]+PUBLISHED[^"]+"/);
    expect(html).toMatch(/alt="Dua perempuan Indonesia[^"]+"/);
  });

  it("gaya fade-in: foto tanpa bingkai menyatu ke latar, teks kiri / gambar kanan", () => {
    const css = readFileSync(join(process.cwd(), "app/home-sections.css"), "utf8");
    expect(css).toContain("mask-image: linear-gradient(90deg");
    expect(css).toContain(".publish-hero-art--foto { position: absolute; inset: 0 0 0 auto");
    expect(css).toContain("border: 0; border-radius: 0; box-shadow: none;");
    expect(css).toContain('grid-template-areas: "copy media" "form media"');
    expect(css).toContain("@keyframes sec3-foto-masuk");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain(".publish-hero-foto, .assist-foto, .journal-hero-foto { animation: none; }");
    // Foto asistensi diperbesar di kolom kanan yang lebih lebar, rasio
    // panorama tetap agar balon teks tidak tercrop, dan fade hanya menyamping.
    const assistFoto = css.match(/\.assist-foto \{[^}]+\}/)?.[0] ?? "";
    expect(assistFoto).toContain("width: 100%");
    expect(assistFoto).toContain("aspect-ratio: 963 / 423");
    expect(assistFoto).toContain("border-radius: 0");
    expect(assistFoto).toContain("mask-image: linear-gradient(90deg");
    expect(assistFoto).not.toContain("linear-gradient(180deg");
    expect(assistFoto).not.toContain("mask-composite");
    expect(css).toContain("grid-template-columns: minmax(300px, 0.75fr) minmax(0, 1.25fr)");
    expect(css).toContain(".assist-media { position: relative; display: grid; width: 100%; height: 330px;");
    // §4–7: hero jurnal ikut fade-in, banner About full-bleed, badge SINTA berwarna.
    expect(css).toContain(".journal-hero-foto { width: 100%; height: 100%;");
    expect(css).toContain(".journal-hero .journal-hero-description { max-width: 340px; }");
    expect(css).toContain(".about-hero--baru { grid-template-columns: 1fr;");
    expect(css).toContain(".sinta-rank--s1 { background: #e8752a; }");
    expect(css).toContain(".detail-coming-badge__header {");
  });
});
