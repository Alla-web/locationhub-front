import { nextServer } from "./api";
import {
  enrichFeedbackAuthors,
  normalizeLocationDetails,
  normalizeLocationFeedbacksResponse,
} from "./mappers/location-details";
import { LocationDetails, LocationFeedbacksResponse } from "@/types/location-details";

export const getLocationById = async (
  locationId: string,
): Promise<LocationDetails> => {
  const { data } = await nextServer.get(`/locations/${locationId}`);
  const location = normalizeLocationDetails(data);

  return {
    ...location,
    feedbacksId: await enrichFeedbackAuthors(
      location.feedbacksId,
      async (ownerId) => {
        const { data: user } = await nextServer.get(`/users/${ownerId}`);
        return user;
      },
    ),
  };
};

export const getLocationFeedbacks = async (
  locationId: string,
  page = 1,
  perPage = 10,
): Promise<LocationFeedbacksResponse> => {
  const { data } = await nextServer.get("/feedbacks", {
    params: {
      locationId,
      page,
      perPage,
    },
  });

  const response = normalizeLocationFeedbacksResponse(data);

  return {
    ...response,
    feedbacks: await enrichFeedbackAuthors(response.feedbacks, async (ownerId) => {
      const { data: user } = await nextServer.get(`/users/${ownerId}`);
      return user;
    }),
  };
};
