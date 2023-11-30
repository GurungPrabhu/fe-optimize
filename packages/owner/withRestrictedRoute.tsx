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

const RestrictedRoute = (AuthComponent) => {
  function RestrictedComponent({ children }) {
    const { authenticated, loading } = useContext(AuthContext)

    useEffect(() => {
      if (authenticated) {
        Router.push("/")
      }
    }, [authenticated, loading])

    if (loading) {
      return (
        <LoaderWrapper>
          <Spin size={"large"} className={"loader"} />
        </LoaderWrapper>
      )
    }
    return <>{!authenticated && children}</>
  }

  return class Higher extends React.Component {
    render() {
      return (
        <RestrictedComponent>
          <AuthComponent {...this.props} />
        </RestrictedComponent>
      )
    }
  }
}

export default RestrictedRoute
