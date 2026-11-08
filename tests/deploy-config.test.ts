import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Regresi untuk kegagalan deploy "ERROR: package.json file not found".
 *
 * Sejak `ed475c7` proyek berada di akar repo: `app/` kini hanya folder route
 * Next.js. Konfigurasi build dan dokumentasi tidak boleh lagi mengarah ke
 * subfolder lama, karena panel hosting memakai Root Directory itu untuk
 * mencari `package.json`.
 */
const baca = (nama: string) => readFileSync(join(process.cwd(), nama), "utf8");

describe("konfigurasi deploy di akar repo", () => {
  it("package.json berada di akar dan memuat perintah build/start yang dipakai hosting", () => {
    const pkg = JSON.parse(baca("package.json")) as {
      scripts: Record<string, string>;
      engines?: Record<string, string>;
    };
    expect(pkg.scripts.build).toBe("next build --webpack");
    expect(pkg.scripts.start).toBe("next start");
    expect(pkg.engines?.node).toBe(">=20.9.0");

    // Entri akar lockfile disinkronkan agar `npm ci` tidak menolak instalasi.
    const lock = JSON.parse(baca("package-lock.json")) as {
      packages: { "": { engines?: Record<string, string> } };
    };
    expect(lock.packages[""].engines?.node).toBe(">=20.9.0");
  });

  it("nixpacks.toml memasang, membangun, dan menjalankan dari akar repo", () => {
    const nixpacks = baca("nixpacks.toml");
    expect(nixpacks).toContain('cmds = ["npm ci"]');
    expect(nixpacks).toContain('cmds = ["npm run build"]');
    expect(nixpacks).toContain("npm run start");
    expect(nixpacks).toContain("${PORT:-3000}");
  });

  it(".nvmrc mem-pin Node yang memenuhi syarat minimal", () => {
    expect(Number(baca(".nvmrc").trim())).toBeGreaterThanOrEqual(22);
  });

  it("README tidak lagi menyuruh masuk ke subfolder app atau menunjuk docs lama", () => {
    const readme = baca("README.md");
    expect(readme).not.toContain("cd app");
    expect(readme).not.toContain("docs/DEPLOY.md");
    expect(readme).toContain("## Deploy");
    expect(readme).toMatch(/Root Directory \/ Build Context/);
    expect(readme).toContain("ERROR: package.json file not found");
  });

  it("dokumentasi migrasi juga dijalankan dari akar repo", () => {
    expect(baca("db/README.md")).not.toContain("cd app");
  });
});
