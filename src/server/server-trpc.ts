import {initTRPC} from '@trpc/server'
import superjson from 'superjson'
import {Context} from 'server/context'

export const serverTrpc = initTRPC.context<Context>().create({
  transformer: superjson,
})
