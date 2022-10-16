import Database from "better-sqlite3";
import {v4 as uuidv4} from 'uuid'
import {Task} from "domain/task";

const db = new Database('database/dev.db')

type Status = 'backlog' | 'icebox' | 'doing'

export function findTasks(status: Status): Task[] {
  return db.prepare('select id, text, status, created from task where status = ?').all(status)
    .map((row) => {
      return {
        id: row.id,
        text: row.text,
        status: row.status,
        created: new Date(row.created)
      }
    })
}

export function createTask(text: string, status: Status, created: Date) {
  db.prepare('insert into task (id, text, status, created) values (?, ?, ?, ?)').run(uuidv4(), text, status, created.getTime())
}
