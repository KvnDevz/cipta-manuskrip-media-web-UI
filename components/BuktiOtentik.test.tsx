import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BuktiEmail, BuktiTimelineSinta, BuktiOjs } from "./BuktiOtentik";

/**
 * Bukti korespondensi hero `/publish-jurnal` (brief §3.2).
 *
 * Klien sudah mengirim tangkapan layar, jadi yang dijaga bukan lagi teks
 * mockup: sumber gambar harus tepat, rasio intrinsic dibawa agar tidak
 * tercrop, dan alt menjelaskan isi tanpa mengarang detail yang disensor.
 */
describe("BuktiOtentik", () => {
  it("gambar bukti memakai sudut rounded dan rasio utuh, bukan crop", () => {
    const css = readFileSync(join(process.cwd(), "app/home-sections.css"), "utf8");
    const rule = css.match(/\.bukti-image\s*\{[^}]+\}/)?.[0] ?? "";

    expect(rule).toContain("border-radius: 16px");
    expect(rule).toContain("width: 100%");
    expect(rule).toContain("height: auto");
    expect(rule).toContain("object-fit: contain");
  });

  it("email: memakai tangkapan layar inbox dari klien dengan rasio utuh", () => {
    const html = renderToStaticMarkup(<BuktiEmail />);
    expect(html).toContain('src="/aset/bukti-jurnal-email.png"');
    expect(html).toContain('width="467"');
    expect(html).toContain('height="392"');
    expect(html).toContain("artikel telah ditinjau");
    expect(html).toContain("mengirimkan revisi");
    expect(html).not.toContain("mockup");
  });

  it("timeline SINTA 2: memakai tangkapan layar timeline, bukan daftar tahap karangan", () => {
    const html = renderToStaticMarkup(<BuktiTimelineSinta />);
    expect(html).toContain('src="/aset/bukti-jurnal-timeline-sinta-2.png"');
    expect(html).toContain('width="486"');
    expect(html).toContain('height="501"');
    expect(html).toContain("timeline publikasi Jurnal SINTA 2");
    expect(html).toContain("disamarkan");
    expect(html).not.toContain("tanggal menyusul");
    expect(html).not.toContain("bukan data riwayat");
  });

  it("OJS: memakai tangkapan layar notifikasi review berikutnya", () => {
    const html = renderToStaticMarkup(<BuktiOjs />);
    expect(html).toContain('src="/aset/bukti-jurnal-ojs.png"');
    expect(html).toContain('width="811"');
    expect(html).toContain('height="295"');
    expect(html).toContain("notifikasi OJS");
    expect(html).toContain("putaran review berikutnya");
    expect(html).not.toContain("Mockup antarmuka OJS");
  });
});
