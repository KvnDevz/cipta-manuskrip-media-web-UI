// app/app/(publik)/tentang-kami/page.test.tsx
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "./page";
import { MEDIA_SOSIAL } from "@/content/site";

/**
 * Halaman `/tentang-kami` — brief §10, halaman statis tanpa database.
 *
 * Nomor kontak harus persis dari `KONTAK`. Section pertama kini legalitas
 * mengikuti referensi klien dan memakai gambar dokumen yang dikirim klien.
 * Nomor registrasi/NPWP dan alamat tidak boleh dikarang atau disalin ke
 * teks halaman/alt; keduanya hanya boleh hadir di dalam gambar resmi.
 */
describe("tentang-kami", () => {
  const html = renderToStaticMarkup(<Page />);
  const css = readFileSync(join(process.cwd(), "app/home-sections.css"), "utf8");

  it("menampilkan nomor admin buku dan jurnal persis", () => {
    expect(html).toContain("0896-7189-4900");
    expect(html).toContain("0895-6292-03142");
    expect(html).toContain("Admin Buku");
    expect(html).toContain("Admin Jurnal");
  });

  it("memuat area legalitas, kontak, dokumen resmi, dan media sosial", () => {
    for (const a of ["Dokumen Resmi", "Kontak", "Media Sosial"]) expect(html).toContain(a);
    expect(html).toContain("01 / LEGALITAS");
    expect(html).toContain('id="legalitas"');
  });

  it("tidak mengarang NIB, nomor NPWP, atau alamat; surel hanya akun resmi klien", () => {
    expect(html).not.toMatch(/NIB/i);
    expect(html).not.toMatch(/\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/);
    expect(html).not.toContain("1000 0000 1151 1945");
    expect(html).not.toContain("Blora");
    expect(html).not.toContain("Karangjati");
    // Surel resmi klien boleh tampil di section medsos, tetapi tidak boleh
    // ada alamat lain yang dikarang.
    const surel = html.match(/[\w.+-]+@[\w.-]+\.\w+/g) ?? [];
    expect([...new Set(surel)]).toEqual(["ciptamanuskripmedia@gmail.com"]);
  });

  it("section medsos memuat lima akun resmi klien dengan tautan yang benar", () => {
    expect(html).toContain('id="medsos"');
    expect(html).toContain("TERHUBUNG DENGAN KAMI");
    expect(html).toContain("Medsos");
    expect(html).toContain("Ikuti kabar dan informasi penerbitan kami.");
    expect((html.match(/class="about-medsos-item/g) ?? [])).toHaveLength(5);
    expect((html.match(/class="about-medsos-item about-medsos-item--wide"/g) ?? [])).toHaveLength(1);
    for (const akun of MEDIA_SOSIAL) {
      expect(html).toContain(akun.label);
      expect(html).toContain(akun.nilai);
      expect(html).toContain(`href="${akun.href}"`);
    }
    // Tautan keluar aman; surel memakai mailto tanpa target blank.
    expect((html.match(/rel="noopener noreferrer"/g) ?? []).length).toBeGreaterThanOrEqual(4);
    expect(html).toContain('href="mailto:ciptamanuskripmedia@gmail.com"');
    expect(html).not.toContain("BELUM TERSEDIA");
    expect(html).toContain("PENERBIT BUKU &amp; JURNAL");
    expect(css).toContain(".about-medsos-card");
    expect(css).toContain(".about-medsos-item--wide");
  });

  it("hero memakai headline/subheadline/dua CTA, teks tengah, tanpa pill fokus layanan", () => {
    expect(html).toContain("Publikasi Itu Penting. Ribetnya Tidak Perlu.");
    expect(html).toContain("Kami hadir dengan satu keyakinan: publikasi ilmiah seharusnya lebih mudah, cepat, dan tanpa ribet. Kami mendampingi dari tahap ide awal hingga karya siap terbit.");
    expect(html).toContain("Publikasikan Artikel Jurnal");
    expect(html).toContain("Terbitkan Buku");
    expect(html).toContain('href="/publish-jurnal/kirim-artikel"');
    expect(html).toContain('href="/publish-buku"');
    expect(html).not.toContain("about-pills");
    expect(html).not.toContain('class="about-pill"');
    expect(html).not.toContain('aria-label="Fokus layanan"');
    expect(css).toMatch(/\.about-hero--baru \.about-hero-copy\s*\{[^}]*text-align:\s*center/);
    expect(css).toMatch(/\.about-hero--baru \.about-hero-lede\s*\{[^}]*font-size:\s*clamp\(16px/);
    expect(css).not.toMatch(/\.about-pill\b/);
  });

  it("section profil lama diganti legalitas sesuai referensi, dengan gambar dokumen klien", () => {
    expect(html).not.toContain("Setiap naskah punya perjalanan.");
    expect(html).not.toContain("Kami hadir untuk mendampingi prosesnya.");
    expect(html).not.toContain("Catatan draf");
    expect(html).not.toContain("about-intro");
    expect(html).toContain("Legalitas jelas.");
    expect(html).toContain("Publikasi lebih");
    expect(html).toContain("tenang.");
    expect(html).toContain("CV Cipta Manuskrip Media terdaftar secara resmi di Kementerian Hukum Republik Indonesia dan memiliki NPWP badan usaha.");
    expect(html).toContain("Terdaftar di Kementerian Hukum");
    expect(html).toContain("Memiliki NPWP Perusahaan");
    expect(html).toContain("Bukti pendaftaran CV");
    expect(html).toContain("NPWP perusahaan");
    expect(html).toContain("Data legalitas perusahaan dapat dipastikan keabsahannya melalui sistem resmi Kementerian Hukum.");
    expect(html).toContain('src="/aset/legalitas-cv.png"');
    expect(html).toContain('src="/aset/legalitas-npwp.png"');
    expect(html).toContain('width="443"');
    expect(html).toContain('height="552"');
    expect(html).toContain('width="520"');
    expect(html).toContain('height="312"');
    expect(html).toContain("Surat keterangan terdaftar pendirian CV Cipta Manuskrip Media");
    expect(html).toContain("Kartu NPWP badan usaha CV Cipta Manuskrip Media.");
    expect(html).not.toContain("PLACEHOLDER");
    expect(html).not.toContain("••••");
    expect(css).toContain(".about-legalitas-grid");
    expect(css).toContain(".about-legalitas-note");
    expect(css).toContain(".about-legal-paper");
    expect(css).toContain(".about-legal-card");
  });

  it("nilai kerja dan perjalanan lama diganti section tim kami sesuai referensi", () => {
    for (const lama of ["Hal-hal kecil yang", "Dari ide menuju", "about-values", "about-journey", "NILAI KERJA", "SEBUAH PERJALANAN"]) {
      expect(html).not.toContain(lama);
    }
    expect(html).toContain("02 / TIM KAMI");
    expect(html).toContain('id="tim-kami"');
    expect(html).toContain("Naskah yang baik,");
    expect(html).toContain("ditangani tim yang tepat.");
    expect(html).toContain("Editor jurnal, asisten riset, editor buku, dan admin siap mendampingi kebutuhan naskah Anda.");
    for (const [judul, isi] of [
      ["Editor Jurnal", "Menjaga mutu artikel ilmiah."],
      ["Asisten Riset Penelitian", "Mengubah topik menjadi artikel riset berkualitas."],
      ["Editor Buku", "Menyiapkan naskah buku untuk terbit."],
      ["Admin Konsultasi", "Membantu segala pertanyaan terkait publikasi."],
    ]) {
      expect(html).toContain(judul);
      expect(html).toContain(isi);
    }
    expect((html.match(/class="about-team-role"/g) ?? [])).toHaveLength(4);
    expect(html).toContain('src="/aset/tim-kami.jpg"');
    expect(html).toContain('width="1584"');
    expect(html).toContain('height="672"');
    expect(html).toContain("Ilustrasi AI · foto tim menyusul dari klien");
    expect(html).toContain("03 / HUBUNGI KAMI");
    expect(html).not.toContain("04 / HUBUNGI KAMI");
    expect(css).toContain(".about-team-roles");
  });

  it("kartu kontak memakai ikon WhatsApp, bukan ikon buku/dokumen", () => {
    const kontak = html.slice(html.indexOf('class="about-contact-grid"'), html.indexOf("about-pending"));
    expect((kontak.match(/class="about-contact-icon about-contact-icon--whatsapp"/g) ?? [])).toHaveLength(2);
    // Glif WhatsApp punya path khas; ikon telepon lucide tetap ada di kanan.
    expect((kontak.match(/d="M17\.472 14\.382/g) ?? [])).toHaveLength(2);
    expect((kontak.match(/class="lucide lucide-phone/g) ?? [])).toHaveLength(2);
    expect(kontak).not.toContain("lucide-book-open");
    expect(kontak).not.toContain("lucide-file-text");
    expect(kontak).not.toContain("about-contact-icon-journal");
    // Nomor dan label tetap persis; tautan telepon tidak berubah.
    expect(kontak).toContain("Admin Buku");
    expect(kontak).toContain("Admin Jurnal");
    expect(kontak).toContain('href="tel:0896-7189-4900"');
    expect(kontak).toContain('href="tel:0895-6292-03142"');
    expect(css).toContain(".about-contact-icon--whatsapp");
  });

  it("§7.1 banner editorial menggantikan seni CSS abstrak", () => {
    expect(html).toContain("/aset/tentang-kami.jpg");
    expect(html).toContain("about-hero-banner");
    expect(html).not.toContain("about-art-studio");
    expect(html).not.toContain("about-art-connections");
  });
});
