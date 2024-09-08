import axios from "axios"

// backend json-server
const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const createNew = async (anecdote) => {
  try {
    const newAnecdote = {
      content: anecdote,
      votes: 0,
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const updateVote = async (id, newAnecdote) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default { getAll, createNew, updateVote }
