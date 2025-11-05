import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

import store from 'store'
import theme from 'styles/theme'
import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'
import ModalContextProvider from 'store/ModalContextProvider'
import CartModal from 'components/organisms/CartModal'
import CheckoutModal from 'components/organisms/CheckoutModal'
import Overlay from 'components/atoms/Overlay'

const convex = new ConvexReactClient('https://hardy-poodle-311.convex.cloud')

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Provider store={store}>
        <ConvexProvider client={convex}>
          <ModalContextProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <CartModal />
            <CheckoutModal />
            <Overlay />
          </ModalContextProvider>
        </ConvexProvider>
      </Provider>
    </ChakraProvider>
  )
}
