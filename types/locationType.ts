export interface LocationType {
  _id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface GetLocationTypesResponse {
  data: LocationType[];
}
