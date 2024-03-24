export interface SearchQuery {
  id: string;
  selectedDate: string; // Date
  cameraId: string;
  name: string;
  createdAt: string; // Date
}

export interface AddNewQueryRequest {
  selectedDate: string;
  cameraId: string;
  name: string;
}

export interface GetRecentQueriesResponse {
  queries: SearchQuery[];
}
