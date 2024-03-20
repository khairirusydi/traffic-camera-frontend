import { Select, Skeleton } from '@chakra-ui/react';

import { TrafficCamera } from '../../types/traffic';

interface TrafficCameraSelectProps {
  isFetchingCameras: boolean;
  trafficCamerasList: TrafficCamera[] | undefined;
  onSelect: (id: string) => void;
}

const TrafficCameraSelect = ({ isFetchingCameras, trafficCamerasList, onSelect }: TrafficCameraSelectProps) => (
  <Skeleton isLoaded={!isFetchingCameras}>
    <Select placeholder="Select traffic camera" size="md" onChange={(e) => onSelect(e.target.value)}>
      {trafficCamerasList?.map((c) => (
        <option key={c.cameraId} value={c.cameraId}>
          {c.name}
        </option>
      ))}
    </Select>
  </Skeleton>
);

export default TrafficCameraSelect;
