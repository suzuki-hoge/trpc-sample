import * as trpcNext from '@trpc/server/adapters/next'
import { createContext } from 'server/context'
import { appRouter } from 'server/routers/router'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
})
