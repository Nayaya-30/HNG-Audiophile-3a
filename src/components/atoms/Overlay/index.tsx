import { Box, Portal } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { JSX } from "react"

import { isNavOpen } from "store/UISlice"

const Overlay = (): JSX.Element => {
  const navOpen = useSelector(isNavOpen)

  return (
    <Portal>
      <Box
        position="fixed"
        inset={0}
        display={{ lg: "none" }}
        bg="blackAlpha.600"
        zIndex="overlay"
        h="100vh"
        opacity={navOpen ? 1 : 0}
        visibility={navOpen ? "visible" : "hidden"}
        transition="opacity 0.3s ease-in-out, visibility 0.3s ease-in-out"
        pointerEvents={navOpen ? "auto" : "none"}
      />
    </Portal>
  )
}

export default Overlay