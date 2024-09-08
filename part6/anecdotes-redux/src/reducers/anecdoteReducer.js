import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case "APPEND":
      return [...state, action.payload]
    case "VOTE":
      const anecdoteId = action.payload
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
export const appendAnecdote = (anecdote) => {
  return {
    type: "APPEND",
    payload: anecdote,
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: id,
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: "SET",
    payload: anecdotes
  }
}

/* create async action creators with Redux Thunk, see
https://github.com/reduxjs/redux-thunk
https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout */

export const createAnecdote = (anecdote) => {
  // Redux thunk calls function with dispatch method as first argument
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const fetchAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const updateAnecdoteVotes = (id, payload) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVote(id, payload)
    dispatch(voteAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteReducer
