import { Feather } from "lucide-react";
import { bacaDaftarLogoBuku, type LogoBuku } from "@/lib/logo-buku";
import { BookLogoRotator } from "./BookLogoRotator";

/**
 * Ilustrasi buku 3D DUA LAPIS yang dikembalikan dari repo lama — sekarang
 * dipasang di DALAM main banner hero ("Publikasi Semudah Beli Kopi"), sesuai
 * permintaan klien berikutnya.
 *
 * Sumber asli: `app/(publik)/page.tsx` commit awal, `.book-scene` berisi
 * `.book-back` emas + `.book-front` dengan punggung buku, tepi halaman,
 * glow, dan catatan melayang. Struktur itu dipertahankan memakai kelas
 * `buku3d-*` supaya tidak bertabrakan dengan CSS lama di `globals.css`.
 *
 * Perbedaan dari versi lama:
 * - Sampul depan krem-emas mengikuti acuan gambar klien (CMM + bingkai
 *   ganda teal/emas), bukan hijau tua.
 * - Bagian tengah sampul berisi DUA slot logo tersusun ATAS–BAWAH. Keduanya
 *   masih kosong, diisi otomatis dari folder `public/logo/` dan bergeser tiap
 *   1 detik bila ada lebih dari dua berkas.
 */
export function BukuTigaD({ logos }: { logos?: LogoBuku[] }) {
  // Server Component: baca folder bila daftar tidak disuntik (mis. dari tes).
  const daftarLogo = logos ?? bacaDaftarLogoBuku();

  return (
    <div className="buku3d">
      <span className="buku3d__glow" aria-hidden="true" />

      {/* Lapisan 1/2 — buku belakang bersampul emas (dari repo lama). */}
      <div className="buku3d__belakang" aria-hidden="true">
        <span className="buku3d__punggung" />
        <span className="buku3d__garis buku3d__garis--atas" />
        <span className="buku3d__garis buku3d__garis--bawah" />
      </div>

      {/* Lapisan 2/2 — buku depan, tempat dua slot logo berada. */}
      <div className="buku3d__depan">
        <div className="buku3d__bingkai">
          <span className="buku3d__merek">CMM</span>
          <span className="buku3d__merek-rule" aria-hidden="true" />
          <BookLogoRotator logos={daftarLogo} />
          <span className="buku3d__kaki">Cipta Manuskrip Media</span>
        </div>
        <span className="buku3d__tepi" aria-hidden="true" />
      </div>

      <div className="buku3d__catatan" aria-hidden="true">
        <span className="buku3d__catatan-ikon"><Feather size={14} strokeWidth={1.7} /></span>
        <span>
          <strong>Dari ide menjadi karya</strong>
          <small>Mulai perjalanan publikasi</small>
        </span>
      </div>
    </div>
  );
}
