import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PrinsipPublikasi } from "./PrinsipPublikasi";

describe("PrinsipPublikasi", () => {
  const html = renderToStaticMarkup(<PrinsipPublikasi />);

  it("memakai judul dan pengantar sesuai referensi", () => {
    const teks = html.replace(/<[^>]*>/g, "");
    expect(html).toContain('id="prinsip-publikasi"');
    expect(html).toContain('aria-labelledby="prinsip-title"');
    expect(teks).toContain("Prinsip Publikasi CMM");
    expect(teks).toContain("Empat prinsip, satu tujuan: publikasi lebih mudah.");
    expect(teks).toContain(
      "Di Cipta Manuskrip Media, proses publikasi dibuat lebih praktis sejak langkah pertama.",
    );
  });

  it("menampilkan empat kartu bernomor dengan foto lokal", () => {
    expect((html.match(/class="prinsip-card"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="prinsip-no"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="prinsip-foto"/g) ?? [])).toHaveLength(4);
    expect(html).toContain('src="/aset/prinsip-kopi.jpg"');
    expect(html).toContain('src="/aset/prinsip-naskah.jpg"');
    expect(html).toContain('src="/aset/prinsip-ide.jpg"');
    expect(html).toContain('src="/aset/prinsip-fast-track.jpg"');
  });
});
