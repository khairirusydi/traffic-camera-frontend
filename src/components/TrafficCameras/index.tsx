import { useEffect, useMemo, useState } from 'react';
import { Box, Select, Skeleton, useToast } from '@chakra-ui/react';

import { useGetTrafficCameras } from '../../services/traffic';
import TrafficImage from './TrafficImage';

const TrafficCameras = () => {
  const toast = useToast();
  const { data: trafficCamerasList, isError, isLoading: isFetchingCameras } = useGetTrafficCameras();

  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

  const selectedCamera = useMemo(() => {
    if (!selectedCameraId) return undefined;

    return trafficCamerasList?.find((camera) => camera.cameraId === selectedCameraId);
  }, [selectedCameraId, trafficCamerasList]);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error fetching traffic cameras',
        status: 'error',
        isClosable: true,
      });
    }
  }, [isError, toast]);

  if (isError) return null;

  return (
    <Box py="4">
      <Skeleton isLoaded={!isFetchingCameras} my="4">
        <Select placeholder="Select traffic camera" onChange={(e) => setSelectedCameraId(e.target.value)}>
          {trafficCamerasList?.map((c) => (
            <option key={c.cameraId} value={c.cameraId}>
              {c.name}
            </option>
          ))}
        </Select>
      </Skeleton>
      {selectedCamera && <TrafficImage selectedCamera={selectedCamera} />}
    </Box>
  );
};

export default TrafficCameras;
