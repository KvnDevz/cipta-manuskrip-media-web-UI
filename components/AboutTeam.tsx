/* eslint-disable @next/next/no-img-element -- foto/ilustrasi tim lokal statis di
   public/aset/; src langsung dipakai agar mudah ditimpa klien, pola sama
   dengan banner halaman publik lain. */
/**
 * Section “02 / TIM KAMI” pada /tentang-kami.
 *
 * Menggantikan dua section lama: “Hal-hal kecil yang membentuk proses.”
 * (nilai kerja) dan “Dari ide menuju bentuk yang siap dibagikan.”
 * (perjalanan). Tata letak mengikuti referensi klien: judul + pengantar
 * bersekat, lalu foto tim lebar dengan empat peran di bagian bawah.
 *
 * Foto saat ini ilustrasi AI sampai foto tim asli dikirim klien; peran
 * dan deskripsi memakai salinan persis dari referensi.
 */
const PERAN_TIM = [
  {
    judul: "Editor Jurnal",
    isi: "Menjaga mutu artikel ilmiah.",
  },
  {
    judul: "Asisten Riset Penelitian",
    isi: "Mengubah topik menjadi artikel riset berkualitas.",
  },
  {
    judul: "Editor Buku",
    isi: "Menyiapkan naskah buku untuk terbit.",
  },
  {
    judul: "Admin Konsultasi",
    isi: "Membantu segala pertanyaan terkait publikasi.",
  },
] as const;

export function AboutTeam() {
  return (
    <section className="about-team" id="tim-kami" aria-labelledby="team-title">
      <div className="about-team-head">
        <div className="about-team-title">
          <p className="about-kicker">02 / TIM KAMI</p>
          <h2 id="team-title">
            Naskah yang baik,
            <br />
            <em>ditangani tim yang tepat.</em>
          </h2>
        </div>
        <p className="about-team-intro">
          Editor jurnal, asisten riset, editor buku, dan admin siap mendampingi
          kebutuhan naskah Anda.
        </p>
      </div>

      <figure className="about-team-photo">
        <img
          src="/aset/tim-kami.jpg"
          width={1584}
          height={672}
          alt="Ilustrasi AI tim Cipta Manuskrip Media: editor jurnal menelaah naskah, asisten riset bekerja di laptop, editor buku menulis pada buku terbuka, dan admin konsultasi memakai headset di depan laptop."
          loading="lazy"
          decoding="async"
        />
        <span className="about-team-photo__catatan">
          Ilustrasi AI · foto tim menyusul dari klien
        </span>
        <figcaption className="about-team-roles">
          {PERAN_TIM.map(({ judul, isi }) => (
            <div className="about-team-role" key={judul}>
              <h3>{judul}</h3>
              <p>{isi}</p>
              <span className="about-team-rule" aria-hidden="true" />
            </div>
          ))}
        </figcaption>
      </figure>
    </section>
  );
}
