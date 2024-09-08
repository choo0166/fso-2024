import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {
  createNotification,
  expireNotification,
} from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"
import { useDebouncedSelector } from "../utils/debouncedSelector"

const AnecdoteLine = ({ anecdote }) => {
  const dispatch = useDispatch()
  const voteHandler = async () => {
    const response = await anecdoteService.updateVote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    console.log(`Updated anecdote: ${JSON.stringify(response)}`)
    dispatch(voteAnecdote(response.id))
    dispatch(
      createNotification(
        `you voted ${anecdote.content}`,
        setTimeout(() => dispatch(expireNotification()), 5000)
      )
    )
  }
  return (
    <>
      <tr>
        <td>{anecdote.content}</td>
        <td>{`has ${anecdote.votes} votes`}</td>
        <td>
          <button onClick={voteHandler}>vote</button>
        </td>
      </tr>
    </>
  )
}

const AnecdoteList = () => {
  const filter = useDebouncedSelector((state) => state.filter, "", 1000)
  const anecdotes = useSelector((state) => {
    if (filter) {
      return state.anecdotes
        .filter((e) => e.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((o1, o2) => o2.votes - o1.votes)
    } else {
      return state.anecdotes.sort((o1, o2) => o2.votes - o1.votes)
    }
  })
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      <table>
        <tbody>
          {anecdotes.map((anecdote) => {
            return <AnecdoteLine key={anecdote.id} anecdote={anecdote} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AnecdoteList
