import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import UserBar from './components/UserBar'
import Togglable from './components/Togglable'
import { isJwtExpired } from './utils/verifyJWTExpiry'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState({ message: null, isError: false })
  const blogFormRef = useRef()

  useEffect(() => {
    // Retrieve auth details from browser's local storage
    const loggedInUser = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedInUser) {
      // parse JSON string from local storage
      const userJSON = JSON.parse(loggedInUser)
      // verify token expiry
      if (!isJwtExpired(userJSON?.token)) {
        setUser(userJSON)
      } else {
        // token expired, remove from local storage
        console.log('JWT expired!')
        window.localStorage.removeItem('loggedBlogsAppUser')
      }
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then((initialBlogs) => {
        setBlogs(initialBlogs)
      })
      .catch((error) => {
        console.error(error)
        setNotif({
          message: `Error: ${error.response.data.error}`,
          isError: true,
        })
        setTimeout(
          () =>
            setNotif((oldNotif) => {
              return { ...oldNotif, message: null }
            }),
          5000
        )
      })
  }, [user])

  const logoutHandler = () => {
    // empty local storage of origin
    window.localStorage.clear()
    setUser(null)
  }

  const createPostHandler = async (newBlogDetails) => {
    try {
      const savedBlog = await blogService.create(newBlogDetails)
      console.log('created new blog ', savedBlog)
      // toggle visibility of input form
      blogFormRef.current.toggleVisibility()
      setNotif({
        message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        isError: false,
      })
      setBlogs((prevBlogs) => [...prevBlogs, { ...savedBlog, user }])
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
    }
  }

  const likeBlogHandler = async (newBlogDetails) => {
    try {
      const updatedBlog = await blogService.update(newBlogDetails)
      console.log(`updated blog ${JSON.stringify(updatedBlog)}`)
      setBlogs(
        blogs.map((blog) =>
          blog.id === updatedBlog.id ? { ...updatedBlog, user } : blog
        )
      )
      setNotif({
        message: `You liked ${updatedBlog.title} by ${updatedBlog.author}`,
        isError: false,
      })
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
    }
  }

  const deleteBlogHandler = async (blog) => {
    try {
      const blogId = blog.id
      await blogService.remove(blogId)
      console.log(`deleted blog ${JSON.stringify(blog)}`)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
      setNotif({
        message: `You removed ${blog.title} by ${blog.author}`,
        isError: false,
      })
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
    }
  }

  return (
    <div>
      <Notification messageObj={notif} />
      <h2>Blogs</h2>
      {user === null ? (
        <div>
          <LoginForm setUser={setUser} setNotif={setNotif} />
        </div>
      ) : (
        <div>
          <UserBar user={user} logoutHandler={logoutHandler} />
        </div>
      )}
      <div>
        <Blog
          blogs={blogs}
          likeBlogHandler={likeBlogHandler}
          deleteBlogHandler={deleteBlogHandler}
          user={user?.username}
        />
      </div>
      {user && (
        <div>
          <Togglable buttonLabel="create new post" ref={blogFormRef}>
            <BlogForm createPostHandler={createPostHandler} />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App
