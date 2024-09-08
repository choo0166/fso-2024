import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/AnecdoteFilter"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { fetchAnecdotes } from "./reducers/anecdoteReducer"
import { useEffect } from "react"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAnecdotes())
  }, [])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
