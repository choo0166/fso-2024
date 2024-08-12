import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const WeatherDisplay = ({ weatherData }) => {
  const { weather, main, wind } = weatherData
  const weatherDesc = weather[0].description
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
  const temp = main.temp
  const windSpeed = wind.speed

  return (
    <>
      <img src={weatherIconUrl} style={{float: "left", marginRight: "15px"}} />
      <p>
        {`${weatherDesc}, temperature ${temp} Celcius`}
        <br></br>
        {`wind ${windSpeed} m/s`}
      </p>
    </>
  )
}

const CountryData = ({ countryData }) => {
  const [weatherData, setWeatherData] = useState(null)
  const { name, capital, area, languages, flag, flags } = countryData

  useEffect(() => {
    weatherService
      .getByLocation(countryData["capitalInfo"])
      .then((response) => {
        console.log(response.data)
        setWeatherData(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <h2>{name["common"] + `${flag}`}</h2>
      <p>
        {capital.length > 1
          ? `capitals ${capital.join(", ")}`
          : `capital ${capital[0]}`}
        <br></br>
        {`area ${area}`}
      </p>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map((lang) => {
          return <li key={lang}>{lang}</li>
        })}
      </ul>
      <img src={flags["png"]} />
      <h3>{`Weather in ${capital[0]}`}</h3>
      {weatherData !== null ? (
        <WeatherDisplay weatherData={weatherData} />
      ) : (
        <p>Unable to retrieve weather data</p>
      )}
    </>
  )
}

export default CountryData
