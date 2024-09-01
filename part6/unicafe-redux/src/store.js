import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/reducer'

/* Create combined reducer and builds a combined state object 
from a state:reducer pair where each reducer manages a particular
state. Note: each action dispatched is handled by all reducers but 
only reducers configured to handle the action type executes the 
action, e.g. 

const reducer = combineReducers({
  myState: myReducer,
  mySecondState: mySecondReducer
}) 

Note: Not necessary to call combineReducers when using 
configureStore from redux toolkit
*/
const store = configureStore({
  reducer: counterReducer
})

export default store