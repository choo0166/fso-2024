import { useState } from "react"
import CountryData from "./countryData"

const CountryLine = ({ countryData }) => {
  const [showData, setShowData] = useState(false)

  const toggleShowData = () => {
    setShowData(!showData)
  }

  return (
    <>
      <tr>
        <td>{countryData["name"]["common"]}</td>
        {!showData ? (
          <td>
            <button onClick={toggleShowData}>show</button>
          </td>
        ) : (
          <td>
            <button onClick={toggleShowData}>hide</button>
          </td>
        )}
      </tr>
      {showData && (
        <tr>
          <td><CountryData countryData={countryData} /></td>
        </tr>
      )}
    </>
  )
}

const CountryList = ({ resultList }) => {
  if (resultList === null) {
    return null
  }
  if (resultList.length === 0) {
    return <p>No result matches your query</p>
  } else if (resultList.length === 1) {
    return <CountryData countryData={resultList[0]} />
  } else if (resultList.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else {
    return (
      <div>
        <table>
          <tbody>
            {resultList.map((countryData) => {
              return (
                <CountryLine
                  key={countryData["name"]["common"]}
                  countryData={countryData}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CountryList
