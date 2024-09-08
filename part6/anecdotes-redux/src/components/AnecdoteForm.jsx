import { useState } from "react"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(event)
    dispatch(createAnecdote(input))
    dispatch(setNotification(`you submitted ${input}`, 5))
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
