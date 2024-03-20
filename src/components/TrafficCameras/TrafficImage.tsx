import { Card, CardBody, Heading, Image, Stack } from '@chakra-ui/react';

import { TrafficCamera } from '../../types/traffic';

interface TrafficImageProps {
  selectedCamera: TrafficCamera;
}

const TrafficImage = ({ selectedCamera }: TrafficImageProps) => (
  <Card maxW="sm">
    <CardBody>
      <Image
        src={selectedCamera.image}
        alt={selectedCamera.name}
      />
      <Stack mt="6" spacing="3">
        <Heading size="md">{selectedCamera.name}</Heading>
      </Stack>
    </CardBody>
  </Card>
);

export default TrafficImage;
