import { Button } from "@chakra-ui/react"
import { JSX } from "react"

const SkipLink = (): JSX.Element => {
  return (
    <Button
      as="a"
      href="#main"
      position="absolute"
      left="1rem"
      top="6.25rem"
      zIndex="skipLink"
      transform="translateX(-200%)"
      transition="transform 0.3s ease-out"
      _focus={{
        transform: "translateX(0)",
        outline: "2px solid",
        outlineColor: "accent",
        bg: "white",
        color: "black",
      }}
      _focusVisible={{
        transform: "translateX(0)",
      }}
    >
      Skip to content
    </Button>
  )
}

export default SkipLink