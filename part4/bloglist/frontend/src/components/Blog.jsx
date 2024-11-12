import { useState, useMemo } from "react"

const BlogLine = ({
  blog,
  likeBlogHandler,
  deleteBlogHandler,
  loggedInUser,
}) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleView = () => {
    setShowDetail(!showDetail)
  }

  const likeBlog = () => {
    const { user, ...payload } = blog
    payload.likes = payload.likes + 1
    likeBlogHandler(payload)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogHandler(blog)
    }
  }

  const buttonLabel = showDetail ? "hide" : "view"

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blogDetails">
      <div>
        {blog.title} by {blog.author}{" "}
        <button onClick={toggleView}>{buttonLabel}</button>
        <div
          style={{ display: showDetail ? "" : "none" }}
          className="togglableDetails"
        >
          <span>
            <a href={blog.url}>{blog.url}</a>
            <br />
            <span>
              likes: {blog.likes} <button onClick={likeBlog}>like</button>
            </span>
            <br />
            {blog.user.username}
            <br />
            {blog.user.username === loggedInUser && (
              <button onClick={deleteBlog}>remove</button>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

const Blogs = ({ blogs, likeBlogHandler, deleteBlogHandler, user }) => {
  const sortedBlogs = useMemo(() => {
    return blogs.toSorted((b1, b2) => b2.likes - b1.likes)
  }, [blogs])

  return (
    <div className="blogList">
      {sortedBlogs.map((blog) => {
        return (
          <BlogLine
            key={blog.id}
            blog={blog}
            likeBlogHandler={likeBlogHandler}
            deleteBlogHandler={deleteBlogHandler}
            loggedInUser={user}
          />
        )
      })}
    </div>
  )
}

export default Blogs
