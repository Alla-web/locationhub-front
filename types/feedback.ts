import { User } from "./user";

export interface Feedback {
  _id: string;
  rating: number;
  text: string;
  author: string | User;
  locationName: string;
  createdAt: Date;
  updatedAt?: Date;
}
