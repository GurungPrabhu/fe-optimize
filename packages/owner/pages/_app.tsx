import Head from "next/head"
import * as Sentry from "@sentry/node"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { analytics, auth, LanguageOption } from "@project/shared"
import { useEffect, useState } from "react"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { message } from "antd"
import { CloseCircleFilled } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { QueryClient, QueryClientProvider } from "react-query"
import { GlobalStyles, AuthProvider } from "../utils"
import "../utils/css-imports"
import { logEvent, setCurrentScreen } from "firebase/analytics"

const queryClient = new QueryClient({ defaultOptions: {} })

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV !== "development",
    environment: `owner-${process.env.NODE_ENV}`,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const routers = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const logAnalyticsEvent = (url: string) => {
        setCurrentScreen(analytics, url)
        logEvent(analytics, "screen_view", {
          firebase_screen: url,
          firebase_screen_class: "skeleton-owner",
        })
      }

      routers.events.on("routeChangeComplete", (url) => {
        window.scrollTo(0, 0)
        logAnalyticsEvent(url)
      })

      logAnalyticsEvent(window.location.pathname)
      return () => {
        routers.events.off("routeChangeComplete", logAnalyticsEvent)
      }
    }
  }, [])

  const initialLoad = () => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user !== null) {
          const idToken = await user!.getIdTokenResult()
          if (idToken.claims["role"] === "skeleton-owner") {
            setUser(user)
            setIsOwner(true)
          } else {
            signOut(auth)
            setUser(null)
            message.error({
              key: "01",
              icon: <CloseCircleFilled onClick={() => message.destroy("01")} />,
              content: t("Unauthorized user"),
            })
          }
        }
        setLoading(false)
      } catch (error) {
        Sentry.captureException(error)
        message.error({
          key: "02",
          content: t("An error has occurred. Please try again later."),
          icon: <CloseCircleFilled onClick={() => message.destroy("02")} />,
        })
      }
    })
  }

  useEffect(() => {
    initialLoad()
  }, [])

  return (
    <>
      <Head>
        <title>{"Owner"}</title>
      </Head>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <AuthProvider
          loading={loading}
          user={user}
          isOwner={isOwner}
          setUser={setUser}
        >
          <Component {...pageProps} />
          {process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? (
            <LanguageOption />
          ) : (
            <></>
          )}
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
