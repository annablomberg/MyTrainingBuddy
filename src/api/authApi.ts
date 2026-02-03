import { fetchJson } from "./http";

export type RegisterRequest = {
  email: string;
  username: string;
  name: string;
  password: string;
};

export type RegisterResponse = {
  userResponse: {
    userId: string;
    email: string;
    username: string;
    name: string;
    userType: "STANDARD" | "ADMIN" | string;
  };
  accessToken: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  userResponse: {
    userId: string;
    email: string;
    username: string;
    name: string;
    userType: "STANDARD" | "ADMIN" | string;
  };
  accessToken: string;     

}

const API_BASE_URL = "http://localhost:8080";

export async function register(req: RegisterRequest): Promise<RegisterResponse> {
  return fetchJson<RegisterResponse>(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
  return fetchJson<LoginResponse>(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}


