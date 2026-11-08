/**
 * Stub pool untuk mode front-end tanpa database MySQL.
 * Tidak ada koneksi TCP/jaringan ke MySQL yang dibuat.
 */
let pool: any = null;

export function getPool(): any {
  return pool;
}

export async function closePool(): Promise<void> {
  pool = null;
}
