import {z} from 'zod'
import {serverTrpc} from 'server/server-trpc'
import {createTask, findTasks} from "server/workflows/task-workflow";

export const taskRouter = serverTrpc.router({
  all: serverTrpc.procedure
    .input(
      z.object({
        status: z.enum(['backlog', 'icebox', 'doing'])
      }),
    )
    .query(({input}) => {
      return findTasks(input.status)
    }),
  create: serverTrpc.procedure
    .input(
      z.object({
        text: z.string().min(1),
        status: z.enum(['backlog', 'icebox', 'doing']),
        created: z.date()
      }),
    )
    .mutation(async ({input}) => {
      createTask(input.text, input.status, input.created)
    }),
})
