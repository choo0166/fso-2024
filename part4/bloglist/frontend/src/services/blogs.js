import { createAxiosClient } from "../utils/createAxiosClient"

const axiosClient = createAxiosClient({
  config: {
    baseURL: '/api/blogs',
    useAuthorization: true  // maybe specified in request handlers
  },
  getAuthToken: () => {
    const user = window.localStorage.getItem("loggedBlogsAppUser")
    if (user) {
      const userJSON = JSON.parse(user)
      return userJSON.token
    }
    return null
  }
})

const getAll = async () => {
  const response = await axiosClient.get("/")
  return response.data
}

const create = async (payload) => {
  const newBlog = { ...payload, likes: 0 }
  const response = await axiosClient.post("/", newBlog)
  return response.data
}

export default { getAll, create }