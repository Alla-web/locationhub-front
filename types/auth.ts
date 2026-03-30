
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SessionResponse {
  success: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
}
