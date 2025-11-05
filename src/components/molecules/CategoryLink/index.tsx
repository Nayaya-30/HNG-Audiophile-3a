// src/components/atoms/CategoryLink.tsx
import { HStack, Box, Heading, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'

const CategoryLink = ({
  text,
  url,
  img,
}: {
  text: string
  url: string
  img: string
}): JSX.Element => {
  return (
    <Box
      as="li"
      bg="gray"
      textAlign="center"
      borderRadius="0.5rem"
      position="relative"
      flex="1"
      cursor="pointer"
      _focusWithin={{
        outline: '2px dashed red',
        outlineOffset: '4px',
      }}
      sx={{
        '&:hover p': { color: 'accent' },
        'a:focus': { outline: 'none' },
      }}
      minH={{ base: '15rem', md: '18rem', lg: '20rem' }}
    >
      <Link href={url} passHref legacyBehavior>
        <Box pt={{ base: '5.5rem', md: '6rem', lg: '7rem' }} pb="1.375rem">
          {/* RESPONSIVE THUMBNAIL USING <picture> */}
          <Box
            as="picture"
            position="absolute"
            top="0"
            left="50%"
            transform="translate(-50%, -40%)"
            width={{ base: '8rem', md: '9rem', lg: '10rem' }}
            height={{ base: '8rem', md: '9rem', lg: '10rem' }}
            mx="auto"
          >
            <Image
              src={img}
              alt=""
              aria-hidden="true"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </Box>

          <Heading
            as="h2"
            mb="1rem"
            fontSize={{ base: '1.75rem', md: '2.5rem', lg: '2.8rem' }}
            letterSpacing={{ base: '0.125rem', md: '0.125rem', lg: '0.2rem' }}
            fontWeight="bold"
          >
            {text}
          </Heading>

          <HStack spacing="0.8325rem" justifyContent="center" mt="2rem">
            <Text
              color="text"
              fontWeight="bold"
              fontSize="0.8125rem"
              textTransform="uppercase"
              letterSpacing="0.125rem"
            >
              Shop
            </Text>
            <Image
              src="/images/shared/desktop/icon-arrow-right.svg"
              alt=""
              aria-hidden="true"
              boxSize="0.5rem"
            />
          </HStack>
        </Box>
      </Link>
    </Box>
  )
}

export default CategoryLink
