const Text = {
  baseStyle: {
    fontWeight: 'normal',
    lineHeight: '1.66',
  },
  sizes: {
    regular: {
      fontSize: '1rem', // 16px
    },
    small: {
      fontSize: '0.75rem', // 12px
    },
  },
  variants: {
    lightBackground: {
      color: 'text',
    },
    darkBackground: {
      color: 'textLight',
    },
  },
  defaultProps: {
    variant: 'lightBackground',
    size: 'regular',
  },
}

export default Text
