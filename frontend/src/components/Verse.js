/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  Text,
  VStack,
  Center,
  Box,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import { DropdownMenu } from './DropdownMenu';

export const Verse = props => {
  const [verse, setVerse] = useState([]);
  const [lang, setLang] = useState('it');
  const [name, setName] = useState('');

  const reloadButtonColor = useColorModeValue('orangish', 'white');

  const languages = {
    it: 'giovanni',
    en: 'kjv',
    ro: 'cornilescu',
    ru: 'synodal',
    uk: 'ukranian',
    es: 'rv1858',
    pt: 'almeida',
  };

  const api_url = 'http://localhost:4000/api/verse/one/';
  const geoinfo_url = 'http://ip-api.com/json/';

  const fetchVerses = async () => {
    axios.get(api_url + lang).then(data => {
      const { verses, name } = data.data;
      setVerse(verses);
      setName(name);
    });
  };

  const fetchGetData = async () => {
    axios.get(geoinfo_url).then(data => {
      let countryCode = data.data.countryCode.toLowerCase;
      if (languages[countryCode]) return setLang(countryCode);
      return setLang('en');
    });
  };

  const reloadVerse = () => {
    fetchVerses();
  };

  useEffect(() => {
    if (!lang) fetchGetData();
    fetchVerses();
  }, [lang]);

  const handleClick = countryCode => {
    setLang(countryCode);
  };

  return (
    <Center
      maxWidth={{ sm: '100%', lg: '60%' }}
      width={{ sm: '100%', lg: '40%' }}
      marginTop={{ base: 20 }}
    >
      <VStack spacing={30}>
        <Box mx="4">
          <AnimatePresence>
            {verse &&
              verse.map(verse => {
                return (
                  <motion.p
                    key={verse.id}
                    exit={{ opacity: 0 }}
                    initial="hidden"
                    animate="visible"
                    variants={props.transition}
                  >
                    <Text
                      as="p"
                      key={verse.id}
                      textAlign="justify"
                      fontSize={{ base: '16px', lg: '18px' }}
                    >
                      {verse.text}
                    </Text>
                  </motion.p>
                );
              })}
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={props.transition}
              exit={{ opacity: 0 }}
              key={name}
            >
              <Text
                color="grey.600"
                as="h2"
                fontSize={{ base: '14px', lg: '16px' }}
              >
                {name}
              </Text>
            </motion.div>
          </AnimatePresence>
        </Box>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={props.transition}
        >
          <DropdownMenu onClick={code => handleClick(code)} />
          <Button
            bgColor={'inherit'}
            ml={4}
            onClick={() => reloadVerse()}
            _hover={{ backgroundColor: '' }}
            _active={{ borderColor: 'yellowish.100' }}
            _focus={{ borderColor: 'yellowish.100' }}
          >
            <RepeatIcon
              color={reloadButtonColor}
              _hover={{ color: 'orangish' }}
            />
          </Button>
        </motion.div>
      </VStack>
    </Center>
  );
};
