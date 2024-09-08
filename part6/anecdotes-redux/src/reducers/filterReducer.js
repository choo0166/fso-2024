const filterReducer = (state = "", action) => {
  console.log(action)
  switch (action.type) {
    case "FILTER":
      return action.payload
    default: return state
  }
}

export const filterAnecdote = (input) => {
  return {
    type: 'FILTER',
    payload: input
  }
}

export default filterReducer