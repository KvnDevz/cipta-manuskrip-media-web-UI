/**
 * Kerangka muat halaman Publish Jurnal dan turunannya.
 *
 * Banner jurnal berlatar gelap, jadi kerangkanya memakai blok terang di atas
 * panel gelap itu — kalau tidak, bagian atas halaman tampak kosong seolah
 * gagal dimuat. Bagian bawah mengikuti deretan kartu dokumentasi dan daftar
 * fasilitas, dua bagian yang selalu ada di halaman ini.
 */
export default function Loading() {
  return (
    <div className="journal-page journal-overview" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat layanan publikasi jurnal…</p>

      <section className="journal-hero" aria-hidden="true">
        <div className="journal-hero-copy">
          <span className="skeleton-line" style={{ width: 200, height: 9, background: "rgba(255,255,255,.22)" }} />
          <span className="skeleton-line skeleton-title" style={{ width: "92%", height: 46, marginTop: 24, background: "rgba(255,255,255,.18)" }} />
          <span className="skeleton-line skeleton-title" style={{ width: "66%", height: 46, marginTop: 12, background: "rgba(255,255,255,.18)" }} />
          <span className="skeleton-line" style={{ width: "88%", height: 12, marginTop: 24, background: "rgba(255,255,255,.14)" }} />
          <span className="skeleton-line" style={{ width: "70%", height: 12, background: "rgba(255,255,255,.14)" }} />
          <div className="home-skeleton-actions" style={{ justifyContent: "flex-start" }}>
            <span className="skeleton-pill" style={{ width: 150, height: 48, background: "rgba(255,255,255,.2)" }} />
            <span className="skeleton-pill" style={{ width: 168, height: 48, background: "rgba(255,255,255,.12)" }} />
          </div>
        </div>
        <div className="journal-hero-visual">
          <span className="skeleton-cover" style={{ width: "min(240px, 70%)", aspectRatio: "1", height: "auto", borderRadius: "50%", background: "rgba(255,255,255,.1)" }} />
        </div>
      </section>

      <section className="journal-advantages-section" aria-hidden="true">
        <div className="journal-advantages-head">
          <span className="skeleton-line" style={{ width: 140, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(440px, 86%)", height: 32, marginTop: 14 }} />
        </div>
        <div className="journal-advantages-grid">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="journal-advantage-card">
              <span className="skeleton-pill" style={{ width: 46, height: 46, borderRadius: 12 }} />
              <span className="skeleton-line" style={{ width: 26, height: 9, marginTop: 16 }} />
              <span className="skeleton-line skeleton-title" style={{ width: "82%", height: 18, marginTop: 10 }} />
              <span className="skeleton-line" style={{ width: "96%", height: 11, marginTop: 14 }} />
              <span className="skeleton-line" style={{ width: "64%", height: 11 }} />
            </div>
          ))}
        </div>
        <div className="journal-video journal-video--skeleton">
          <span className="skeleton-cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
        </div>
      </section>

      <section className="journal-facilities-section" aria-hidden="true">
        <div className="journal-facilities-heading">
          <div>
            <span className="skeleton-line" style={{ width: 150, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: 200, height: 32, marginTop: 14 }} />
          </div>
          <span className="skeleton-line" style={{ width: 220, height: 12 }} />
        </div>
        <ul className="journal-facilities-grid">
          {Array.from({ length: 9 }, (_, i) => (
            <li key={i} className="journal-facility">
              <span className="skeleton-line" style={{ width: 20, height: 10, marginTop: 0 }} />
              <span className="skeleton-pill" style={{ width: 24, height: 24, borderRadius: "50%" }} />
              <span className="skeleton-line" style={{ width: "62%", height: 11, marginTop: 0 }} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
