# Logo resmi kategori jurnal (Section 4.3)

Berkas di folder ini dipakai HANYA oleh kartu kategori jurnal di
`/publish-jurnal/kirim-artikel` dan daftar kategori di
`/publish-jurnal/asistensi`. Marquee SINTA di beranda dan `TrustPillars`
tetap memakai placeholder — jangan disamakan.

| Berkas | Sumber (diunduh lewat pencarian gambar publik) |
| --- | --- |
| `sinta.png` | Wordmark SINTA — Wikipedia Indonesia, `Logo_SINTA_Jurnal.jpg` |
| `ici.png` | Index Copernicus International — `journals.indexcopernicus.com/img/ici2.png` |
| `scopus.png` | Wordmark Scopus (Elsevier) — seeklogo.com/vector-logo/335404/scopus |
| `sjr.png` | Badge SJR / Scimago Journal & Country Rank — library.nida.ac.th |

Badge peringkat `S1`–`S4` tidak digambar ulang: warnanya (oranye, hijau,
biru, kuning) dirender lewat CSS di `components/LogoKategoriJurnal.tsx`,
karena berkas badge resmi per tingkat belum disuplai klien.

Bila klien mengirim berkas logo resmi versi mereka, timpa berkas di folder
ini dengan nama yang sama. Tidak ada perubahan kode yang diperlukan.
