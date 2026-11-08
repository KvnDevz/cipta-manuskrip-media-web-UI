import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, it, expect } from "vitest";
import { bacaDaftarLogoBuku } from "./logo-buku";

const direktoriSementara: string[] = [];

function buatFolder(berkas: string[]): string {
  const dir = mkdtempSync(join(tmpdir(), "logo-buku-"));
  direktoriSementara.push(dir);
  for (const nama of berkas) writeFileSync(join(dir, nama), "isi");
  return dir;
}

afterEach(() => {
  for (const dir of direktoriSementara.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

describe("bacaDaftarLogoBuku", () => {
  it("folder masih kosong (cuma README) menghasilkan slot kosong", () => {
    expect(bacaDaftarLogoBuku(buatFolder(["README.md"]))).toEqual([]);
  });

  it("folder yang belum ada tidak melempar galat", () => {
    expect(bacaDaftarLogoBuku(join(tmpdir(), "folder-yang-tidak-ada-xyz"))).toEqual([]);
  });

  it("hanya berkas gambar yang masuk, urut A–Z, label & alt otomatis", () => {
    const hasil = bacaDaftarLogoBuku(
      buatFolder(["scopus.svg", "README.md", "sinta-s1_logo.png", "catatan.txt", "Perpusnas.WEBP"]),
    );

    expect(hasil.map((l) => l.id)).toEqual([
      "Perpusnas.WEBP",
      "scopus.svg",
      "sinta-s1_logo.png",
    ]);
    expect(hasil[0]).toMatchObject({
      src: "/logo/Perpusnas.WEBP",
      label: "Perpusnas",
      alt: "Logo Perpusnas",
    });
    expect(hasil[2]).toMatchObject({
      src: "/logo/sinta-s1_logo.png",
      label: "Sinta S1 Logo",
      alt: "Logo Sinta S1 Logo",
    });
  });

  it("nama berkas ber-spasi diamankan di URL", () => {
    const [logo] = bacaDaftarLogoBuku(buatFolder(["logo resmi.png"]));
    expect(logo.src).toBe("/logo/logo%20resmi.png");
  });
});
