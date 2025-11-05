import { Box, Stack } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { isNavOpen, closeNav } from 'store/UISlice'
import CategoryLink from 'components/molecules/CategoryLink'
import { links } from 'utils/links'
import useClickOutside from '../../../hooks/useClickOutside'

const MobileNav = (): JSX.Element => {
  const navOpen = useSelector(isNavOpen)
  const wrapperRef = useRef<HTMLUListElement>(null) // Fixed: proper ref type
  const dispatch = useDispatch()

  // Close when clicking outside — Fixed: correct dispatch usage
  useClickOutside(wrapperRef, () => dispatch(closeNav()))

  return (
    <Box
      ref={wrapperRef}
      as="nav"
      position="absolute"
      width="100%"
      top={{ base: '5.625rem', md: '6.5rem' }}
      bg="white"
      px={{ base: '1.5rem', md: '2.5rem' }}
      pb="2rem"
      visibility={navOpen ? 'visible' : 'hidden'}
      opacity={navOpen ? '1' : '0'}
      transform={navOpen ? 'translate(0)' : 'translateY(-100%)'}
      transition="transform .5s ease-in-out, opacity .5s ease-in-out"
      zIndex="modal"
      display={{ base: 'block', lg: 'none' }}
      borderBottomRadius="0.5rem"
    >
      <Stack
        as="ul"
        direction={{ base: 'column' }}
        spacing={{ base: '4rem', md: '3.5rem' }}
        mt={{ base: '5.75rem', md: '4rem' }}
        alignItems="center"
      >
        {links.slice(1).map(link => (
          <CategoryLink {...link} key={link.id} />
        ))}
      </Stack>
    </Box>
  )
}

export default MobileNav
