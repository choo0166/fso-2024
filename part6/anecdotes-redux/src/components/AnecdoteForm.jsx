import { useState } from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"
import {
  createNotification,
  expireNotification,
} from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(event)
    const newAnecdote = await anecdoteService.createNew(input)
    dispatch(createAnecdote(newAnecdote))
    dispatch(
      createNotification(
        `you submitted ${input}`,
        setTimeout(() => dispatch(expireNotification()), 5000)
      )
    )
    setInput("")
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        Enter new anecdote:{" "}
        <input value={input} onChange={(e) => setInput(e.target.value)}></input>
      </div>
      <div>
        <button type="submit" disabled={!input}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default AnecdoteForm
