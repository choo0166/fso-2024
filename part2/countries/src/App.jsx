import { useState, useEffect } from "react"
import CountryForm from "./components/countryForm"
import Notification from "./components/notification"
import CountryList from "./components/countryList"
import countryService from "./services/countries"

const App = () => {
  // form input state
  const [searchString, setSearchString] = useState("")
  // query result state
  const [resultsShown, setResultsShown] = useState(null)
  // all countries data state
  const [allResults, setAllResults] = useState([])
  // status notification state
  const [statusMessage, setStatusMessage] = useState({
    message: null,
    isError: false,
  })

  const clearNotification = () => {
    setStatusMessage((oldStatus) => {
      return { ...oldStatus, message: null }
    })
  }

  // query for all countries data on initial load
  useEffect(() => {
    countryService
      .getAll()
      .then((response) => {
        console.log(response.data)
        setAllResults(response.data)
      })
      .catch((err) => {
        setStatusMessage({
          message: "unable to retrieve all countries data",
          isError: true,
        })
        setTimeout(clearNotification, 1500)
      })
  }, [])

  // filter countries by searchString using debounced keyword search
  useEffect(() => {
    // Effect is run on first render, prevent calling effect with empty searchString
    if (searchString) {
      let timer = setTimeout(() => {
        console.log(`searched for ${searchString}`)
        if (allResults.length === 0) {
          // no cache yet, query from api
          countryService
            .getByName(searchString.toLowerCase())
            .then((response) => {
              console.log(response.data)
              setResultsShown([response.data])
            })
            .catch((err) => {
              setStatusMessage({
                message: `${searchString} not found`,
                isError: true,
              })
              setTimeout(clearNotification, 1500)
            })
        } else {
          setResultsShown(() => {
            const filtered = allResults.filter((obj) =>
              obj["name"]["common"]
                .toLowerCase()
                .includes(searchString.toLowerCase())
            )
            // console.log(filtered)
            return filtered
          })
        }
      }, 2000)

      /* Set cleanup function to reset timer when state change cause effect to rerun. 
      Cleanup function executes just before effect is run */
      return () => {
        clearTimeout(timer)
      }
    }
  }, [searchString])

  const inputChangeHandler = (event) => {
    setSearchString(event.target.value)
  }

  return (
    <div>
      <Notification messageObj={statusMessage} />
      <CountryForm
        inputValue={searchString}
        inputChangeHandler={inputChangeHandler}
      />
      {searchString && <CountryList resultList={resultsShown} />}
    </div>
  )
}

export default App
