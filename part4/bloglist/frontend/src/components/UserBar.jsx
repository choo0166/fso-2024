const UserBar = ({ user, logoutHandler }) => {
  return (
    <p>
      {user.username} logged in{' '}
      <button type="Submit" onClick={logoutHandler}>
        Logout
      </button>
    </p>
  )
}

export default UserBar