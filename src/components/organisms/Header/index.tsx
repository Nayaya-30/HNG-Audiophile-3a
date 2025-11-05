import { Box } from '@chakra-ui/react'

import Navbar from 'components/molecules/Navbar'
import MobileNav from 'components/molecules/MobileNav'
import SkipLink from 'components/atoms/SkipLink'

const Header = (): JSX.Element => {
  return (
    <Box
      as="header"
      bg="black"
      py={{ base: 6, md: 8 }}
      borderBottom={{ base: '1px', md: 'unset' }}
      borderColor="divider"
      position="relative"
    >
      <SkipLink />
      <Navbar />
      <Box
        className="absolute bottom-0 left-0 w-full h-[2px] bg-light-gray opacity-50"
        display={{ base: 'none', md: 'block' }}
      />
      <MobileNav />
    </Box>
  )
}

export default Header
