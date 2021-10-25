import { Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';

export const Footer = () => {
  const textColor = useColorModeValue('orange.300', 'gray.500');

  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      justifyContent="center"
      mt={{ base: 50 }}
      color={textColor}
    >
      <Text
        textAlign="center"
        fontSize={{ base: '14px', lg: '16px' }}
        fontFamily="mono"
      >
        {new Date().getFullYear()} -{' '}
        <Link href="https://captivatium.com" isExternal>
          captivatium.com
        </Link>{' '}
        - All rights reserved.
      </Text>
    </Flex>
  );
};
