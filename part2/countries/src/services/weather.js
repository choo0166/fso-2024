import axios from "axios";

const owmApiKey = import.meta.env.VITE_OWM_KEY

// REST API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getByLocation = ({ latlng }) => {
  const [lat, lon] = latlng
  const requestParams = {
    lat: lat,
    lon: lon,
    units: "metric",
    appid: owmApiKey
  }
  return axios.get(baseUrl, {params: requestParams})
}

export default { getByLocation }