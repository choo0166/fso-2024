import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/AnecdoteFilter"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { setAnecdotes } from "./reducers/anecdoteReducer"
import { useEffect } from "react"
import anecdoteService from "./services/anecdotes"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then((result) => dispatch(setAnecdotes(result)))
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
