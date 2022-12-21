import { Stack } from '@chakra-ui/react';
import Home from './Pages/Home';
import bgImage from "./Assets/bg.jpg"
function App() {
  return (
    <Stack h="100vh" bgSize={"cover"} bgRepeat={"no-repeat"} bgImage={bgImage}>
      <Home/>
    </Stack>
  );
}

export default App;
