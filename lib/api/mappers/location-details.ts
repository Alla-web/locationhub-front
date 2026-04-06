import {
  LocationDetails,
  LocationEntityRef,
  LocationFeedback,
  LocationFeedbackOwner,
  LocationOwner,
  LocationFeedbacksResponse,
} from "@/types/location-details";

type RawRecord = Record<string, unknown>;

function isRecord(value: unknown): value is RawRecord {
  return typeof value === "object" && value !== null;
}

function isLikelyObjectId(value: string) {
  return /^[a-f0-9]{24}$/i.test(value);
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function hasFeedbackOwnerName(owner: LocationFeedbackOwner | string) {
  return (
    typeof owner !== "string" &&
    Boolean(owner.name?.trim() || owner.email?.trim())
  );
}

function normalizeEntityRef(value: unknown): LocationEntityRef {
  if (typeof value === "string") {
    return {
      _id: isLikelyObjectId(value) ? value : "",
      name: isLikelyObjectId(value) ? "" : value,
    };
  }

  if (!isRecord(value)) {
    return { _id: "", name: "" };
  }

  return {
    _id: getString(value._id ?? value.id),
    name: getString(value.name ?? value.region ?? value.type ?? value.title),
    slug: getString(value.slug) || undefined,
  };
}

function normalizeOwner(value: unknown): LocationOwner {
  if (typeof value === "string") {
    return { _id: value };
  }

  if (!isRecord(value)) {
    return { _id: "" };
  }

  return {
    _id: getString(value._id ?? value.id),
    name: getString(value.name ?? value.userName ?? value.username) || undefined,
    email: getString(value.email) || undefined,
    avatarUrl: getString(value.avatarUrl ?? value.avatar) || undefined,
  };
}

function normalizeFeedbackOwner(value: unknown): LocationFeedbackOwner | string {
  if (typeof value === "string") {
    return value;
  }

  if (!isRecord(value)) {
    return "";
  }

  return {
    _id: getString(value._id ?? value.id),
    name: getString(value.name ?? value.userName ?? value.username) || undefined,
    email: getString(value.email) || undefined,
    avatarUrl: getString(value.avatarUrl ?? value.avatar) || undefined,
  };
}

function normalizeFeedback(item: unknown): LocationFeedback {
  const feedback = isRecord(item) ? item : {};
  const locationValue = feedback.locationId ?? feedback.location;

  return {
    _id: getString(feedback._id ?? feedback.id),
    text: getString(feedback.text ?? feedback.description ?? feedback.comment),
    rate: Number(feedback.rate ?? feedback.rating ?? 0),
    ownerId: normalizeFeedbackOwner(
      feedback.ownerId ??
        feedback.userId ??
        feedback.user ??
        feedback.author ??
        feedback.userName,
    ),
    locationId: isRecord(locationValue)
      ? { _id: getString(locationValue._id ?? locationValue.id) }
      : getString(locationValue) || undefined,
    createdAt: getString(feedback.createdAt),
    updatedAt: getString(feedback.updatedAt),
  };
}

export function normalizeLocationDetails(data: unknown): LocationDetails {
  const location = isRecord(data) ? data : {};
  const feedbacks = Array.isArray(location.feedbacksId)
    ? location.feedbacksId
    : Array.isArray(location.feedbacks)
      ? location.feedbacks
      : [];

  return {
    _id: getString(location._id ?? location.id),
    image: getString(location.image),
    name: getString(location.name),
    locationTypeId: normalizeEntityRef(
      location.locationTypeId ?? location.locationType,
    ),
    regionId: normalizeEntityRef(location.regionId ?? location.region),
    rate: Number(location.rate ?? location.rating ?? 0),
    description: getString(location.description),
    ownerId: normalizeOwner(location.ownerId ?? location.owner ?? location.user),
    feedbacksId: feedbacks.map(normalizeFeedback),
    createdAt: getString(location.createdAt),
    updatedAt: getString(location.updatedAt),
  };
}

export function normalizeLocationFeedbacksResponse(
  data: unknown,
): LocationFeedbacksResponse {
  const response = isRecord(data) ? data : {};
  const feedbacks = Array.isArray(response.feedbacks)
    ? response.feedbacks
    : Array.isArray(response.data)
      ? response.data
      : [];

  return {
    page: Number(response.page ?? 1),
    perPage: Number(response.perPage ?? 10),
    totalPages: Number(response.totalPages ?? 0),
    totalFeedbacks: Number(
      response.totalFeedbacks ?? response.total ?? feedbacks.length,
    ),
    feedbacks: feedbacks.map(normalizeFeedback),
  };
}

export async function enrichFeedbackAuthors(
  feedbacks: LocationFeedback[],
  fetchUserById: (ownerId: string) => Promise<unknown>,
) {
  const ownerIds = Array.from(
    new Set(
      feedbacks
        .map((feedback) => feedback.ownerId)
        .filter(
          (ownerId): ownerId is string =>
            typeof ownerId === "string" && isLikelyObjectId(ownerId),
        ),
    ),
  );

  if (ownerIds.length === 0) {
    return feedbacks;
  }

  const users = await Promise.all(
    ownerIds.map(async (ownerId) => {
      try {
        const data = await fetchUserById(ownerId);
        const user = isRecord(data) ? data : {};

        return [
          ownerId,
          {
            _id: ownerId,
            name: getString(user.name ?? user.userName ?? user.username) || undefined,
            email: getString(user.email) || undefined,
            avatarUrl: getString(user.avatarUrl ?? user.avatar) || undefined,
          } satisfies LocationFeedbackOwner,
        ] as const;
      } catch {
        return [ownerId, null] as const;
      }
    }),
  );

  const usersMap = new Map(users);

  return feedbacks.map((feedback) => {
    if (
      hasFeedbackOwnerName(feedback.ownerId) ||
      typeof feedback.ownerId !== "string"
    ) {
      return feedback;
    }

    const user = usersMap.get(feedback.ownerId);

    if (!user) {
      return feedback;
    }

    return {
      ...feedback,
      ownerId: user,
    };
  });
}
