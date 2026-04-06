import { nextServer } from "./api";
import { cookies } from "next/headers";

import { GetLocationsParams, GetLocationsResponse } from "@/types/location";
import { RegisterPayload, User } from "@/types/user";
import { AxiosResponse } from "axios";
import {
  enrichFeedbackAuthors,
  normalizeLocationDetails,
  normalizeLocationFeedbacksResponse,
} from "./mappers/location-details";
import {
  LocationDetails,
  LocationFeedbacksResponse,
} from "@/types/location-details";

export const checkServerSession =
  async (): Promise<AxiosResponse<RegisterPayload> | null> => {
    try {
      const cookieStore = await cookies();

      const res = await nextServer.post<RegisterPayload>(
        "/auth/refresh",
        {},
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      return res;
    } catch {
      return null;
    }
  };

export async function getLocations(params: GetLocationsParams) {
  const response = await nextServer.get<GetLocationsResponse>("/locations", {
    params,
    withCredentials: false,
  });

  return response.data;
}

export const getLocationDetailsServer = async (
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

export const getMeServer = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};
