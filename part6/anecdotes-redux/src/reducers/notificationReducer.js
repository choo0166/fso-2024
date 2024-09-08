const initialState = {
  message: null,
  expiryTimer: null
}

const notificationReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "NOTIFY":
      if (state.expiryTimer) {
        clearTimeout(state.expiryTimer)
      }
      return { ...action.payload }
    case "EXPIRE":
      return initialState
    default: return state
  }
}

export const createNotification = (message, expiryTimer) => {
  return {
    type: "NOTIFY",
    payload: {
      message,
      expiryTimer
    }
  }
}

export const expireNotification = () => {
  return {
    type: "EXPIRE"
  }
}

export default notificationReducer