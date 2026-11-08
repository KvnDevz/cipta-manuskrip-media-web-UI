// app/components/HeroPhotoCard.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroPhotoCard } from "./HeroPhotoCard";

describe("HeroPhotoCard", () => {
  const kopi = renderToStaticMarkup(<HeroPhotoCard varian="kopi" />);
  const cmm = renderToStaticMarkup(<HeroPhotoCard varian="cmm" />);

  it("kartu kopi memakai tiga foto nyata dengan teks alternatif", () => {
    expect(kopi).toContain("Beli kopi");
    expect(kopi).toContain("/hero/kopi-pilih.jpg");
    expect(kopi).toContain("/hero/kopi-bayar.jpg");
    expect(kopi).toContain("/hero/kopi-nikmati.jpg");
    expect((kopi.match(/<img/g) ?? [])).toHaveLength(3);
    expect(kopi).toContain("alt=");
  });

  it("kartu CMM memakai tiga foto nyata plus bukti otentik", () => {
    expect(cmm).toContain("Publikasi di CMM");
    expect(cmm).toContain("/hero/cmm-pilih-layanan.jpg");
    expect(cmm).toContain("/hero/cmm-bayar.jpg");
    expect(cmm).toContain("/hero/cmm-terbit.jpg");
    expect(cmm).toContain("/logo-cmm-mark.png");
    expect(cmm).toContain("Sistem OJS");
    expect(cmm).toContain("Email korespondensi");
  });

  it("tidak memuat vektor atau animasi CSS abstrak lama", () => {
    for (const html of [kopi, cmm]) {
      expect(html).not.toContain("orbit");
      expect(html).not.toContain("book-scene");
      expect(html).not.toContain("floating-note");
    }
  });
});
