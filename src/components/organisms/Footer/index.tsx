import { Box, Container, Text, Stack, SimpleGrid } from '@chakra-ui/react'

import Logo from 'components/atoms/Logo'
import FooterLinks from 'components/molecules/FooterLinks'
import SocialLinks from 'components/molecules/SocialLinks'

const Footer = (): JSX.Element => {
  return (
    <Box
      as="footer"
      mt={{ base: '7.5rem', md: '6rem', lg: '12rem' }}
      bg="black"
      textAlign={{ base: 'center', md: 'left' }}
    >
      <Container
        pt={{ base: '3.25rem', md: '3.75rem', lg: '9.6rem' }}
        pb={{ base: '2rem', md: '3rem', lg: '9.6rem' }}
        maxW="container.xl"
        position="relative"
        px={{ base: 6, md: 10 }}
        _before={{
          content: '""',
          position: 'absolute',
          height: '0.25rem',
          width: '6.25rem',
          bg: 'accent',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          '@media screen and (min-width: 30em)': {
            transform: 'translateX(0)',
            left: '2.5rem',
          },
          '@media screen and (min-width: 64em)': {
            left: '1.5rem',
          },
        }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '3rem', md: '2rem' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
        >
          <Logo />
          <FooterLinks />
        </Stack>
        <SimpleGrid
          templateColumns={{ base: '1fr', md: '50% 1fr' }}
          templateAreas={{
            base: '"a""b""c"',
            md: '"a a""b c"',
            lg: '"a c""b c"',
          }}
          gap={{ base: '3rem', md: '2rem', lg: '3rem' }}
          mt={{ base: '3rem', lg: '12rem' }}
        >
          <Text
            variant="darkBackground"
            gridArea={{ base: 'a' }}
            maxW={{ lg: '33.75rem' }}
            lineHeight={{ base: '1.7', lg: '1.7' }}
          >
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we’re open 7 days a week.
          </Text>
          <Text
            variant="darkBackground"
            gridArea={{ base: 'b' }}
            mt={{ base: '2rem', lg: 0 }}
          >
            Copyright 2021. All Rights Reserved
          </Text>
          <Box
            gridArea={{ base: 'c' }}
            justifySelf={{ base: 'center', md: 'end' }}
            alignSelf={{ base: 'center', md: 'center' }}
            mt={{ base: '2rem', lg: 0 }}
          >
            <SocialLinks />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Footer
