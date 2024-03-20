export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface ImageMetadata {
  height: number;
  width: number;
  md5: string; // checksum
}

export interface TrafficCamera {
  timestamp: string; // Date
  image: string; // url
  location: Coordinates;
  cameraId: string;
  name: string;
  forecast: string;
  imageMetadata: ImageMetadata;
}

export interface GetTrafficCamerasResponse {
  cameras: TrafficCamera[];
}
