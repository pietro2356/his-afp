import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const surfaceColors = {
  light: {
    0: '#ffffff',
    100: '#f7f7f7',
    200: '#e1e1e1',
    300: '#cfcfcf',
    400: '#b1b1b1',
    500: '#9e9e9e',
  },
  dark: {
    0: '#121212',
    100: '#1d1d1d',
    200: '#2c2c2c',
    300: '#373737',
    400: '#4a4a4a',
    500: '#5a5a5a',
  },
};

export const MyTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.300}',
      400: '{teal.400}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{teal.600}',
          contrastColor: '{teal.50}',
          hoverColor: '{teal.800}',
          activeColor: '{teal.800}',
        },
        highlight: {
          background: '{teal.950}',
          focusBackground: '{teal.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        text: {
          primary: '{teal.900}',
          secondary: '{teal.700}',
          disabled: '{teal.500}',
        },
      },
      dark: {
        primary: {
          color: '{teal.500}',
          contrastColor: '{teal.500}',
          hoverColor: '{teal.300}',
          activeColor: '{teal.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        text: {
          primary: '{teal.800}',
          secondary: '{teal.200}',
          disabled: '{teal.500}',
        },
      },
    },
  },
});
