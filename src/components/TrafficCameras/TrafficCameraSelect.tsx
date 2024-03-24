import { Card, CardBody, Heading, Select, Skeleton } from '@chakra-ui/react';

import { TrafficCamera } from '../../types/traffic';

interface TrafficCameraSelectProps {
  selectedCameraId: string;
  isFetchingCameras: boolean;
  trafficCamerasList: TrafficCamera[] | undefined;
  onSelect: (id: string) => void;
}

const TrafficCameraSelect = ({
  selectedCameraId,
  isFetchingCameras,
  trafficCamerasList,
  onSelect,
}: TrafficCameraSelectProps) => (
  <Card>
    <CardBody>
      <Skeleton isLoaded={!isFetchingCameras}>
        <Heading size="md" mb="2">
          Traffic Camera
        </Heading>
        <Select
          placeholder="Select traffic camera"
          size="md"
          onChange={(e) => onSelect(e.target.value)}
          value={selectedCameraId}
        >
          {trafficCamerasList?.map((c) => (
            <option key={c.cameraId} value={c.cameraId}>
              {c.name}
            </option>
          ))}
        </Select>
      </Skeleton>
    </CardBody>
  </Card>
);

export default TrafficCameraSelect;
