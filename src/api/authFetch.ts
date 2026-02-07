import {fetchJson, ApiError} from "./http.ts";

const API_BASE_URL = "http://localhost:8080";

// Same as Fetch Json but adds authorization header if token is given
// This is for our CRUD endpoints

export async function authFetchJson<T>(
    path: string,
    accessToken: string | null,
    options: RequestInit = {}
): Promise<T> {
    if (!accessToken) {
        throw new ApiError("Missing access token", 401, null);
    }

    const headers: Record<string, string> = {};
    Object.assign(headers, options.headers || {});  // copy existing headers

    // FIX HERE – no leading space
    headers["Authorization"] = `Bearer ${accessToken}`;
    headers["Content-Type"] = "application/json";

    return fetchJson<T>(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });
}
