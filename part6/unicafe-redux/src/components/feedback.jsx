import { useDispatch } from 'react-redux'

const FeedbackOptions = () => {
  const dispatch = useDispatch()
  return (
    <div className="button-container">
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK'})}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>
    </div>
  )
}

export default FeedbackOptions