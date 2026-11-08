/**
 * Kerangka muat halaman Tentang Kami — teks tengah tanpa pill di atas,
 * banner lebar, section legalitas dua kolom + catatan, tim kami, lalu medsos.
 */
export default function Loading() {
  return (
    <div className="about-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat halaman tentang kami…</p>

      <section className="about-hero about-hero--baru" aria-hidden="true">
        <div className="about-hero-copy">
          <span className="skeleton-line" style={{ width: 190, height: 9, marginTop: 28 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "92%", height: 46, marginTop: 18 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "64%", height: 46, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "88%", height: 14, marginTop: 22 }} />
          <span className="skeleton-line" style={{ width: "72%", height: 14 }} />
          <div className="home-skeleton-actions" style={{ justifyContent: "center" }}>
            <span className="skeleton-pill" style={{ width: 196, height: 46 }} />
            <span className="skeleton-pill" style={{ width: 148, height: 46, background: "transparent" }} />
          </div>
        </div>
        <div className="about-hero-banner">
          <span className="skeleton-cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
        </div>
      </section>

      <section className="about-legalitas" aria-hidden="true">
        <div className="about-legalitas-grid">
          <div className="about-legalitas-copy">
            <span className="skeleton-line" style={{ width: 140, height: 10 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "86%", height: 44, marginTop: 22 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "68%", height: 44, marginTop: 10 }} />
            <span className="skeleton-line" style={{ width: "92%", height: 14, marginTop: 26 }} />
            <span className="skeleton-line" style={{ width: "78%", height: 14 }} />
            <div className="about-legalitas-badges">
              <span className="skeleton-pill" style={{ width: 240, height: 58, borderRadius: 12 }} />
              <span className="skeleton-pill" style={{ width: 210, height: 58, borderRadius: 12 }} />
            </div>
          </div>
          <div className="about-legalitas-visual">
            <span className="skeleton-cover" style={{ width: "100%", height: 320, borderRadius: 20 }} />
          </div>
        </div>
        <div className="about-legalitas-note">
          <span className="skeleton-line" style={{ width: "82%", height: 14, margin: 0 }} />
        </div>
      </section>

      <section className="about-team" aria-hidden="true">
        <div className="about-team-head">
          <div>
            <span className="skeleton-line" style={{ width: 140, height: 10 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "min(520px, 86%)", height: 40, marginTop: 18 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "min(460px, 72%)", height: 40, marginTop: 10 }} />
          </div>
          <span className="skeleton-line" style={{ width: "78%", height: 14 }} />
        </div>
        <div className="about-team-photo">
          <span className="skeleton-cover" style={{ width: "100%", height: 320, borderRadius: 28 }} />
        </div>
      </section>

      <section className="about-medsos" aria-hidden="true">
        <div className="about-medsos-card">
          <div>
            <span className="skeleton-line" style={{ width: 180, height: 10 }} />
            <span className="skeleton-line skeleton-title" style={{ width: 130, height: 30, marginTop: 12 }} />
            <span className="skeleton-line" style={{ width: "82%", height: 12, marginTop: 14 }} />
          </div>
          <div className="about-medsos-grid">
            {[0, 1, 2, 3].map((kotak) => (
              <span key={kotak} className="skeleton-pill" style={{ width: "100%", height: 70, borderRadius: 14 }} />
            ))}
            <span className="skeleton-pill about-medsos-item--wide" style={{ width: "100%", height: 70, borderRadius: 14 }} />
          </div>
        </div>
      </section>
    </div>
  );
}
