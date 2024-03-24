import { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Grid, GridItem, Heading, Input, Text, useToast } from '@chakra-ui/react';

import { useAddNewQuery, useGetRecentQueries } from '../../services/searchQueries';
import { useGetTrafficCameras } from '../../services/traffic';
import { SearchQuery } from '../../types/searchQueries';
import { formatAddNewQueryDateTime, formatDateTimeForApi } from '../../utils.ts/dateUtil';
import SearchQueries from '../SearchQueries';
import TrafficCameraSelect from './TrafficCameraSelect';
import TrafficImage from './TrafficImage';

const LOCAL_SEARCH_HISTORY_KEY = 'LOCAL_SEARCH_HISTORY_KEY' as const;

const TrafficCameras = () => {
  const toast = useToast();

  const [recentSearches, setRecentSearches] = useState<SearchQuery[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState<string | undefined>();
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');

  const onAddedNewQuery = (data: SearchQuery) => {
    const updatedLocal = [data, ...recentSearches];
    setRecentSearches(updatedLocal);
    localStorage.setItem(LOCAL_SEARCH_HISTORY_KEY, JSON.stringify(updatedLocal));
  };

  const { mutateAsync: addNewQuery } = useAddNewQuery(onAddedNewQuery);
  const { data: globalSearches } = useGetRecentQueries();
  const { data: trafficCamerasList, isError, isLoading: isFetchingCameras } = useGetTrafficCameras(selectedDateTime);

  const selectedCamera = useMemo(() => {
    if (!selectedCameraId) return undefined;
    const selectedId = selectedCameraId.split(',')[0];

    return trafficCamerasList?.find((camera) => camera.cameraId === selectedId);
  }, [selectedCameraId, trafficCamerasList]);

  useEffect(() => {
    const localSearches = localStorage.getItem(LOCAL_SEARCH_HISTORY_KEY);
    if (localSearches) {
      setRecentSearches(JSON.parse(localSearches));
    }
  }, []);

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

  const onSelectCameraHandler = async (identifier: string) => {
    setSelectedCameraId(identifier);
    const [id, name] = identifier.split(',');

    await addNewQuery({
      selectedDate: selectedDateTime ? formatAddNewQueryDateTime(selectedDateTime) : new Date().toISOString(),
      cameraId: id,
      name,
    });
  };

  const onSelectDatetimeHandler = (datetime: string) => {
    const formattedDateTime = datetime ? formatDateTimeForApi(datetime) : undefined;

    setSelectedDateTime(formattedDateTime);
  };

  const hasRecentQueries = recentSearches.length > 0 || (globalSearches && globalSearches.length > 0);

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
              value={selectedDateTime}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 2 }}>
        <TrafficCameraSelect
          isFetchingCameras={isFetchingCameras}
          trafficCamerasList={trafficCamerasList}
          onSelect={onSelectCameraHandler}
          selectedCameraId={selectedCameraId}
        />
      </GridItem>
      {hasRecentQueries && (
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <SearchQueries localSearches={recentSearches} globalSearches={globalSearches || []} />
        </GridItem>
      )}
      {selectedCamera && (
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <TrafficImage selectedCamera={selectedCamera} />
        </GridItem>
      )}
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
    </Grid>
  );
};

export default TrafficCameras;
