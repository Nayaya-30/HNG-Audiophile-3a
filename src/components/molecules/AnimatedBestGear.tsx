// src/components/molecules/AnimatedBestGear.tsx
import { Box, Heading, Text, Image } from '@chakra-ui/react'
import FadeInOnScroll from '../../components/organisms/FadeInOnScroll'

const AnimatedBestGear = () => (
  <FadeInOnScroll delay={0.2}>
    <Box
      mt={{ base: '7.5rem', lg: '12.5rem' }}
      textAlign={{ base: 'center', lg: 'left' }}
      maxW="90rem"
      mx="auto"
    >
      {/* Desktop: Image left, text right */}
      <Box
        display={{ base: 'none', lg: 'grid' }}
        gridTemplateColumns="1fr 1fr"
        gap="7.8125rem"
        alignItems="center"
      >
        <Box>
          <Heading
            as="h2"
            fontSize="2.5rem"
            fontWeight="bold"
            letterSpacing="0.0893rem"
            mb="2rem"
            maxW="24ch"
          >
            Bringing you the{' '}
            <Box as="span" color="#D87D4A">
              best
            </Box>{' '}
            audio gear
          </Heading>
          <Text
            fontSize="0.9375rem"
            lineHeight="1.6667"
            opacity="0.75"
            maxW="40ch"
          >
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </Text>
        </Box>
        <Image
          src="/images/shared/desktop/image-best-gear.jpg"
          alt="Man wearing headphones"
          borderRadius="0.5rem"
          w="100%"
        />
      </Box>

      {/* Mobile/Tablet: Text first */}
      <Box display={{ base: 'block', lg: 'none' }}>
        <Image
          src="/images/shared/mobile/image-best-gear.jpg"
          alt="Man wearing headphones"
          borderRadius="0.5rem"
          w="100%"
          mb="2.5rem"
        />
        <Heading
          as="h2"
          fontSize={{ base: '1.75rem', md: '2.5rem' }}
          fontWeight="bold"
          letterSpacing="0.1rem"
          mb="2rem"
          textAlign="center"
        >
          Bringing you the{' '}
          <Box as="span" color="#D87D4A">
            best
          </Box>
          <br />
          audio gear
        </Heading>
        <Text
          fontSize="0.9375rem"
          lineHeight="1.6667"
          opacity="0.75"
          textAlign="center"
        >
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </Text>
      </Box>
    </Box>
  </FadeInOnScroll>
)

export default AnimatedBestGear
