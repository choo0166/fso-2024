const Part = ({ partName, numExercises }) => {
  return (
    <p>{partName} {numExercises}</p>
  )
}

const Content = ({ contents }) => {
  const e = contents.map((content) => {
    return (
      // Avoid using array indexes as key values
      <Part key={content.id} partName={content.name} numExercises={content.exercises} />
    )
  })
  return (
    <>{e}</>
  )
}

const Total = ({ contents }) => {
  const sum = contents.reduce((acc, obj) => acc + obj["exercises"], 0)
  return (
    <p><strong>Total of {sum} exercises</strong></p>
  )
}

const Course = ({ courseObj }) => {
  return (
    <div>
      <h2><strong>{courseObj["name"]}</strong></h2>
      <Content contents={courseObj["parts"]} />
      <Total contents={courseObj["parts"]} />
    </div>
  )
}

const TOC = ({ courses }) => {
  const e = courses.map((courseObj) => {
    return (
      <Course key={courseObj["id"]} courseObj={courseObj} />
    )
  })
  return (
    <div>{e}</div>
  )
}

export default TOC