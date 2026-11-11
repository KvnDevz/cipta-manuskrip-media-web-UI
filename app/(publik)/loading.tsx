/**
 * Kerangka muat beranda — dipakai route group `(publik)` sebagai cadangan
 * untuk halaman yang belum punya kerangka sendiri.
 *
 * Bentuknya mengikuti hero terbaru: teks di tengah atas, lalu satu panel
 * landscape berisi dua alur foto, dan terakhir dua kartu layanan. Ruang yang
 * dipakai kerangka sama dengan ruang yang nanti diisi konten, supaya
 * perpindahan tidak terasa seperti lompatan tata letak.
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat beranda…</p>

      <div className="home-hero home-hero--foto home-hero-skeleton" aria-hidden="true">
        <div className="home-skeleton-center">
          <span className="skeleton-pill" style={{ width: 210 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(560px, 82%)", height: 46, marginTop: 22 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(360px, 58%)", height: 46, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "min(420px, 70%)", height: 13, marginTop: 24 }} />
          <div className="home-skeleton-actions">
            <span className="skeleton-pill" style={{ width: 150, height: 48 }} />
            <span className="skeleton-pill" style={{ width: 150, height: 48 }} />
          </div>
          <div className="hero-buku home-skeleton-buku" aria-hidden="true">
            <span className="skeleton-cover" style={{ width: 200, height: 220, borderRadius: 12 }} />
          </div>
        </div>
      </div>

      <div className="home-comparison-section home-hero-skeleton" aria-hidden="true">
        <div className="hero-photo-layout hero-comparison home-skeleton-hero">
          <div className="hero-photo-card home-skeleton-card home-skeleton-card--kiri">
            <span className="skeleton-line" style={{ width: 120, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "72%", height: 22, marginTop: 12 }} />
            <div className="home-skeleton-steps">
              {[0, 1, 2].map((i) => (
                <div className="home-skeleton-step" key={i}>
                  <span className="skeleton-cover" style={{ width: 52, height: 52 }} />
                  <span className="skeleton-line" style={{ width: "66%", height: 10 }} />
                </div>
              ))}
            </div>
          </div>

          <div className="hero-photo-card home-skeleton-card home-skeleton-card--kanan">
            <span className="skeleton-line" style={{ width: 140, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "82%", height: 22, marginTop: 12 }} />
            <div className="home-skeleton-steps">
              {[0, 1, 2].map((i) => (
                <div className="home-skeleton-step" key={i}>
                  <span className="skeleton-cover" style={{ width: 52, height: 52 }} />
                  <span className="skeleton-line" style={{ width: "66%", height: 10 }} />
                </div>
              ))}
            </div>
          </div>

          <span className="skeleton-pill" style={{ width: 150, height: 30, gridColumn: "1 / -1", margin: "12px auto 20px" }} />
        </div>
      </div>

      <div className="logo-marquee home-skeleton-marquee" aria-hidden="true">
        <span className="skeleton-line" style={{ width: 170, height: 9 }} />
        <div className="home-skeleton-marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span className="skeleton-cover" key={i} style={{ width: 170, height: 60 }} />
          ))}
        </div>
      </div>


      <div className="home-prinsip home-skeleton-prinsip" aria-hidden="true">
        <span className="skeleton-line" style={{ width: 190, height: 9 }} />
        <span className="skeleton-line skeleton-title" style={{ width: "min(560px, 78%)", height: 40, marginTop: 16 }} />
        <div className="prinsip-grid" style={{ marginTop: 28 }}>
          {[0, 1, 2, 3].map((i) => (
            <span className="skeleton-cover prinsip-card" key={i} style={{ height: 210 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
