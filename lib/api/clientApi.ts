import { RegisterPayload } from "@/types/user";
import { nextServer } from "./api";
import axios from "axios";
import { LocationDetails } from "@/types/location-details";
import {
  GetLocationsParams,
  GetLocationsResponse,
  Location,
} from "@/types/location";
import { User } from "@/types/user";
import { Region } from "@/types/region";
import { CreateFeedbackPayload } from "../../types/feedback";
import { LocationType } from "@/types/locationType";
import { UpdateLocationPayload } from "@/types/location";
import { UserLocationsResponse } from "@/types/user";

export async function getLocations(params: GetLocationsParams) {
  const response = await nextServer.get<GetLocationsResponse>("/locations", {
    params,
    withCredentials: false,
  });
  return response.data;
}

export async function getLocationById(id: string) {
  const response = await nextServer.get<LocationDetails>(`/locations/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export async function createLocation(payload: FormData): Promise<Location> {
  const response = await nextServer.post<Location>("/locations", payload, {
    withCredentials: true,
  });
  return response.data;
}

export async function updateLocation(id: string, data: UpdateLocationPayload) {
  const response = await nextServer.patch<LocationDetails>(
    `/locations/${id}`,
    data,
    { withCredentials: true },
  );
  return response.data;
}

export async function getLocationTypes() {
  const response = await nextServer.get<LocationType[]>(
    "/categories/location-types",
    { withCredentials: false },
  );
  return response.data;
}

export async function getRegions() {
  const response = await nextServer.get<Region[]>("/categories/regions", {
    withCredentials: false,
  });
  return response.data;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", payload);
  return res.data;
};

export const logout = async () => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  try {
    await nextServer.post("/auth/refresh", {});
    return true;
  } catch {
    return false;
  }
};

export const fetchUserLocations = async (targetId: string, page?: number) => {
  const response = await nextServer.get<UserLocationsResponse>(
    `/users/${targetId}/places?page=${page}&limit=6`,
  );
  return response.data;
};

export const createFeedback = async (
  locationId: string,
  payload: CreateFeedbackPayload,
) => {
  const response = await axios.post(
    `/api/locations/${locationId}/feedback`,
    payload,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const getMe = async (): Promise<User | null> => {
  try {
    const res = await nextServer.get<User>("/users/me");
    return res.data;
  } catch {
    return null;
  }
};

export interface Feedback {
  _id: string;
  rate: number;
  description: string;
  userName: string;
  locationId?: {
    locationTypeId?: {
      type?: string;
    };
  };
}

interface GetFeedbacksResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalFeedbacks: number;
  feedbacks: Feedback[];
}

export const getFeedbacks = async () => {
  const response = await nextServer.get<GetFeedbacksResponse>("/feedbacks", {
    params: {
      page: 1,
      perPage: 8,
    },
    withCredentials: false,
  });

  return response.data;
};

export const register = async (userData: RegisterPayload) => {
  try {
    const response = await nextServer.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Помилка під час реєстрації:", error);
    throw error;
  }
};

export const updateProfile = async (formData: FormData): Promise<User> => {
  const response = await nextServer.patch<User>("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
