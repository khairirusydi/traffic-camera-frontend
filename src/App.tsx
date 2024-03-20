import { Box, Heading } from '@chakra-ui/react';

import TrafficCameras from './components/TrafficCameras';

import './App.css';

const App = () => {
  return (
    <Box p="4">
      <Heading>Traffic Camera</Heading>
      <p>To view footage of traffic conditions at specific locations, select a traffic camera below.</p>
      <TrafficCameras />
    </Box>
  );
};

export default App;
