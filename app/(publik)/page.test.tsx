// app/app/(publik)/page.test.tsx
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

describe("beranda", () => {
  const html = renderToStaticMarkup(<Home />);

  it("memakai headline dan pendukung persis dari brief", () => {
    const visibleText = html.replace(/<[^>]*>/g, "");
    expect(visibleText).toContain("Publikasi Semudah Beli Kopi.");
    expect(visibleText).toContain("Layanan penerbitan buku dan publikasi artikel ilmiah.");
  });

  it("headline kembali ke markup asli; efek heboh tidak mengubah font", () => {
    expect(html).toContain('class="hero-title mt-7 text-teks"');
    expect(html).not.toContain("hero-title--heboh");

    const css = readFileSync(join(process.cwd(), "app/hero-headline.css"), "utf8");
    expect(css).not.toMatch(/font-(family|size|weight|style)\s*:/);
    expect(css).not.toMatch(/letter-spacing\s*:/);
    expect(css).not.toMatch(/text-transform\s*:/);
  });

  it("CSS membesarkan subheadline dan menu untuk audiens dosen senior", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toMatch(/font-size: clamp\(20px, 2\.15vw, 28px\)/);
    expect(css).toContain("font-size: 15.5px;");
    expect(css).not.toMatch(/\.hero-bg-(?:orbit|ring|busur|bintik|glow|karrier|medali)\b/);
    expect(css).not.toContain("hero-orbit-spin");
  });

  it("tombol mengarah ke dua halaman layanan, bukan katalog", () => {
    expect(html).toContain('href="/publish-buku"');
    expect(html).toContain('href="/publish-jurnal"');
    expect(html).toContain("Publish Buku");
    expect(html).toContain("Publish Jurnal");
  });

  it("hero memakai dua alur foto dalam satu panel landscape, tanpa orbit atau buku 3D lama", () => {
    expect(html).toContain("hero-photo-layout");
    expect(html).toContain("hero-comparison");
    expect(html).toContain('aria-label="Perbandingan alur beli kopi dan publikasi di CMM"');
    expect(html).not.toMatch(/hero-bg-(?:orbit|ring|busur|bintik|glow|karrier|medali)/);
    expect(html).toContain("Beli kopi");
    expect(html).toContain("Publikasi di CMM");
    expect(html).toContain("/hero/kopi-pilih.jpg");
    expect(html).toContain("/hero/cmm-terbit.jpg");
    expect(html.indexOf("hero-comparison")).toBeLessThan(html.indexOf("hero-photo-card--kopi"));
    expect(html.indexOf("hero-comparison")).toBeLessThan(html.indexOf("hero-photo-card--cmm"));
    expect(html).not.toContain("book-scene");
    expect(html).not.toContain("floating-note");
    expect(html).not.toContain("hero-grid");
    expect(html).not.toContain("orbit-outer");
  });

  it("marquee logo placeholder hadir setelah hero, sebelum section prinsip", () => {
    expect(html).toContain("logo-marquee-viewport");
    expect(html.indexOf("logo-marquee-viewport")).toBeLessThan(
      html.indexOf('id="prinsip-publikasi"'),
    );
  });

  it("buku 3D dua lapis hidup DI DALAM hero, dengan 2 slot logo", () => {
    expect(html).toContain("hero-buku");
    expect(html).toContain("buku3d__belakang");
    expect(html).toContain("buku3d__depan");
    expect(html).toContain('data-jumlah-slot="2"');
    expect((html.match(/buku-slot--kosong/g) ?? [])).toHaveLength(2);
    // Buku sebelum marquee, dan keduanya masih di dalam hero.
    expect(html.indexOf("home-hero--foto")).toBeLessThan(html.indexOf("buku3d__depan"));
    expect(html.indexOf("buku3d__depan")).toBeLessThan(html.indexOf("logo-marquee-viewport"));
    expect(html).not.toContain("book-showcase");
    expect(html).not.toContain('aria-labelledby="buku-title"');
  });

  it("section prinsip publikasi menggantikan Bukan janji besar, sesuai referensi", () => {
    const teks = html.replace(/<[^>]*>/g, "");
    expect(html).toContain('aria-labelledby="prinsip-title"');
    expect(teks).toContain("Empat prinsip, satu tujuan: publikasi lebih mudah.");
    expect(teks).toContain(
      "Di Cipta Manuskrip Media, proses publikasi dibuat lebih praktis sejak langkah pertama.",
    );
    expect((html.match(/class="prinsip-card"/g) ?? [])).toHaveLength(4);
    for (const judul of [
      "Semudah Beli Kopi",
      "Segala Kondisi Naskah, Kami Terima &amp; Proses",
      "Belum Ada Naskah? Bukan Masalah",
      "Fast Track, Tanpa Ribet",
    ]) {
      expect(html).toContain(judul);
    }
    expect(html).toContain("/aset/prinsip-kopi.jpg");
    expect(html).toContain("/aset/prinsip-naskah.jpg");
    expect(html).toContain("/aset/prinsip-ide.jpg");
    expect(html).toContain("/aset/prinsip-fast-track.jpg");
  });

  it("section lama yang diminta hapus tidak lagi tampil di beranda", () => {
    const teks = html.replace(/<[^>]*>/g, "");
    expect(teks).not.toContain("Empat langkah");
    expect(teks).not.toContain("dua jalan berkarya");
    expect(teks).not.toContain("Bukan janji besar");
    expect(teks).not.toContain("Mengapa Memilih Penerbit");
    expect(html).not.toContain("home-flow");
    expect(html).not.toContain("home-ground");
    expect(html).not.toContain("services-section");
    expect(html).not.toContain("trust-pillars");
    expect(html).not.toContain('id="pilih-layanan"');
  });
});
