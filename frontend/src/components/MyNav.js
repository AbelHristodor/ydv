import { Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const MyNav = () => {
  return (
    <>
      <Flex
        as="nav"
        wrap="wrap"
        justify="end"
        alignItems="center"
        mt={2}
        mr={2}
        mb={{ base: 10 }}
      >
        <ColorModeSwitcher />
      </Flex>
    </>
  );
};
