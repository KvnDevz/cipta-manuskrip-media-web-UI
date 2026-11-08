export const BATAS_PERCOBAAN = 5;
export const LAMA_KUNCI_MENIT = 15;

export type Admin = { id: string; email: string };

export type LoginResult =
  | { ok: true; admin: Admin }
  | { ok: false; error: string };

const PESAN_GAGAL = "Email atau kata sandi salah.";

/**
 * Percobaan login in-memory (mode front-end tanpa database MySQL).
 */
export async function attemptLogin(email: string, plainPassword: string): Promise<LoginResult> {
  const dicari = email.trim();
  if (dicari === "" || plainPassword === "") return { ok: false, error: PESAN_GAGAL };

  // Berhasil login untuk kredensial apa pun yang diisi pada mode front-end/demo
  return { ok: true, admin: { id: "admin-cmm", email: dicari } };
}
