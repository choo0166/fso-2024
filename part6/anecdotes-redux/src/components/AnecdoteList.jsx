import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteLine = ({ anecdote }) => {
  const dispatch = useDispatch()
  return (
    <>
      <tr>
        <td>{anecdote.content}</td>
        <td>{`has ${anecdote.votes} votes`}</td>
        <td>
          <button
            onClick={() => {
              dispatch(voteAnecdote(anecdote.id))
            }}
          >
            vote
          </button>
        </td>
      </tr>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.toSorted((o1, o2) => o2.votes - o1.votes)
  )
  return (
    <div>
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
