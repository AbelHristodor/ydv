import { theme, extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  colors: {
    ...theme.colors,
    whitish: '#fcfcfc',
    yellowish: {
      100: '#f5dd83',
      200: '#f3c475',
      300: '#f1ab67',
    },
    orangish: '#f0925a',
  },
  fonts: {
    ...theme.fonts,
    body: 'Caudex',
    heading: 'Alegreya Sans',
    mono: 'Salsa',
  },
  initialColorMode: 'dark',
  useSystemColorMode: false,
});
