import { Container, Flex } from '@chakra-ui/react'

import Logo from 'components/atoms/Logo'
import MenuIcon from 'components/atoms/MenuIcon'
import CartIcon from 'components/atoms/CartIcon'
import NavLinks from '../NavLinks'

const Navbar = (): JSX.Element => {
  return (
    <Container
      bg="black"
      zIndex={10}
      position="relative"
      maxW="container.xl"
      py={{ base: 6, md: 8 }}
      px={{ base: 6, md: 10 }}
    >
      <Flex justify="space-between" alignItems="center" w="100%">
        <MenuIcon />
        <Logo />
        <NavLinks display={{ base: 'none', lg: 'flex' }} />
        <CartIcon />
      </Flex>
    </Container>
  )
}

export default Navbar
