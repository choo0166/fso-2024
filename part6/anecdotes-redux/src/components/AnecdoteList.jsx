import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { updateAnecdoteVotes } from "../reducers/anecdoteReducer"
import { useDebouncedSelector } from "../utils/debouncedSelector"

const AnecdoteLine = ({ anecdote }) => {
  const dispatch = useDispatch()
  const voteHandler = () => {
    const payload = {...anecdote, votes: anecdote.votes + 1}
    dispatch(updateAnecdoteVotes(anecdote.id, payload))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
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
