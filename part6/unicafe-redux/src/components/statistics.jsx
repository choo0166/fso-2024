import { useSelector } from "react-redux"

const StatisticsLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = () => {
  /* call redux useSelector hook to create subscription to redux store, 
  extract state from store by passing selector function */
  // const { good, ok, bad } = useSelector((state) => state) // avoid returning entire state
  const good = useSelector((state) => state.good)
  const ok = useSelector((state) => state.ok)
  const bad = useSelector((state) => state.bad)
  console.log(good, ok, bad)
  
  const total = good + bad + ok
  if (total > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine label="Good" value={good} />
            <StatisticsLine label="Neutral" value={ok} />
            <StatisticsLine label="Bad" value={bad} />
            <StatisticsLine label="Total" value={total} />
            <StatisticsLine label="Average" value={(good + bad * -1) / total} />
            <StatisticsLine
              label="Positive"
              value={(good / total) * 100 + "%"}
            />
          </tbody>
        </table>
      </div>
    )
  } else {
    return <p>No feedback given</p>
  }
}

export default Statistics
