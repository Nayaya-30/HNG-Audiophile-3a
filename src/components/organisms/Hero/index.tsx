import { Box, Container, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Hero = (): JSX.Element => {
  const MotionBox = motion(Box)
  const MotionContainer = motion(Container)
  return (
    <MotionBox
      position="relative"
      bg="black"
      zIndex="1"
      overflow="hidden"
      py={{ base: '7.5rem', md: '12rem', lg: '15rem' }}
      textAlign={{ base: 'center', lg: 'left' }}
    >
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: '2' }}
        _after={{
          content: "''",
          position: 'absolute',
          background:
            "url('/images/home/mobile/image-header.jpg') center/contain no-repeat",
          width: '100%',
          height: { base: '100%', md: '110%' },
          top: { base: '5rem', md: '8rem', lg: '10rem' },
          right: 0,
          zIndex: '-1',
          '@media screen and (min-width: 30em)': {
            background:
              "url('/images/home/tablet/image-header.jpg') center/contain no-repeat",
          },
          '@media screen and (min-width: 62em)': {
            background:
              "url('/images/home/desktop/image-hero.jpg') center/contain no-repeat",
          },
        }}
      ></MotionBox>
      <MotionContainer
        maxW="container.xl"
        px={{ base: 6, md: 10 }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: '1.5',
            duration: '2',
          },
        }}
      >
        <Heading
          as="h1"
          fontSize={{ base: '2.25rem', md: '3.5rem', lg: '5rem' }}
          color="white"
          maxWidth={{ base: '15ch', lg: '12ch' }}
          mx={{ base: 'auto', lg: 0 }}
          mb={{ base: 6, lg: 8 }}
          letterSpacing={{ base: '0.0806rem', lg: '-0.15625rem' }}
          lineHeight={{ base: '1.1', lg: '1.0' }}
        >
          <Box
            as="strong"
            color="textLight"
            textTransform="uppercase"
            mb={{ base: 4, lg: 6 }}
            letterSpacing="0.625rem"
            display="block"
            fontSize="0.875rem"
          >
            New Product
          </Box>
          XX99 Mark II Headphones
        </Heading>
        <Text
          color="textLight"
          fontSize={{ base: '0.9375rem', lg: '1rem' }}
          maxWidth={{ base: '38ch', lg: '40ch' }}
          mx={{ base: 'auto', lg: 0 }}
          mb={{ base: 8, lg: 10 }}
          lineHeight={{ base: '1.7', lg: '1.7' }}
        >
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </Text>
        <Link
          href="/headphones/xx99-mark-two-headphones"
          passHref
          legacyBehavior
        >
          <Button as="a" cursor="pointer" size="lg">
            See Product
          </Button>
        </Link>
      </MotionContainer>
    </MotionBox>
  )
}

export default Hero
