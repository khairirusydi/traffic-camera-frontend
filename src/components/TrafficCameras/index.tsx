import { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Grid, GridItem, Heading, Input, Text, useToast } from '@chakra-ui/react';

import { useGetTrafficCameras } from '../../services/traffic';
import { formatDateTimeForApi } from '../../utils.ts/dateUtil';
import TrafficCameraSelect from './TrafficCameraSelect';
import TrafficImage from './TrafficImage';

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
    <Grid py="4" gap="4" templateColumns="repeat(3, 1fr)">
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <Card>
          <CardBody gap="1">
            <Heading size="md" mb="2">
              Date and Time
            </Heading>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              onChange={(e) => onSelectDatetimeHandler(e.target.value)}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <TrafficCameraSelect
          isFetchingCameras={isFetchingCameras}
          trafficCamerasList={trafficCamerasList}
          onSelect={onSelectCameraHandler}
        />
      </GridItem>
      {selectedCamera && (
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <Card>
            <CardBody>
              <Heading size="md" mb="2">
                Weather Forecast
              </Heading>
              <Text>{selectedCamera.forecast}</Text>
            </CardBody>
          </Card>
        </GridItem>
      )}
      {selectedCamera && (
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <TrafficImage selectedCamera={selectedCamera} />
        </GridItem>
      )}
    </Grid>
  );
};

export default TrafficCameras;
