import { fetchJson } from "./http";

export type UserResponse = {
    userId: string;
    email: string;
    username: string;
    name: string;
    userType: "STANDARD" | "ADMIN" | string;
}

export type RegisterRequest = {
  email: string;
  username: string;
  name: string;
  password: string;
};

export type RegisterResponse = {
  userResponse: UserResponse;
  accessToken: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  userResponse: UserResponse;
  accessToken: string;     

}


export async function register(req: RegisterRequest): Promise<RegisterResponse> {
  return fetchJson<RegisterResponse>(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
  return fetchJson<LoginResponse>(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}


