const anecdoteReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case "CREATE":
      return [...state, action.payload]
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
    case "SET":
      return [...action.payload]
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

export const setAnecdotes = (anecdotes) => {
  return {
    type: "SET",
    payload: anecdotes
  }
}

export default anecdoteReducer
