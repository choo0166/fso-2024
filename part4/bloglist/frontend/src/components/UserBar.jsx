const UserBar = ({ user, logoutHandler }) => {
  return (
    <div className="userBar">
      {user.username} logged in{' '}
      <button type="Submit" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}

export default UserBar