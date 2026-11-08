export { getPool, closePool } from "./pool";

export async function query<T>(_sql: string, _params: unknown[] = []): Promise<T[]> {
  return [];
}

export type ExecuteResult = {
  affectedRows: number;
  insertId: number;
};

export async function execute(_sql: string, _params: unknown[] = []): Promise<ExecuteResult> {
  return { affectedRows: 0, insertId: 0 };
}
