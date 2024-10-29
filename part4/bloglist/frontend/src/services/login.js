import { createAxiosClient } from '../utils/createAxiosClient'

const axiosClient = createAxiosClient({})

const login = async (creds) => {
  const response = await axiosClient.post('/api/login', creds)
  return response.data
}

export default { login }
