# Field 2 logo — tengah buku 3D di hero

Folder ini **sengaja dikosongkan dulu**. Di tengah sampul buku 3D pada
**main banner hero** ("Publikasi Semudah Beli Kopi") ada **DUA slot logo
tersusun atas–bawah** yang saat ini keduanya tampil sebagai bingkai kosong
bertuliskan "Slot kosong".

## Cara mengisi

1. Taruh berkas logo di folder ini. Contoh: `public/logo/sinta-s1.png`,
   `public/logo/scopus.png`, `public/logo/perpusnas.png`.
2. Refresh halaman beranda — **tidak perlu mengubah kode sama sekali**.
3. Dua logo **tampil bersamaan secara vertikal (atas–bawah)**. Bila ada lebih dari dua berkas, pasangannya
   bergeser otomatis **setiap 1 detik** mengikuti urutan nama berkas A–Z:
   `A+B → B+C → C+A → …` sehingga semua logo sempat tampil.

| Jumlah berkas | Yang tampil |
| --- | --- |
| 0 | Dua slot kosong |
| 1 | Logo di slot 1, slot 2 tetap kosong (tidak diduplikat) |
| 2 | Keduanya tampil, posisinya bertukar tiap detik |
| 3+ | Pasangan bergeser tiap detik + penanda titik aktif |

## Yang didukung

- Ekstensi: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.gif`, `.avif`
- Berkas lain (termasuk `README.md` ini) diabaikan.
- Nama berkas otomatis jadi label & teks alternatif, misalnya
  `sinta-s1.png` → **"Sinta S1"**, `scopus.png` → **"Scopus"**.
  Gunakan nama berkas yang deskriptif agar hasilnya rapi.
- Gambar ditampilkan dengan `object-fit: contain`, jadi logo persegi,
  lebar, maupun tinggi tetap pas di dalam slot.

## Catatan

- Rotasi dihentikan otomatis bila pengunjung mengaktifkan
  `prefers-reduced-motion` (pasangan pertama yang ditampilkan).
- Di mode produksi, daftar berkas dibaca saat halaman dirender. Tambah atau
  hapus logo sebaiknya diikuti build ulang agar berkas baru ikut ter-deploy.
- Mohon hanya pakai **logo resmi/asli** dari pemiliknya. Placeholder di
  komponen sengaja bukan tiruan logo.
