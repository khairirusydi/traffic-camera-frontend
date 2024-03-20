import { useEffect, useMemo, useState } from 'react';
import { Box, useToast } from '@chakra-ui/react';

import { useGetTrafficCameras } from '../../services/traffic';
import TrafficCameraSelect from './TrafficCameraSelect';
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

  const onSelectHandler = (id: string) => {
    setSelectedCameraId(id);
  };

  return (
    <Box py="4">
      <TrafficCameraSelect
        isFetchingCameras={isFetchingCameras}
        trafficCamerasList={trafficCamerasList}
        onSelect={onSelectHandler}
      />
      {selectedCamera && <TrafficImage selectedCamera={selectedCamera} />}
    </Box>
  );
};

export default TrafficCameras;
