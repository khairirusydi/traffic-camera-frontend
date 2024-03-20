import { useEffect, useState } from 'react';
import { Box, Select, Skeleton, useToast } from '@chakra-ui/react';

import { useGetTrafficCameras } from '../../services/traffic';

const TrafficCameras = () => {
  const toast = useToast();
  const { data: trafficCamerasList, isError, isLoading: isFetchingCameras } = useGetTrafficCameras();

  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

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
      <Skeleton isLoaded={!isFetchingCameras}>
        <Select placeholder="Select traffic camera">
          {trafficCamerasList?.map((c) => (
            <option key={c.cameraId} value={c.cameraId} onSelect={() => setSelectedCameraId(c.cameraId)}>
              {c.name}
            </option>
          ))}
        </Select>
      </Skeleton>
    </Box>
  );
};

export default TrafficCameras;
