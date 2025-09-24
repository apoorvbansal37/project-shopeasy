export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface LoginRequest { email: string; password: string }
export interface RegisterRequest { name: string; email: string; password: string }


