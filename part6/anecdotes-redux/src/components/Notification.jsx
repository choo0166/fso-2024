import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notif.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return null
}

export default Notification