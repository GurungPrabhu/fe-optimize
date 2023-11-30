import { AppProps } from "next/app"
import { analytics, LanguageOption } from "@project/shared"
import { useEffect } from "react"
import { useRouter } from "next/router"
import * as Sentry from "@sentry/node"
import { QueryClient, QueryClientProvider } from "react-query"
import { GlobalStyles } from "../utils"
import "../utils/css-imports"
import { setCurrentScreen, logEvent } from "firebase/analytics"

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV !== "development",
    environment: `consumer-${process.env.NODE_ENV}`,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

const queryClient = new QueryClient({ defaultOptions: {} })

const MyApp = ({ Component, pageProps }: AppProps) => {
  const routers = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const logAnalyticsEvent = (url: string) => {
        setCurrentScreen(analytics, url)
        logEvent(analytics, "screen_view", {
          firebase_screen: url,
          firebase_screen_class: "skeleton-consumer",
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

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? (
          <LanguageOption />
        ) : (
          <></>
        )}
      </QueryClientProvider>
    </>
  )
}

export default MyApp
