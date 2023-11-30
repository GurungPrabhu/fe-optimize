import React, { useContext, useEffect } from "react"
import Router from "next/router"
import { Spin } from "antd"
import styled from "styled-components"
import { AuthContext } from "./utils/AuthContext"

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 40px;
`

const PrivateRoute = (AuthComponent) => {
  function PrivateComponent({ children }) {
    const { authenticated, loading, user } = useContext(AuthContext)

    useEffect(() => {
      const { pathname } = Router
      if (!loading) {
        if (!authenticated) {
          Router.push("/login")
          return
        }
        if (authenticated && pathname === "/") {
          Router.push("/")
        }
      }
    }, [authenticated, loading, user])

    if (loading) {
      return (
        <LoaderWrapper>
          <Spin size={"large"} className={"loader"} />
        </LoaderWrapper>
      )
    }
    return <>{authenticated && <> {children} </>} </>
  }

  return class Higher extends React.Component {
    render() {
      return (
        <PrivateComponent>
          <AuthComponent {...this.props} />
        </PrivateComponent>
      )
    }
  }
}

export default PrivateRoute
