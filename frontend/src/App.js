import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { customTheme } from './customTheme';
import { MyNav } from './components/MyNav';
import { Verse } from './components/Verse';
import { TextSVG } from './components/TextSVG';
import { Footer } from './components/footer';

function App() {
  const textColor = useColorModeValue('gray.400', 'whitish');

  const opacityTransition = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 1,
        delay: 1.2,
      },
    },
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box textAlign="center" fontSize="xl">
        <MyNav />
        <Flex flexFlow="row wrap" justifyContent="space-evenly">
          <VStack>
            <TextSVG />
            <motion.div
              initial="hidden"
              animate="visible"
              variants={opacityTransition}
            >
              <Text
                fontSize="md"
                as="cite"
                fontFamily={'tenor-sans'}
                color={{}}
              >
                With <strong>God</strong> It's Better
              </Text>
            </motion.div>
          </VStack>
          <Verse transition={opacityTransition} />
        </Flex>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
