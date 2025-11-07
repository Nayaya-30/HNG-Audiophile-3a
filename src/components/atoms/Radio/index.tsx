import { Box, Center, useRadio, UseRadioProps } from "@chakra-ui/react"
import { JSX, ReactNode } from "react"

interface CustomRadioProps extends UseRadioProps {
  children: ReactNode
}

const Radio = (props: CustomRadioProps): JSX.Element => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box
      as="label"
      borderWidth="1px"
      borderColor="inputBorder"
      py="1rem"
      pl="3.25rem"
      mb="1rem"
      borderRadius="0.5rem"
      fontWeight="bold"
      fontSize="0.875rem"
      display="block"
      position="relative"
      cursor="pointer"
      transition="border-color 0.2s ease"
      sx={{
        "&:focus-within": { borderColor: "accent" },
        "input:checked + div::after": { transform: "scale(1)" },
      }}
    >
      <input {...input} />
      <Center
        {...checkbox}
        w="20px"
        h="20px"
        borderWidth="1px"
        borderColor="inputBorder"
        borderRadius="full"
        position="absolute"
        left="1rem"
        _after={{
          content: "''",
          position: "absolute",
          bg: "accent",
          w: "10px",
          h: "10px",
          borderRadius: "full",
          transform: "scale(0)",
          transition: "transform 0.3s linear",
        }}
      />
      {props.children}
    </Box>
  )
}

export default Radio