const Button = {
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 0,
    letterSpacing: '0.0625rem',
  },
  sizes: {
    regular: {
      px: 8.75, // 140px at 16px base
      py: 1.5, // 24px at 16px base (48px total height)
      fontSize: '0.8125rem', // 13px
      fontWeight: '700', // 700 weight
      height: '3rem', // 48px
    },
    small: {
      px: 4, // 16px at 4px base
      py: 2, // 8px at 4px base
      fontSize: '0.8125rem',
      height: '2rem', // 32px
    },
  },
  variants: {
    primary: {
      bg: 'accent',
      color: 'white',
      _hover: {
        bg: 'accentLight',
      },
      _disabled: {
        bg: 'accent',
      },
      ':hover[disabled]': {
        bg: 'accent',
      },
      ':hover[aria-disabled="true"]': {
        bg: 'accent',
      },
    },
    secondary: {
      bg: 'transparent',
      color: 'black',
      border: '1px solid black',
      _hover: {
        bg: 'black',
        color: 'white',
      },
    },
    link: {
      background: 'transparent',
      border: 'none',
      color: 'text',
      padding: '0',
      fontWeight: 'normal',
      _hover: {
        background: 'transparent',
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  },
  defaultProps: {
    variant: 'primary',
    size: 'regular',
  },
}

export default Button
