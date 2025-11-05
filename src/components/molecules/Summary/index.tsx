// src/components/organisms/Summary.tsx
import {
  Box,
  Heading,
  Text,
  Image,
  HStack,
  List,
  Button,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useEffect, MutableRefObject } from 'react'

import { cartItems } from '../../../store/CartSlice'
import { SHIPPING_FEE } from '../../../constants/fees'
import SummaryLine from '../../../components/molecules/SummaryLine'
import useCartTotals from '../../../hooks/useCartTotals'

type Props = {
  isDisabled: boolean
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
  formRef: MutableRefObject<HTMLFormElement | null>
}

const Summary = ({ isDisabled, setIsDisabled, formRef }: Props) => {
  const items = useSelector(cartItems)
  const { cartTotal, tax, grandTotal } = useCartTotals()

  useEffect(() => {
    setIsDisabled(items.length === 0)
  }, [items, setIsDisabled])

  return (
    <Box
      bg="#FFFFFF"
      borderRadius="0.5rem"
      px={{ base: '1.5rem', md: '2.0625rem' }} // 24px → 33px
      py={{ base: '2rem', md: '2.5rem' }} // 32px → 40px
      boxShadow="0 20px 40px rgba(0,0,0,0.05)"
      maxW={{ lg: '21.875rem' }} // 350px → Figma sidebar
      minW={{ sm: '100%', md: '30%' }}
    >
      {/* TITLE */}
      <Heading
        as="h2"
        fontSize="1.125rem" // 18px
        fontWeight="bold"
        letterSpacing="0.0806rem"
        textTransform="uppercase"
        mb="1.9375rem" // 31px
      >
        Summary
      </Heading>

      {/* ITEMS */}
      {items.length > 0 ? (
        <List spacing="1.5rem" mb="2rem">
          {items.map(item => (
            <HStack key={item.id} as="li" align="center">
              <Image
                src={item.cartImage}
                alt={item.shortName}
                boxSize="4rem" // 64px
                borderRadius="0.5rem"
                objectFit="cover"
                unoptimized
              />

              <Box flex={1}>
                <HStack justify="space-between">
                  <Text
                    fontWeight="bold"
                    fontSize="0.9375rem" // 15px
                    lineHeight="1.6667"
                    letterSpacing="0.0714rem"
                    color="#000000"
                    textTransform="uppercase"
                  >
                    {item.shortName}
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="0.875rem" // 14px
                    color="#000000"
                    opacity="0.5"
                  >
                    x{item.quantity}
                  </Text>
                </HStack>

                <Text
                  fontWeight="bold"
                  fontSize="0.875rem"
                  color="#000000"
                  opacity="0.5"
                  mt="-0.25rem"
                >
                  $ {item.price.toLocaleString()}
                </Text>
              </Box>
            </HStack>
          ))}
        </List>
      ) : (
        <Text
          textAlign="center"
          py="2rem"
          fontWeight="bold"
          fontSize="0.9375rem"
          color="#000000"
          opacity="0.5"
        >
          Your cart is empty
        </Text>
      )}

      {/* TOTALS */}
      <Box>
        <SummaryLine name="Total" amount={cartTotal} />
        <SummaryLine name="Shipping" amount={SHIPPING_FEE} />
        <SummaryLine name="VAT (Included)" amount={tax} />
        <SummaryLine
          name="Grand Total"
          amount={grandTotal}
          grandTotal
          mt="1.5rem"
        />
      </Box>

      {/* CTA */}
      <Button
        type="submit"
        w="100%"
        mt="2rem"
        h="3rem"
        bg="#D87D4A"
        color="#FFFFFF"
        fontSize="0.8125rem"
        fontWeight="bold"
        letterSpacing="0.0625rem"
        textTransform="uppercase"
        borderRadius="0"
        isDisabled={isDisabled}
        opacity={isDisabled ? 0.5 : 1}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        _hover={{ bg: isDisabled ? '#D87D4A' : '#FBAF85' }}
        _active={{ bg: '#D87D4A' }}
        transition="all 0.2s"
        onClick={() => formRef.current?.requestSubmit()}
      >
        Continue & Pay
      </Button>
    </Box>
  )
}

export default Summary
