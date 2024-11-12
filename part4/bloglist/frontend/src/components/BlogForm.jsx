import { useState } from "react"

const initialState = {
  title: "",
  author: "",
  url: "",
}

const BlogForm = ({ createPostHandler }) => {
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
    createPostHandler(blogDetails)
    setBlogDetails(initialState)
  }

  return (
    <div style={{ marginTop: 10 }}>
      <h2>Create new</h2>
      <form onSubmit={formSubmitHandler}>
        title
        <input
          data-testid="newBlogTitle"
          name="title"
          value={blogDetails.title}
          onChange={handleInputChange}
        ></input>
        <br></br>
        author
        <input
          data-testid="newBlogAuthor"
          name="author"
          value={blogDetails.author}
          onChange={handleInputChange}
        ></input>
        <br></br>
        url
        <input
          data-testid="newBlogUrl"
          name="url"
          value={blogDetails.url}
          onChange={handleInputChange}
        ></input>
        <br></br>
        <button type="Submit">submit</button>
      </form>
    </div>
  )
}

export default BlogForm
