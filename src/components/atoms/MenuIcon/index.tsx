import { IconButton } from "@chakra-ui/react"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { JSX } from "react"

import { isNavOpen, toggleNav } from "store/UISlice"

const MenuIcon = (): JSX.Element => {
	const navOpen = useSelector(isNavOpen)
	const dispatch = useDispatch()

	return (
		<IconButton
			aria-label={navOpen ? "Close Menu" : "Open Menu"}
			aria-expanded={navOpen}
			aria-haspopup="true"
			variant="unstyled"
			isRound
			lineHeight={0}
			mr={{ sm: "2.625rem", lg: 0 }}
			display={{ base: "inline-flex", lg: "none" }}
			onClick={() => dispatch(toggleNav())}
			icon={
				<Image
					src={
						navOpen
							? "/images/shared/tablet/icon-close-menu.svg"
							: "/images/shared/tablet/icon-hamburger.svg"
					}
					width={16}
					height={15}
					alt=""
					aria-hidden="true"
				/>
			}
		/>
	)
}

export default MenuIcon