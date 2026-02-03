export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function tryReadJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text; 
  }
}

export async function fetchJson<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const body = await tryReadJson(res);
    throw new ApiError(`Request failed (${res.status})`, res.status, body);
  }

  return (await res.json()) as T;
}
