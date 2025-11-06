import { Flex, Button as ChakraButton, Center } from "@chakra-ui/react"
import { JSX } from "react"

type ProductQuantityProps = {
  quantity: number
  increment: () => void
  decrement: () => void
  width: string
  height: string
}

const ProductQuantity = ({
  quantity,
  increment,
  decrement,
  width,
  height,
}: ProductQuantityProps): JSX.Element => {
  return (
    <Flex
      bg="gray"
      align="center"
      justify="space-between"
      w={width}
      h={height}
      borderRadius="sm"
    >
      <QuantityButton label="Decrease quantity" sign="−" onClick={decrement} />
      <Center fontSize="0.8125rem" fontWeight="bold" w="20%">
        {quantity}
      </Center>
      <QuantityButton label="Increase quantity" sign="+" onClick={increment} />
    </Flex>
  )
}

type QuantityButtonProps = {
  sign: string
  label: string
  onClick: () => void
}

const QuantityButton = ({
  sign,
  label,
  onClick,
}: QuantityButtonProps): JSX.Element => {
  return (
    <ChakraButton
      aria-label={label}
      onClick={onClick}
      w="40%"
      h="100%"
      color="text"
      fontSize="0.9375rem"
      fontWeight="bold"
      border="none"
      p={0}
      bg="transparent"
      _hover={{
        bg: "lightGray",
        color: "accent",
      }}
    >
      {sign}
    </ChakraButton>
  )
}

export default ProductQuantity