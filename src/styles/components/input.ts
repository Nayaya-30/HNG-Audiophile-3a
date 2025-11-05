const Input = {
  baseStyle: {
    field: {
      fontWeight: 'bold',
      borderRadius: '0.5rem',
      _placeholder: {
        color: 'placeholder',
      },
    },
  },
  sizes: {
    regular: {
      field: {
        pl: '1rem',
        py: '1rem',
        fontSize: '1rem', // 16px
      },
    },
  },
  defaultProps: {
    size: 'regular',
    focusBorderColor: 'accent',
    errorBorderColor: 'inputError',
  },
}

export default Input
