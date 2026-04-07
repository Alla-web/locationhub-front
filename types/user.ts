import { LocationType } from "@/types/locationType";
import { Region } from "@/types/region";
import { Feedback } from "@/types/feedback";

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

interface Location {
  _id: string;
  image: string;
  name: string;
  locationTypeId: LocationType;
  regionId?: Region;
  rate?: number;
  description?: string;
  ownerId?: User;
  feedbacksId?: Feedback[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserLocationsResponse {
  data: Location[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
