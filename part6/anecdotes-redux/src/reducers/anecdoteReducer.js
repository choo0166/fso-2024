const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "CREATE":
      const newAnecdote = asObject(action.payload)
      return [...state, newAnecdote]
    case "VOTE":
      const anecdoteId = action.payload.id
      const anecdoteToUpdate = state.find((obj) => obj.id === anecdoteId)
      if (anecdoteToUpdate) {
        return state.map((anecdote) => {
          if (anecdote.id === anecdoteId) {
            return {
              ...anecdote,
              votes: anecdoteToUpdate.votes + 1,
            }
          }
          return anecdote
        })
      }
      console.error(`No anecdote found with id ${anecdoteId}`)
      return state
    default:
      return state
  }
}

// action creators
export const createAnecdote = (anecdote) => {
  return {
    type: "CREATE",
    payload: anecdote,
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  }
}

export default anecdoteReducer
