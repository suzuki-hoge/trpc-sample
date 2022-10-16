import Database from "better-sqlite3";
import {v4 as uuidv4} from 'uuid'
import {z} from 'zod'
import {serverTrpc} from 'server/server-trpc'

const db = new Database('database/dev.db')

export const appRouter = serverTrpc.router({
  task: serverTrpc.router({
    all: serverTrpc.procedure
      .input(
        z.object({
          status: z.enum(['backlog', 'icebox', 'doing'])
        }),
      )
      .query(({input}) => {
        return db.prepare('select id, text, status, created from task where status = ?').all(input.status)
          .map((row: { [key: string]: string }) => {
            return {
              id: row.id,
              text: row.text,
              status: row.status,
              created: new Date(row.created)
            }
          })
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
        db.prepare('insert into task (id, text, status, created) values (?, ?, ?, ?)').run(uuidv4(), input.text, input.status, input.created.getTime())
      }),
  })
})

export type AppRouter = typeof appRouter
