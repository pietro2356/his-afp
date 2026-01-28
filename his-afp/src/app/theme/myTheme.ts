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
      50: '{rose.50}',
      100: '{rose.100}',
      200: '{rose.200}',
      300: '{rose.300}',
      400: '{rose.400}',
      500: '{rose.500}',
      600: '{rose.600}',
      700: '{rose.700}',
      800: '{rose.800}',
      900: '{rose.900}',
      950: '{rose.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{rose.600}',
          contrastColor: '{rose.50}',
          hoverColor: '{rose.800}',
          activeColor: '{rose.800}',
        },
        highlight: {
          background: '{rose.950}',
          focusBackground: '{rose.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        text: {
          primary: '{rose.900}',
          secondary: '{rose.700}',
          disabled: '{rose.500}',
        },
      },
      dark: {
        primary: {
          color: '{rose.500}',
          contrastColor: '{rose.500}',
          hoverColor: '{rose.300}',
          activeColor: '{rose.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        text: {
          primary: '{rose.800}',
          secondary: '{rose.200}',
          disabled: '{rose.500}',
        },
      },
    },
  },
});
