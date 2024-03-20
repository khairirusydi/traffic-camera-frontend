import { useQuery } from '@tanstack/react-query';

import { GetTrafficCamerasResponse, TrafficCamera } from '../types/traffic';
import ApiClient from '../utils.ts/ApiClient';

export const TrafficEndpoints = {
  GET_TRAFFIC_IMAGES: '/api/traffic/traffic-cameras',
} as const;

const getTrafficCameras = async (selectedDate?: string): Promise<TrafficCamera[]> => {
  const { data } = await ApiClient.get<GetTrafficCamerasResponse>(TrafficEndpoints.GET_TRAFFIC_IMAGES, {
    params: { selectedDate },
  });

  return data?.cameras.sort((a, b) => a.name.localeCompare(b.name));
};

export const useGetTrafficCameras = (selectedDate?: string) => {
  const query = useQuery({
    queryKey: [TrafficEndpoints.GET_TRAFFIC_IMAGES, selectedDate],
    queryFn: () => getTrafficCameras(selectedDate),
  });

  return query;
};
