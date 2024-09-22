import axios from 'axios'

export const createAxiosClient = ({ config, getAuthToken }) => {
  const client = axios.create(config)
  /* use axios interceptors to inject auth tokens in request 
  authorization headers */
  client.interceptors.request.use(
    (config) => {
      // Check the custom config property if auth headers are required
      if (config.useAuthorization) {
        const token = getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    }, 
    (error) => {
      return Promise.reject(error)
    }
  )

  return client
}