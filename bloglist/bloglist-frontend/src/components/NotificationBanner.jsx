import React from 'react'

const NotificationBanner = ({ notification }) => {
  return (
    <div className={notification.type === 'error' ? 'error' : 'success'}>
      {notification.message}
    </div>
  )
}

export default NotificationBanner
