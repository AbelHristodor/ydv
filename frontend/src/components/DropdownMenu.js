import {
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ReactCountryFlag from 'react-country-flag';

export const DropdownMenu = props => {
  const buttonColor = useColorModeValue('orangish', 'yellowish.200');
  const buttonBGColor = useColorModeValue('whitish', '');
  const dropdownColor = useColorModeValue('gray.500', 'whitish');

  const handleClick = code => {
    props.onClick(code);
  };

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bgColor={buttonBGColor}
            color={buttonColor}
            fontFamily="mono"
            fontSize={{ base: '14px', lg: '16px' }}
            _hover={{ background: 'orangish', color: 'whitish' }}
            _active={{ borderColor: 'orangish' }}
            _focus={{ borderColor: 'orangish' }}
          >
            {isOpen ? 'Change Language' : 'Change Language'}
          </MenuButton>
          <MenuList color={dropdownColor}>
            <MenuItem
              fontSize={{ base: '14px', lg: '16px' }}
              onClick={() => handleClick('it')}
              fontFamily="mono"
            >
              Italian &nbsp; <ReactCountryFlag countryCode="IT" />
            </MenuItem>
            <MenuItem
              fontSize={{ base: '14px', lg: '16px' }}
              onClick={() => handleClick('en')}
              fontFamily="mono"
            >
              English &nbsp; <ReactCountryFlag countryCode="GB" />
            </MenuItem>
            <MenuItem
              fontSize={{ base: '14px', lg: '16px' }}
              onClick={() => handleClick('ro')}
              fontFamily="mono"
            >
              Romanian &nbsp; <ReactCountryFlag countryCode="RO" />
            </MenuItem>
            <MenuItem
              fontSize={{ base: '14px', lg: '16px' }}
              onClick={() => handleClick('es')}
              fontFamily="mono"
            >
              Spanish &nbsp; <ReactCountryFlag countryCode="ES" />
            </MenuItem>
            <MenuItem
              fontSize={{ base: '14px', lg: '16px' }}
              onClick={() => handleClick('pt')}
              fontFamily="mono"
            >
              Portuguese &nbsp; <ReactCountryFlag countryCode="PT" />
            </MenuItem>
            <MenuItem
              fontSize={{ base: '14px', lg: '16px' }}
              onClick={() => handleClick('ru')}
              fontFamily="mono"
            >
              Russian &nbsp; <ReactCountryFlag countryCode="RU" />
            </MenuItem>{' '}
          </MenuList>
        </>
      )}
    </Menu>
  );
};
