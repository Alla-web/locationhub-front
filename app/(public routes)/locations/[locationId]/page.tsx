import { Metadata } from "next";
import { isAxiosError } from "axios";
import { notFound } from "next/navigation";
import { LocationDetailsView } from "@/components/LocationDetails/LocationDetails";
import {
  getLocationById,
  getLocationFeedbacks,
} from "@/lib/api/location-details";
import css from "./page.module.css";

type LocationDetailsPageProps = {
  params: Promise<{ locationId: string }>;
};

async function loadLocationData(locationId: string) {
  try {
    const location = await getLocationById(locationId);

    try {
      const reviewsResponse = await getLocationFeedbacks(locationId);

      return {
        location,
        reviewsResponse,
      };
    } catch {
      return {
        location,
        reviewsResponse: {
          page: 1,
          perPage: 10,
          totalPages: 0,
          totalFeedbacks: 0,
          feedbacks: [],
        },
      };
    }

  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw error;
  }
}

export async function generateMetadata({
  params,
}: LocationDetailsPageProps): Promise<Metadata> {
  const { locationId } = await params;

  try {
    const location = await getLocationById(locationId);

    return {
      title: `${location.name} | Relax Map`,
      description: location.description.slice(0, 160),
      alternates: {
        canonical: `/locations/${locationId}`,
      },
      openGraph: {
        title: `${location.name} | Relax Map`,
        description: location.description.slice(0, 160),
        url: `/locations/${locationId}`,
        images: [
          {
            url: location.image,
            width: 1200,
            height: 630,
            alt: location.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Локація | Relax Map",
      description: "Детальний опис місця відпочинку.",
    };
  }
}

export default async function LocationDetailsPage({
  params,
}: LocationDetailsPageProps) {
  const { locationId } = await params;
  const { location, reviewsResponse } = await loadLocationData(locationId);

  return (
    <section className={`section ${css.pageSection}`}>
      <div className={`container ${css.container}`}>
        <LocationDetailsView
          locationId={locationId}
          location={location}
          reviews={reviewsResponse.feedbacks}
          reviewsCount={reviewsResponse.totalFeedbacks}
        />
      </div>
    </section>
  );
}
