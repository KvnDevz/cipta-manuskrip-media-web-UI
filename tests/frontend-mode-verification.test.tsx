import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "@/app/(publik)/page";
import KatalogPage from "@/app/(publik)/katalog/[status]/page";
import BukuDetailPage from "@/app/(publik)/buku/[slug]/page";
import PublishBukuPage from "@/app/(publik)/publish-buku/page";
import PublishJurnalPage from "@/app/(publik)/publish-jurnal/page";
import TentangKamiPage from "@/app/(publik)/tentang-kami/page";
import sitemap from "@/app/sitemap";

describe("Frontend Mode - Verifikasi Halaman Publik Tanpa Database", () => {
  it("halaman beranda (Home) berhasil dirender", () => {
    const el = HomePage();
    const html = renderToStaticMarkup(el);
    const teks = html.replace(/<[^>]*>/g, "");
    expect(teks).toContain("Beli Kopi");
    expect(teks).toContain("Empat prinsip, satu tujuan: publikasi lebih mudah.");
    expect(teks).toContain("Semudah Beli Kopi");
    expect(teks).toContain("Fast Track, Tanpa Ribet");
  });

  it("halaman katalog telah-terbit menampilkan daftar buku terbit dengan ISBN dan harga", async () => {
    const el = await KatalogPage({
      params: Promise.resolve({ status: "telah-terbit" }),
      searchParams: Promise.resolve({}),
    });
    const html = renderToStaticMarkup(el);
    expect(html).toContain("Buku yang Telah Terbit");
    expect(html).toContain("Metodologi Penelitian Kualitatif &amp; Kuantitatif");
    expect(html).toContain("978-623-00-1234-5");
    expect(html).toContain("Rp85.000");
    expect(html).not.toContain("data-testid=\"db-error\"");
  });

  it("halaman katalog segera-terbit menampilkan daftar naskah persiapan tanpa harga", async () => {
    const el = await KatalogPage({
      params: Promise.resolve({ status: "segera-terbit" }),
      searchParams: Promise.resolve({}),
    });
    const html = renderToStaticMarkup(el);
    expect(html).toContain("Buku Segera Terbit");
    expect(html).toContain("Statistika Terapan untuk Sains dan Sosial");
    expect(html).toContain("Desember 2024");
    expect(html).not.toContain("data-testid=\"db-error\"");
  });

  it("halaman detail buku menyajikan informasi lengkap dan tombol pesanan WhatsApp", async () => {
    const el = await BukuDetailPage({
      params: Promise.resolve({ slug: "metodologi-penelitian-kualitatif-kuantitatif" }),
    });
    const html = renderToStaticMarkup(el);
    expect(html).toContain("Metodologi Penelitian Kualitatif &amp; Kuantitatif");
    expect(html).toContain("Dr. H. Rahmat Hidayat, M.Pd.");
    expect(html).toContain("Beli Buku Cetak");
    expect(html).toContain("Sewa Ebook");
    expect(html).toContain("wa.me/6289671894900");
    expect(html).not.toContain("data-testid=\"db-error\"");
  });

  it("halaman publish-buku menyajikan paket dan pratinjau katalog", async () => {
    const el = await PublishBukuPage();
    const html = renderToStaticMarkup(el);
    expect(html).toContain("Terbit Buku Sekali Klik.");
    expect(html).toContain("Paket Eksklusif");
    expect(html).toContain("Buku yang Telah Terbit");
    expect(html).toContain("Buku Segera Terbit");
    expect(html).not.toContain("data-testid=\"db-error\"");
  });

  it("halaman publish-jurnal dan tentang-kami berhasil dirender", () => {
    const jurnalHtml = renderToStaticMarkup(PublishJurnalPage());
    expect(jurnalHtml).toContain("Publikasi Artikel Ilmiah Sekali Klik.");

    const tentangHtml = renderToStaticMarkup(TentangKamiPage());
    expect(tentangHtml).toContain("Cipta Manuskrip Media");
  });

  it("sitemap.xml memuat route statis dan seluruh slug buku contoh", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("http://localhost:3000/");
    expect(urls).toContain("http://localhost:3000/katalog/telah-terbit");
    expect(urls).toContain("http://localhost:3000/katalog/segera-terbit");
    expect(urls).toContain("http://localhost:3000/buku/metodologi-penelitian-kualitatif-kuantitatif");
    expect(urls).toContain("http://localhost:3000/buku/statistika-terapan-untuk-sains-dan-sosial");
  });

  it("halaman admin ringkasan dan daftar buku dapat memuat data in-memory", async () => {
    const { default: AdminDashboard } = await import("@/app/admin/(terlindungi)/page");
    const { default: AdminBukuPage } = await import("@/app/admin/(terlindungi)/buku/page");

    const dashEl = await AdminDashboard();
    const dashHtml = renderToStaticMarkup(dashEl);
    expect(dashHtml).toContain("Ringkasan katalog");
    expect(dashHtml).not.toContain("Data belum dapat dimuat");

    const bukuEl = await AdminBukuPage({ searchParams: Promise.resolve({}) });
    const bukuHtml = renderToStaticMarkup(bukuEl);
    expect(bukuHtml).toContain("Kelola buku");
    expect(bukuHtml).not.toContain("Daftar buku belum dapat dimuat");
  });
});
