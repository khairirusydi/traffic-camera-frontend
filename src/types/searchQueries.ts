export interface SearchQuery {
  id: string;
  selectedDate: string; // Date
  cameraId: string;
  createdAt: string; // Date
}

export interface AddNewQueryRequest {
  selectedDate: string;
  cameraId: string;
}
