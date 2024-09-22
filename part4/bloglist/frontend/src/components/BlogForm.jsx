import { useState } from "react"
import blogService from "../services/blogs"

const initialState = {
  title: "",
  author: "",
  url: "",
}

const BlogForm = ({ setNotif, setBlogs }) => {
  const [blogDetails, setBlogDetails] = useState(initialState)

  const handleInputChange = (e) => {
    setBlogDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }))
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(event)
    try {
      const savedBlog = await blogService.create(blogDetails)
      console.log("created new blog ", savedBlog)
      setNotif({
        message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        isError: false,
      })
      setBlogs((prevBlogs) => ([ ...prevBlogs, savedBlog]))
    } catch (error) {
      console.error(error)
      setNotif({
        message: `Error: ${error.response.data.error}`,
        isError: true,
      })
    } finally {
      setTimeout(
        () =>
          setNotif((oldNotif) => {
            return { ...oldNotif, message: null }
          }),
        5000
      )
      setBlogDetails(initialState)
    }
  }

  return (
    <div style={{ marginTop: 10 }}>
      <h2>Create new</h2>
      <form onSubmit={formSubmitHandler}>
        title
        <input
          name="title"
          value={blogDetails.title}
          onChange={handleInputChange}
        ></input>
        <br></br>
        author
        <input
          name="author"
          value={blogDetails.author}
          onChange={handleInputChange}
        ></input>
        <br></br>
        url
        <input
          name="url"
          value={blogDetails.url}
          onChange={handleInputChange}
        ></input>
        <br></br>
        <button type="Submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
