import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Locations",
  description: "All locations list page",
};

export default function Notes() {
  redirect("/locations/filter/all");

  return null;
}
