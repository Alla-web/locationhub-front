import { LoginRequest, SessionResponse } from "@/types/auth";
import { RegisterPayload, User } from "@/types/user";
import axios from "axios";


export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api`,
  withCredentials: true,
});
