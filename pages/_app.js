import '../styles/globals.css';
import NextNProgress from "nextjs-progressbar";
import { CookiesProvider } from "react-cookie"
import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <CookiesProvider>
       <SessionProvider session={session}>
          <NextNProgress options={{ showSpinner: false }} color="#3498db" />
          <Component {...pageProps} />
      </SessionProvider>
    </CookiesProvider>
  )
}
