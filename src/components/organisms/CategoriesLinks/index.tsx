import { Stack } from '@chakra-ui/react'

import CategoryLink from 'components/molecules/CategoryLink'
import { links } from 'utils/links'

const CategoriesLinks = (): JSX.Element => {
  return (
    <Stack
      as="ul"
      direction={{ base: 'column', md: 'row' }}
      spacing={{ base: '4rem', md: '0.625rem', lg: '1.875rem' }}
      mt={{ base: '5.75rem', md: '9.25rem', lg: '12rem' }}
      px={{ base: 6, md: 10 }}
      maxW="container.xl"
      mx="auto"
    >
      {links.slice(1).map(link => (
        <CategoryLink {...link} key={link.id} />
      ))}
    </Stack>
  )
}

export default CategoriesLinks
