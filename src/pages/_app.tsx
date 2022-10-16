import type {AppProps} from 'next/app'
import {clientTrpc} from "client/client-trpc";

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default clientTrpc.withTRPC(MyApp)
