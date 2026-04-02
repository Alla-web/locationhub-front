export interface LocationEntityRef {
  _id: string;
  name: string;
  slug?: string;
}

export interface LocationOwner {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface LocationFeedbackOwner {
  _id: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export interface LocationFeedback {
  _id: string;
  text: string;
  rate: number;
  ownerId: LocationFeedbackOwner | string;
  locationId?: string | { _id: string };
  createdAt: string;
  updatedAt: string;
}

export interface LocationDetails {
  _id: string;
  image: string;
  name: string;
  locationTypeId: LocationEntityRef;
  regionId: LocationEntityRef;
  rate: number;
  description: string;
  ownerId: LocationOwner;
  feedbacksId: LocationFeedback[];
  createdAt: string;
  updatedAt: string;
}

export interface LocationFeedbacksResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalFeedbacks: number;
  feedbacks: LocationFeedback[];
}
