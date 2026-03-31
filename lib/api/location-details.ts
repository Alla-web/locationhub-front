import { nextServer } from "./api";
import {
  LocationDetails,
  LocationFeedbacksResponse,
} from "@/types/location-details";

export const getLocationById = async (
  locationId: string,
): Promise<LocationDetails> => {
  const { data } = await nextServer.get<LocationDetails>(`/locations/${locationId}`);
  return data;
};

export const getLocationFeedbacks = async (
  locationId: string,
  page = 1,
  perPage = 10,
): Promise<LocationFeedbacksResponse> => {
  const { data } = await nextServer.get<LocationFeedbacksResponse>("/feedbacks", {
    params: {
      locationId,
      page,
      perPage,
    },
  });

  return data;
};
