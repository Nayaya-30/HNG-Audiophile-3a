// src/components/atoms/CartIcon.tsx
'use client'

import { Button, Center } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useModal } from 'store/ModalContextProvider'
import { totalQuantity } from 'store/CartSlice'

const CartIcon = (): JSX.Element => {
  const { onCartModalOpen } = useModal()
  const quantity = useSelector(totalQuantity)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // prevent SSR mismatch

  return (
    <Button
      position="relative"
      bg="transparent"
      border="none"
      p="0"
      onClick={onCartModalOpen}
      aria-label="Show Cart"
      _hover={{ bg: 'transparent' }}
      fontWeight="normal"
    >
      <Image
        src="/images/shared/desktop/icon-cart.svg"
        width={23}
        height={21}
        aria-hidden="true"
        alt=""
      />
      {!!quantity && (
        <Center
          as="span"
          p="0.375rem" // 6px
          position="absolute"
          width="1.25rem" // 20px
          height="1.25rem" // 20px
          bg="accent"
          fontSize="0.625rem" // 10px
          borderRadius="50%"
          color="white"
          top="-0.5rem" // -8px
          right="-0.625rem" // -10px
        >
          {quantity}
        </Center>
      )}
    </Button>
  )
}

export default CartIcon
