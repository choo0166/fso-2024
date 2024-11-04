import { createAxiosClient } from "../utils/createAxiosClient"

const axiosClient = createAxiosClient({
  config: {
    baseURL: "/api/blogs",
  },
  getAuthToken: () => {
    const user = window.localStorage.getItem("loggedBlogsAppUser")
    if (user) {
      const userJSON = JSON.parse(user)
      return userJSON.token
    }
    return null
  },
})

const getAll = async () => {
  const response = await axiosClient.get("/")
  return response.data
}

const create = async (payload) => {
  const newBlog = { ...payload, likes: 0 }
  const response = await axiosClient.post("/", newBlog, {
    useAuthorization: true,
  })
  return response.data
}

const update = async (newBlog) => {
  const response = await axiosClient.put(`/${newBlog.id}`, newBlog, {
    useAuthorization: true,
  })
  return response.data
}

const remove = async (id) => {
  const response = await axiosClient.delete(`/${id}`, {
    useAuthorization: true,
  })
  return response.data
}

export default { getAll, create, update, remove }
