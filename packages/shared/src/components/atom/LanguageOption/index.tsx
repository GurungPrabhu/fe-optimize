import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"

const Wrapper = styled.div<any>`
  position: absolute;
  right: 0;
  top: 45%;
  button {
    padding: 15px;
    border: 0px;
    border-radius: 50% 0% 0% 50%;
    background: ${(props) => (props.isJapanese ? "blue" : "grey")};
    color: ${(props) => (props.isJapanese ? "white" : "white")};
    text-transform: uppercase;
  }
`

const LanguageOption = () => {
  const [language, setLanguage] = useState(undefined)
  const router = useRouter()
  useEffect(() => {
    const currentLanguage = localStorage?.getItem("i18nextLng")
    setLanguage(currentLanguage)
  }, [])

  const handleClick = () => {
    const currentLanguage = localStorage?.getItem("i18nextLng")
    localStorage.setItem("i18nextLng", currentLanguage === "en" ? "ja" : "en")
    router.reload()
  }

  return (
    <Wrapper isJapanese={language === "ja"}>
      <button onClick={handleClick}>{language}</button>
    </Wrapper>
  )
}

export { LanguageOption }
