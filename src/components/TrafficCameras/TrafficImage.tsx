import { Card, CardBody, Heading, Image } from '@chakra-ui/react';

import { TrafficCamera } from '../../types/traffic';

interface TrafficImageProps {
  selectedCamera: TrafficCamera;
}

const TrafficImage = ({ selectedCamera }: TrafficImageProps) => (
  <Card>
    <CardBody>
      <Heading size="md" mb="2">
        {selectedCamera.name}
      </Heading>
      <Image src={selectedCamera.image} alt={selectedCamera.name} />
    </CardBody>
  </Card>
);

export default TrafficImage;
