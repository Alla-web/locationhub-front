import { User } from "./user";
import { LocationType } from "./locationType";
import { Region } from "./region";
import { Feedback } from "./feedback";

export interface Location {
  _id: string;
  image: string;
  name: string;
  locationTypeId: LocationType;
  regionId: Region;
  rate: number;
  description: string;
  ownerId: User;
  feedbacksId: Feedback[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface LocationFilters {
  regionId: string;
  locationTypeId: string;
  sort: string;
}

export interface GetLocationsParams {
  page?: number;
  perPage?: number;
  search?: string;
  regionId?: string;
  locationTypeId?: string;
  sort?: string;
}

export interface GetLocationsResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalLocations: number;
  locations: Location[];
}

export interface CreateLocationPayload {
  image: string;
  name: string;
  regionId: string;
  locationTypeId: string;
  description: string;
}

export interface UpdateLocationPayload {
  name?: string;
  description?: string;
  image?: string;
  regionId?: string;
  locationTypeId?: string;
}
