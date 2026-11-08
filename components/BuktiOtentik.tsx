/* eslint-disable @next/next/no-img-element -- tangkapan layar statis dari klien
   di public/aset/; src langsung dipakai agar preview dan tes visual tidak
   bergantung pada image optimizer Next (pola sama dengan foto hero jurnal). */

/**
 * Bukti korespondensi untuk hero `/publish-jurnal` (brief §3.2).
 *
 * Ketiga elemen sebelumnya adalah mockup ilustrasi. Sekarang klien sudah
 * mengirim tangkapan layar, jadi kartu CSS diganti gambar asli apa adanya:
 * isi, tanggal, dan sensor/buram dari berkas sumber tidak direkayasa ulang.
 * Komponen hanya menjaga rasio intrinsic supaya gambar tidak tercrop.
 */

export function BuktiEmail() {
  return (
    <img
      className="bukti-image"
      src="/aset/bukti-jurnal-email.png"
      width={467}
      height={392}
      alt="Tangkapan layar email Gmail: artikel telah ditinjau dan penulis diminta mengirimkan revisi."
      loading="lazy"
      decoding="async"
    />
  );
}

export function BuktiTimelineSinta() {
  return (
    <img
      className="bukti-image"
      src="/aset/bukti-jurnal-timeline-sinta-2.png"
      width={486}
      height={501}
      alt="Tangkapan layar timeline publikasi Jurnal SINTA 2 dari pengiriman artikel hingga accepted dan copyediting; identitas artikel, jurnal, dan penulis disamarkan."
      loading="lazy"
      decoding="async"
    />
  );
}

export function BuktiOjs() {
  return (
    <img
      className="bukti-image"
      src="/aset/bukti-jurnal-ojs.png"
      width={811}
      height={295}
      alt="Tangkapan layar notifikasi OJS: artikel dikirimkan untuk putaran review berikutnya."
      loading="lazy"
      decoding="async"
    />
  );
}
