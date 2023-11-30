import Head from "next/head"
import { Button, auth } from "@project/shared"
import { theme } from "@project/shared/src/theme"
import styled from "styled-components"
import PrivateRoute from "../withPrivateRoute"
import { signOut } from "firebase/auth"
import { useContext } from "react"
import { AuthContext } from "../utils/AuthContext"

const Container = styled.section`
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
`

function Home() {
  const { setUser } = useContext(AuthContext)

  const handleSignOut = () => {
    signOut(auth)
    setUser(null)
  }

  return (
    <>
      <Head>
        <title>{"HomePage | Next Owner Skeleton"}</title>
      </Head>
      <Container>
        <h1 className={"title"}>{"Home Page"}</h1>
        <Button
          minheight={40}
          fontSize={"16px"}
          bordercolor={theme.alert}
          onClick={handleSignOut}
        >
          {"Log Out"}
        </Button>
      </Container>
    </>
  )
}

export default PrivateRoute(Home)
