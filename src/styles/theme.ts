import { extendTheme } from '@chakra-ui/react'

import Button from './components/button'
import Text from './components/text'
import Input from './components/input'

const theme = extendTheme({
  // ===========================
  // COLORS (Exact Figma Values)
  // ===========================
  colors: {
    bg: '#fafafa',
    accent: '#d87d4a',
    accentLight: '#fbaf85',
    gray: '#f1f1f1',
    lightGray: '#d3d3d3',
    white: '#fff',
    black: '#191919',
    text: 'rgba(0,0,0,0.5)',
    textLight: 'rgba(255,255,255,0.5)',
    divider: 'rgba(255,255,255,0.1)',
    placeholder: 'rgba(0,0,0,.4)',
    inputBorder: '#CFCFCF',
    inputError: '#CD2C2C',
  },

  // ===========================
  // FONTS
  // ===========================
  fonts: {
    heading: `'Manrope', sans-serif`,
    body: `'Manrope', sans-serif`,
  },

  // ===========================
  // FONT SIZES (px values from Figma)
  // ===========================
  fontSizes: {
    overline: '0.875rem', // 14px - Overline text "NEW PRODUCT"
    h1: '5rem', // 80px - Desktop H1 (Hero, Product Title)
    h1Mobile: '2.25rem', // 36px - Mobile H1
    h2: '2.5rem', // 40px - H2 (Section Titles)
    h3: '1.75rem', // 28px - H3 (Card Labels, Features)
    h4: '1.75rem', // 28px - H4
    h5: '1.5rem', // 24px - H5
    h6: '1.125rem', // 18px - H6
    body: '1rem', // 16px - Body text (Lead Text)
    subtitle: '0.8125rem', // 13px - Subtitle/Button text
    sm: '0.75rem', // 12px - Small text (Footer, Specs)
    xs: '0.75rem', // 12px - Extra small
  },

  // ===========================
  // LINE HEIGHTS (Exact Figma Values)
  // ===========================
  lineHeights: {
    h1: '4.5rem', // 72px - H1 line height (0.9 of 80px)
    h1Mobile: '2.5rem', // 40px - Mobile H1 line height
    h2: '2.5rem', // 40px - H2 line height (1.0 of 40px)
    h3: '2.1rem', // 33.6px - H3 line height (1.2 of 28px)
    h4: '2.375rem', // 38px - H4 line height
    h5: '2.0625rem', // 33px - H5 line height
    h6: '1.5rem', // 24px - H6 line height
    body: '1.7rem', // 27.2px - Body line height (1.7 of 16px)
    overline: '1.1875rem', // 19px - Overline line height
    subtitle: '1.3rem', // 13px - Subtitle line height (1.0 of 13px)
    sm: '1.125rem', // 18px - Small text line height (1.5 of 12px)
  },

  // ===========================
  // LETTER SPACING (Exact Figma Values)
  // ===========================
  letterSpacings: {
    overline: '0.625rem', // 10px - "NEW PRODUCT" (CRITICAL)
    h1: '-0.15625rem', // -2.5px (H1 Hero, Product Title)
    h2: '0rem', // 0px (H2 Section Titles)
    h3: '0.125rem', // 2px (H3 Card Labels, Features)
    h4: '0.125rem', // 2px
    h5: '0.10625rem', // 1.7px
    h6: '0.08125rem', // 1.3px
    subtitle: '0.125rem', // 2px (Button/Nav Text)
    body: '0rem', // 0px (Normal text)
    sm: '0.0625rem', // 1px (Small Text Footer, Specs)
  },

  // ===========================
  // FONT WEIGHTS
  // ===========================
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },

  // ===========================
  // SPACING (Figma specific values)
  // ===========================
  space: {
    'hero-pt': '12rem', // 120px - Hero padding top
    'hero-pb': '9.6rem', // 96px - Hero padding bottom
    'section-sm': '3.5rem', // 56px - Small section spacing
    'section-md': '9.6rem', // 96px - Medium section spacing
    'section-lg': '12rem', // 120px - Large section spacing
    'section-xl': '12rem', // 120px - Extra large section spacing
    'category-gap': '2.2rem', // 22px - Category Card Gap
    'product-gap': '12rem', // 120px - Product Page Grid Gap
    'footer-pt': '9.6rem', // 96px - Footer Top Padding
    'footer-mt': '12rem', // 120px - Footer Margin Top
  },

  // ===========================
  // SIZES (for containers, etc.)
  // ===========================
  sizes: {
    container: {
      sm: '40rem', // 640px
      md: '48rem', // 768px
      lg: '69.375rem', // 1110px - Main content width from Figma (CRITICAL)
      xl: '90rem', // 1440px - Full design width
    },
    'content-max': '69.375rem', // 1110px
    'design-max': '90rem', // 1440px
    'hero-height': '60rem', // 600px - Hero Section Height
    'category-thumb': '18.75rem', // 300px - Category Thumbnail Height
    'product-main': '33.75rem', // 540px - Product Main Image Width
    'product-main-height': '35rem', // 560px - Product Main Image Height
    'gallery-thumb': '5.6875rem', // 91px - Gallery Thumbs
    'about-image': '14.25rem', // 228px - About Image Width
    'about-image-height': '20rem', // 320px - About Image Height
    'header-height': '5.75rem', // 92px - Header Height
  },

  // ===========================
  // BREAKPOINTS (Figma breakpoints)
  // ===========================
  breakpoints: {
    base: '0em', // 0px - Mobile first
    sm: '23.4375em', // 375px - Mobile (Figma mobile design)
    md: '48em', // 768px - Tablet (Figma tablet design)
    lg: '64em', // 1024px - Desktop start
    xl: '90em', // 1440px - Desktop (Figma desktop design)
  },

  // ===========================
  // RADIUS
  // ===========================
  radii: {
    none: '0',
    sm: '0.125rem', // 2px
    base: '0.25rem', // 4px
    md: '0.5rem', // 8px - Standard image/card radius from Figma (CRITICAL)
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
    full: '9999px',
  },

  // ===========================
  // COMPONENT STYLES
  // ===========================
  components: {
    Button,
    Text,
    Input,

    // Additional component configurations
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        color: 'black',
        textTransform: 'uppercase',
      },
      sizes: {
        h1: {
          fontSize: { base: 'h1Mobile', xl: 'h1' },
          lineHeight: { base: 'h1Mobile', xl: 'h1' },
          letterSpacing: 'h1',
        },
        h2: {
          fontSize: 'h2',
          lineHeight: 'h2',
          letterSpacing: 'h2',
        },
        h3: {
          fontSize: 'h3',
          lineHeight: 'h3',
          letterSpacing: 'h3',
        },
        h4: {
          fontSize: 'h4',
          lineHeight: 'h4',
          letterSpacing: 'h4',
        },
        h5: {
          fontSize: 'h5',
          lineHeight: 'h5',
          letterSpacing: 'h5',
        },
        h6: {
          fontSize: 'h6',
          lineHeight: 'h6',
          letterSpacing: 'h6',
        },
      },
    },

    Container: {
      baseStyle: {
        maxW: 'content-max',
        px: {
          base: '1.5rem', // 24px - Mobile container padding
          sm: '2.5rem', // 40px - Tablet container padding
          md: '2.5rem', // 40px - Tablet container padding
          lg: '1.5rem', // 24px - Desktop container padding
          xl: '1.5rem', // 24px - Desktop container padding
        },
      },
      sizes: {
        content: {
          maxW: 'content-max', // 1110px
        },
        full: {
          maxW: 'design-max', // 1440px
        },
      },
    },

    Link: {
      baseStyle: {
        color: 'black',
        textDecoration: 'none',
        transition: 'color 0.2s linear',
        _hover: {
          color: 'accent',
          textDecoration: 'none',
        },
      },
    },

    Divider: {
      baseStyle: {
        borderColor: 'divider',
        opacity: 1,
      },
    },
  },

  // ===========================
  // SHADOWS
  // ===========================
  shadows: {
    outline: 'none',
  },

  // ===========================
  // GLOBAL STYLES
  // ===========================
  styles: {
    global: {
      'html, body': {
        fontFamily: 'body',
        fontSize: 'body',
        lineHeight: 'body',
      },
      body: {
        bg: 'bg',
        color: 'black',
      },
      'h1, h2, h3': {
        textTransform: 'uppercase',
      },
      ul: {
        listStyleType: 'none',
      },
      '*::placeholder': {
        color: 'placeholder',
      },
      '*, *::before, *::after': {
        borderColor: 'gray',
      },
      'a:focus, button:focus': {
        outline: '2px dashed red',
        outlineOffset: '4px',
      },
      'a:focus:not(:focus-visible), button:focus:not(:focus-visible)': {
        outline: 'none',
      },
      // Add custom focus styles for accessibility
      '*:focus-visible': {
        outline: '2px solid',
        outlineColor: 'accent',
        outlineOffset: '2px',
      },
    },
  },
})

export default theme
