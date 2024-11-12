import { useState } from "react"
import loginService from "../services/login"

const LoginForm = ({ setUser, setNotif }) => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(event)
    try {
      const user = await loginService.login({ username, password })
      setNotif({ message: "Login Successful.", isError: false })
      setUser(user)
      // save returned JWT to browser's local storage as DOMstring
      window.localStorage.setItem("loggedBlogsAppUser", JSON.stringify(user))
    } catch (error) {
      console.error(error)
      setNotif({
        message: "Login failed due to invalid credentials.",
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
      setUserName("")
      setPassword("")
    }
  }

  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={formSubmitHandler}>
        <div>
          username
          <input
            data-testid="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <br></br>
          password
          <input
            data-testid="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="Submit" disabled={!username || !password}>
            login
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
