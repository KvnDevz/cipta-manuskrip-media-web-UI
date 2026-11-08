import { readdirSync } from "node:fs";
import { extname, join } from "node:path";

/**
 * Sumber logo untuk slot di tengah buku 3D.
 *
 * Sesuai arahan klien: daftar logo TIDAK ditulis di kode. Cukup taruh
 * berkas gambar di folder `public/logo/` dan ia langsung ikut rotasi.
 * Folder sengaja dibiarkan kosong dulu (hanya berisi README), sehingga
 * slot di tengah sampul tampil sebagai placeholder kosong.
 *
 * Fungsi ini hanya dipanggil dari Server Component (`BukuTigaD`).
 * `readdirSync` sengaja dipakai agar daftar logo selalu terbaca ulang saat
 * halaman dirender ulang di mode dev — menambah berkas cukup refresh.
 */
export type LogoBuku = {
  /** Nama berkas, dipakai sebagai key React (stabil & unik). */
  id: string;
  /** URL publik yang bisa langsung dipakai <img>. */
  src: string;
  /** Nama tampil yang dirapikan dari nama berkas. */
  label: string;
  /** Teks alternatif untuk pembaca layar. */
  alt: string;
};

const EKSTENSI_GAMBAR = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
  ".avif",
]);

export const DIREKTORI_LOGO_BUKU = join(process.cwd(), "public", "logo");

/** `sinta-s1_logo.png` -> `Sinta S1 Logo`. */
function labelDariBerkas(berkas: string): string {
  return berkas
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (huruf) => huruf.toUpperCase());
}

/**
 * Baca semua berkas gambar di folder logo. Mengembalikan array kosong bila
 * folder belum ada / masih kosong — tidak pernah melempar ke halaman.
 *
 * @param direktori Bisa diganti untuk keperluan pengujian.
 */
export function bacaDaftarLogoBuku(
  direktori: string = DIREKTORI_LOGO_BUKU,
): LogoBuku[] {
  let namaBerkas: string[];

  try {
    namaBerkas = readdirSync(direktori, { withFileTypes: true })
      .filter((entri) => entri.isFile())
      .map((entri) => entri.name);
  } catch {
    return [];
  }

  return namaBerkas
    .filter((nama) => EKSTENSI_GAMBAR.has(extname(nama).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "id"))
    .map((nama) => {
      const label = labelDariBerkas(nama);
      return {
        id: nama,
        src: `/logo/${encodeURIComponent(nama)}`,
        label,
        alt: `Logo ${label}`,
      };
    });
}
