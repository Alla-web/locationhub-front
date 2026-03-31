export interface Region {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetRegionsResponse {
  data: Region[];
}
