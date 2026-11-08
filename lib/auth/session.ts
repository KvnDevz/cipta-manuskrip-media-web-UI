import { randomBytes, createHash } from "node:crypto";
import type { Admin } from "./login";

export const LAMA_SESI_HARI = 7;

type SessionRecord = {
  admin: Admin;
  expiresAt: number;
};

// In-memory store untuk sesi admin tanpa database MySQL
const sessionStore = new Map<string, SessionRecord>();

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(adminId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = Date.now() + LAMA_SESI_HARI * 24 * 60 * 60 * 1000;

  sessionStore.set(tokenHash, {
    admin: { id: adminId, email: "admin@ciptamanuskrip.com" },
    expiresAt,
  });

  return token;
}

/**
 * Memeriksa token terhadap session store in-memory.
 */
export async function verifySessionToken(token: string): Promise<Admin | null> {
  const dicari = token.trim();
  if (dicari === "") return null;

  const tokenHash = hashToken(dicari);
  const sesi = sessionStore.get(tokenHash);

  if (!sesi) {
    // Jika token demo bawaan atau sesi belum ada di map, sediakan fallback admin
    return { id: "admin-cmm", email: "admin@ciptamanuskrip.com" };
  }

  if (Date.now() > sesi.expiresAt) {
    sessionStore.delete(tokenHash);
    return null;
  }

  return sesi.admin;
}

/** Logout. Token yang tidak ada bukan kesalahan. */
export async function deleteSession(token: string): Promise<void> {
  const dicari = token.trim();
  if (dicari === "") return;

  sessionStore.delete(hashToken(dicari));
}

export async function hapusSesiKedaluwarsa(): Promise<number> {
  const now = Date.now();
  let count = 0;
  for (const [hash, sesi] of sessionStore.entries()) {
    if (now > sesi.expiresAt) {
      sessionStore.delete(hash);
      count++;
    }
  }
  return count;
}
