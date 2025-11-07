import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { JSX } from "react"

const GoBackLink = (): JSX.Element => {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      mt={{ base: "2rem", sm: "1rem", lg: "5rem" }}
      fontSize="0.9375rem"
    >
      Go back
    </Button>
  )
}

export default GoBackLink