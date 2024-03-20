import { useEffect, useMemo, useState } from 'react';
import { Box, Input, useToast } from '@chakra-ui/react';

import { useGetTrafficCameras } from '../../services/traffic';
import TrafficCameraSelect from './TrafficCameraSelect';
import TrafficImage from './TrafficImage';
import { formatDateTimeForApi } from '../../utils.ts/dateUtil';

const TrafficCameras = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<string | undefined>();
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

  const toast = useToast();
  const { data: trafficCamerasList, isError, isLoading: isFetchingCameras } = useGetTrafficCameras(selectedDateTime);

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

  const onSelectCameraHandler = (id: string) => {
    setSelectedCameraId(id);
  };

  const onSelectDatetimeHandler = (datetime: string) => {
    const formattedDateTime = datetime ? formatDateTimeForApi(datetime) : undefined;

    setSelectedDateTime(formattedDateTime);
  };

  return (
    <Box py="4">
      <Input placeholder="Select Date and Time" size="md" type="datetime-local" onChange={(e) => onSelectDatetimeHandler(e.target.value)} />
      <TrafficCameraSelect
        isFetchingCameras={isFetchingCameras}
        trafficCamerasList={trafficCamerasList}
        onSelect={onSelectCameraHandler}
      />
      {selectedCamera && <TrafficImage selectedCamera={selectedCamera} />}
    </Box>
  );
};

export default TrafficCameras;
