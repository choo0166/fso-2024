const Header = (props) => {
  return (
    <h1>{props.headerName}</h1>
  )
}

const Part = ({ partName, numExercises }) => {
  return (
    <p>{partName} {numExercises}</p>
  )
}

const Content = ({ contents }) => {
  const e = Object.keys(contents).map(key => {
    return (
      <Part key={key} partName={key} numExercises={contents[key]} />
    )}
  )
  return (
    <div>{e}</div>
  )
}

const Total = ({ contents }) => {
  const sum = Object.values(contents).reduce((acc, e) => acc + e, 0)
  return (
    <p>Number of exercises: {sum}</p>
  )
}

const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const contents = {
    "Fundamentals of React": 10,
    "Using props to pass data": 7,
    "State of a component": 14
  }
  return (
    <div>
      <Header headerName={course} />
      <Content contents={contents} />
      <Total contents={contents} />
    </div>
  )
}

export default App
