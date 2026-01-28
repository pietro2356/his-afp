import PrimeUI from 'tailwindcss-primeui';

export default {
  // Importante: usiamo 'class' per poter gestire high-contrast manualmente
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    // extend: {
    //   colors: {
    //     // Mappiamo i colori Tailwind sulle variabili PrimeNG/CSS
    //     primary: {
    //       DEFAULT: 'var(--p-primary-500)',
    //       contrast: 'var(--p-primary-contrast)',
    //     },
    //     surface: {
    //       ground: 'var(--surface-ground)',
    //       card: 'var(--surface-card)',
    //       border: 'var(--border-color)',
    //     },
    //     text: {
    //       main: 'var(--text-color)',
    //       muted: 'var(--text-color-secondary)',
    //     },
    //   },
    //   // Estendiamo i bordi per l'High Contrast
    //   borderWidth: {
    //     3: '3px', // Spesso utile in HC
    //   },
    // },
  },
  plugins: [
    PrimeUI,
    function ({ addVariant, e }) {
      addVariant('high-contrast', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.high-contrast .${e(`high-contrast${separator}${className}`)}`;
        });
      });
    },
  ],
};
