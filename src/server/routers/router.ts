import {taskRouter} from "server/routers/task-rooter";
import {serverTrpc} from 'server/server-trpc'

export const appRouter = serverTrpc.router({
  task: taskRouter
})

export type AppRouter = typeof appRouter
