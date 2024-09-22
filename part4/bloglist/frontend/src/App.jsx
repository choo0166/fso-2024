import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/Login"
import Notification from "./components/Notification"
import { isJwtExpired } from "./utils/verifyJWTExpiry"
import blogService from "./services/blogs"

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState({ message: null, isError: false })

  useEffect(() => {
    // Retrieve auth details from browser's local storage
    const loggedInUser = window.localStorage.getItem("loggedBlogsAppUser")
    if (loggedInUser) {
      // parse JSON string from local storage
      const userJSON = JSON.parse(loggedInUser)
      // verify token expiry
      if (!isJwtExpired(userJSON?.token)) {
        setUser(userJSON)
      } else {
        // token expired, remove from local storage
        console.log("JWT expired!")
        window.localStorage.removeItem("loggedBlogsAppUser")
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
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
    }
  }, [user])

  const logoutHandler = () => {
    // empty local storage of origin
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <Notification messageObj={notif} />
      {user === null ? (
        <LoginForm setUser={setUser} setNotif={setNotif} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.username} logged in{" "}
            <button type="Submit" onClick={logoutHandler}>
              Logout
            </button>
          </p>
          <Blog blogs={blogs} />
          <BlogForm setNotif={setNotif} setBlogs={setBlogs} />
        </div>
      )}
    </div>
  )
}

export default App
