export interface User {
  _id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  articlesAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}
