import { useState } from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const formSubmitHandler = (event) => {
    event.preventDefault()
    console.log(event)
    dispatch(createAnecdote(input))
    setInput("")
  }
  
  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        Enter new anecdote: <input value={input} onChange={(e) => setInput(e.target.value)}></input>
      </div>
      <div>
        <button type="submit" disabled={!input}>Submit</button>
      </div>
    </form>
  )
}

export default AnecdoteForm