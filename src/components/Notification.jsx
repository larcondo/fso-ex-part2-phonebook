const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  return (
    <div className={ notification.errorStyle ? 'error' : 'notification'}>
      {notification.message}
    </div>
  )
}

export default Notification