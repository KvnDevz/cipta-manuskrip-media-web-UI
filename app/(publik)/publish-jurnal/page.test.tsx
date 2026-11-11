// app/app/(publik)/publish-jurnal/page.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "./page";
import { FASILITAS_JURNAL } from "@/content/site";

/**
 * Halaman `/publish-jurnal` — brief §10, halaman statis tanpa database.
 *
 * Teks dan jangkar dikunci persis (headline, dua tombol, placeholder
 * aset, en dash pada `revisi minor–mayor`); halaman tidak boleh menambah
 * janji lain dari hasil editannya sendiri.
 */
describe("publish-jurnal", () => {
  const html = renderToStaticMarkup(<Page />);

  it("memakai headline dan subjudul sesuai Figma", () => {
    expect(html).toContain("Publikasi Artikel Ilmiah Sekali Klik");
    expect(html).toContain("Kejar Jabfung atau kelulusan? Publikasi jurnal lebih mudah dengan fast review!");
  });

  it("section keunggulan menggantikan ruang bukti publikasi dan tetap memuat fasilitas", () => {
    expect(html).toContain("KEUNGGULAN KAMI");
    expect(html).toContain("Mengapa pilih publikasi jurnal di kami?");
    expect(html).toContain("Bukti korespondensi lengkap");
    expect(html).toContain("Belum ada artikel? Tidak masalah.");
    expect(html).toContain("Prosesnya semudah beli kopi");
    expect(html).toContain("VIDEO PROSES PUBLIKASI");
    expect(html).toContain("Fasilitas");
    // Section lama beserta placeholder asetnya tidak boleh kembali.
    expect(html).not.toContain("Ruang untuk bukti publikasi.");
    expect(html).not.toContain("[Aset dari klien]");
    expect(html).not.toContain("journal-asset-card");
  });

  it("tidak mengarang klaim vendor atau indeksasi di luar brief", () => {
    // Penjaga data-jujur: github dan keanggotaan tetap tidak ada di brief.
    // OJS kini DIMINTA eksplisit oleh brief §3.2 sebagai bukti antarmuka,
    // jadi dikeluarkan dari larangan secara sempit (bukan membuka klaim baru).
    expect(html).not.toMatch(/github|keanggotaan/i);
  });

  it("§3.2 memuat foto banner dosen beserta bukti korespondensi dari klien", () => {
    expect(html).toContain("/aset/jurnal-dosen.jpg");
    expect(html).toContain("memegang laptop dengan latar teal polos");
    expect(html).not.toContain("tangan bersedekap di ruang kerja akademik");
    expect(html).toContain("bukti korespondensi");
    // Mockup teks lama tidak boleh muncul lagi setelah gambar klien dipasang.
    expect(html).not.toContain("mockup ilustrasi");
    expect(html).not.toContain("Timeline Publikasi SINTA 2</strong>");
    expect(html).not.toContain("Mockup antarmuka OJS");
    // Visual CSS abstrak sudah diganti foto.
    expect(html).not.toContain("journal-paper-front");
    expect(html).not.toContain("journal-ring-one");
  });

  it("memuat seluruh 13 fasilitas tanpa menambah janji", () => {
    for (const f of FASILITAS_JURNAL) expect(html).toContain(f);
    expect(html).toContain("Revisi Minor–Mayor");
  });

  it("kedua tombol menuju halaman yang benar", () => {
    expect(html).toContain('href="/publish-jurnal/kirim-artikel"');
    expect(html).toContain('href="/publish-jurnal/asistensi"');
    expect(html).toContain("Kirim Artikel");
    expect(html).toContain("Belum Ada Artikel");
  });
});
