// src/components/atoms/ProductLink.tsx
import { Box, Heading, Button, Image } from '@chakra-ui/react'
import Link from 'next/link'

type Props = {
  slug: string
  name: string
  image: {
    mobile: string
    tablet: string
    desktop: string
  }
}

const ProductLink = ({ slug, name, image }: Props) => {
  return (
    <Box as="li" textAlign="center">
      {/* RESPONSIVE IMAGE */}
      <Box borderRadius="0.5rem" overflow="hidden" mb="2.5rem">
        <picture>
          <source media="(min-width: 1024px)" srcSet={image.desktop} />
          <source media="(min-width: 640px)" srcSet={image.tablet} />
          <Image
            src={image.mobile}
            alt={name}
            w="100%"
            h="7.5rem" // 120px → Figma exact
            objectFit="cover"
            loading="lazy"
          />
        </picture>
      </Box>

      {/* NAME */}
      <Heading
        as="h3"
        fontSize="1.5rem" // 24px
        fontWeight="bold"
        letterSpacing="0.1071rem" // 1.714px → Figma exact
        textTransform="uppercase"
        mb="2rem" // 32px
      >
        {name}
      </Heading>

      {/* CTA */}
      <Button
        as={Link}
        href={slug}
        bg="#D87D4A"
        color="#FFFFFF"
        fontSize="0.8125rem" // 13px
        fontWeight="bold"
        letterSpacing="0.0625rem"
        textTransform="uppercase"
        px="1.875rem"
        py="0.9375rem"
        h="3rem"
        borderRadius="0"
        _hover={{ bg: '#FBAF85' }}
        _active={{ bg: '#D87D4A' }}
        transition="background 0.2s"
      >
        See Product
      </Button>
    </Box>
  )
}

export default ProductLink
