import { User } from "./user";
import { Location } from "./location";

export interface Feedback {
  _id: string;
  rate: number;
  description: string;
  ownerId: User;
  locationId: Location;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateFeedbackPayload {
  rate: number;
  description: string;
}

export interface GetFeedbacksResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalFeedbacks: number;
  feedbacks: Feedback[];
}
