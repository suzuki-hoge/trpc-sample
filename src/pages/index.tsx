import type {NextPage} from 'next'
import {useState} from "react";
import {clientTrpc} from "client/client-trpc";

const Home: NextPage = () => {
  const context = clientTrpc.useContext()

  let tasksQuery = clientTrpc.task.all.useQuery({status: 'doing'}, {})
  let tasks = tasksQuery.data ?? []

  const [error, setError] = useState('')

  const taskMutation = clientTrpc.task.create.useMutation({
    onSuccess() {
      context.task.all.invalidate();
      setText('')
      setError('')
    },
    onError(error) {
      setError(error.message)
    }
  })

  const [text, setText] = useState('')

  return (
    <>
      <h1>tRPC Sample</h1>
      <ul>
        {tasks.map(task => <li key={task.id}>{task.text} | {task.status} ( {task.created.toString()} )</li>)}
      </ul>
      <p>new task</p>
      <input type={'text'} value={text} onChange={e => setText(e.target.value)}/>
      <input type={'submit'} value={'submit'} onClick={() => taskMutation.mutate({text: text, status: 'doing', created: new Date()})}/>
      <p>
        {error ?? <pre>{error}</pre>}
      </p>
    </>
  )
}

export default Home
