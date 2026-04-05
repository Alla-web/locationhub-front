"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { LocationDetails } from "@/types/location-details";
import { getLocationById } from "@/lib/api/clientApi";
import LocationForm from "@/components/LocationForm/LocationForm";
import Loader from "@/components/Loader/Loader";

export default function UpdateLocation() {
  const { locationId } = useParams<{ locationId: string }>();
  const [location, setLocation] = useState<LocationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getLocationById(locationId);
        setLocation(data);
      } catch {
        toast.error("Помилка завантаження локації");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocation();
  }, [locationId]);

  if (isLoading)
    return (
      <p>
        <Loader />
      </p>
    );

  if (!location) return <p>Локацію не знайдено</p>;

  return <LocationForm location={location} />;
}
