// app/content/site.test.ts
import { describe, it, expect } from "vitest";
import {
  NAV_UTAMA, NAV_KANAN, TAUTAN_LAYANAN, KONTAK, PAKET_BUKU,
  FASILITAS_JURNAL, KATEGORI_JURNAL, PREVIEW_LIMIT, MARQUEE_SINTA,
  PILAR_KEPERCAYAAN,
} from "./site";

describe("content/site", () => {
  it("navbar hanya dua menu: Beranda di tengah, Tentang Kami di kanan", () => {
    expect(NAV_UTAMA).toEqual([{ label: "Beranda", href: "/" }]);
    expect([...NAV_UTAMA.map((t) => t.label), NAV_KANAN.label]).toEqual([
      "Beranda",
      "Tentang Kami",
    ]);
  });

  it("slot kanan header adalah tautan biasa Tentang Kami, bukan CTA", () => {
    expect(NAV_KANAN).toEqual({ label: "Tentang Kami", href: "/tentang-kami" });
    expect(NAV_UTAMA.some((t) => t.href === NAV_KANAN.href)).toBe(false);
  });

  it("menu footer memuat empat tautan layanan eksplisit", () => {
    expect(TAUTAN_LAYANAN.map((t) => t.href)).toEqual([
      "/publish-buku",
      "/publish-jurnal",
      "/publish-buku#asistensi",
      "/publish-jurnal/asistensi",
    ]);
    expect(TAUTAN_LAYANAN.map((t) => t.label)).toEqual([
      "Publish Buku",
      "Publish Jurnal",
      "Asistensi penulisan buku",
      "Asistensi penulisan artikel jurnal",
    ]);
    // Tidak boleh ada lagi tautan umum yang menyatukan dua asistensi.
    expect(TAUTAN_LAYANAN.some((t) => t.label === "Asistensi penulisan")).toBe(false);
  });

  it("marquee SINTA berisi enam slot placeholder", () => {
    expect(MARQUEE_SINTA.map((s) => s.label)).toEqual([
      "SINTA 1", "SINTA 2", "SINTA 3", "SINTA 4", "SINTA 5", "SINTA 6",
    ]);
    expect(new Set(MARQUEE_SINTA.map((s) => s.id)).size).toBe(6);
  });

  it("empat pilar kepercayaan Section 2.2 memakai teks persis brief", () => {
    expect(PILAR_KEPERCAYAAN.map((p) => p.judul)).toEqual([
      "Legalitas Resmi",
      "ISBN Resmi",
      "Tidak Harus Ada Naskah di Awal",
      "Distribusi Beragam",
    ]);
    expect(PILAR_KEPERCAYAAN.map((p) => p.jenisVisual)).toEqual([
      "legalitas", "isbn", "naskah", "distribusi",
    ]);
    expect(PILAR_KEPERCAYAAN[0].deskripsi).toBe(
      "CV Cipta Manuskrip Media telah resmi berbadan hukum dengan kegiatan usaha penerbitan buku dan jurnal ilmiah.",
    );
    expect(PILAR_KEPERCAYAAN[3].deskripsi).toBe(
      "Buku kamu tak hanya dijual secara cetak, tapi bisa disewa secara online juga.",
    );
  });

  it("nomor kontak memakai format tampil yang ditetapkan brief", () => {
    expect(KONTAK.adminBuku).toBe("0896-7189-4900");
    expect(KONTAK.adminJurnal).toBe("0895-6292-03142");
  });

  it("tiga tier contoh berurutan dari harga tertinggi ke terendah dan berbeda fasilitasnya", () => {
    expect(PAKET_BUKU).toHaveLength(3);
    expect(PAKET_BUKU.map((paket) => paket.nama)).toEqual([
      "Paket Eksklusif",
      "Paket Profesional",
      "Paket Dasar",
    ]);
    const harga = PAKET_BUKU.map((paket) => Number(paket.harga.replace(/[^0-9]/g, "")));
    expect(harga[0]).toBeGreaterThan(harga[1]);
    expect(harga[1]).toBeGreaterThan(harga[2]);
    expect(new Set(PAKET_BUKU.map((paket) => paket.fasilitas.join("|"))).size).toBe(3);
    expect(PAKET_BUKU.every((paket) => paket.fasilitas.length > 0)).toBe(true);
  });

  it("daftar fasilitas jurnal 13 item persis seperti brief", () => {
    expect(FASILITAS_JURNAL).toEqual([
      "LOA Cepat",
      "DOI Aktif",
      "Dokumentasi Korespondensi Lengkap",
      "Review Transparan",
      "Jurnal Non-Predator",
      "Revisi Minor–Mayor",
      "Turnitin",
      "Konversi Skripsi/Tesis/Disertasi",
      "Penerjemahan Artikel",
      "Proofreading",
      "Layout",
      "Template Artikel",
      "Garansi Terbit",
    ]);
  });

  it("tepat tiga kategori jurnal dengan en dash pada SINTA", () => {
    expect(KATEGORI_JURNAL).toEqual([
      "Jurnal Nasional Terakreditasi SINTA 1–4",
      "Jurnal Internasional Index Copernicus",
      "Jurnal Internasional Scopus dan SCImago",
    ]);
  });

  it("batas preview kecil, tetap, dan dipakai kedua preview", () => {
    expect(PREVIEW_LIMIT).toBe(3);
  });
});
