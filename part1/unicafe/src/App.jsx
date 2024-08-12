import { useState } from "react"

const FeedbackHeader = () => {
  return <h1>Give Feedback</h1>
}

const StatsHeader = () => {
  return <h1>Statistics</h1>
}

const FeedbackOptions = ({ goodHandler, neutralHandler, badHandler }) => {
  return (
    <div className="button-container">
      <button onClick={goodHandler}>Good</button>
      <button onClick={neutralHandler}>Neutral</button>
      <button onClick={badHandler}>Bad</button>
    </div>
  )
}

const StatisticsLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  const total = goodCount + neutralCount + badCount
  if (total > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine label="Good" value={goodCount} />
            <StatisticsLine label="Neutral" value={neutralCount} />
            <StatisticsLine label="Bad" value={badCount} />
            <StatisticsLine label="Total" value={total} />
            <StatisticsLine
              label="Average"
              value={(goodCount + badCount * -1) / total}
            />
            <StatisticsLine
              label="Positive"
              value={(goodCount / total) * 100 + "%"}
            />
          </tbody>
        </table>
      </div>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <FeedbackHeader />
      <FeedbackOptions
        goodHandler={handleGood}
        neutralHandler={handleNeutral}
        badHandler={handleBad}
      />
      <StatsHeader />
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
    </div>
  )
}

export default App
