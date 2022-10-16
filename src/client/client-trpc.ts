import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'
import type { AppRouter } from 'server/routers/router'

function getBaseUrl() {
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const clientTrpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api`,
        }),
      ],
    }
  },
  ssr: false,
})
