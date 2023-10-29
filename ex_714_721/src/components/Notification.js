import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notifications = useSelector(state => state.notifications)

    const noErrorStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: 'mediumseagreen'
    }

    const errorStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'red'
    }
    
    if(notifications.length !== 0) {
        return (
          <div>
            {notifications.map(notif => 
              <div key={notif.message} style={notif.errorStyle === true ? errorStyle : noErrorStyle}>{notif.message}</div>
            )}
          </div>
        )
    
      }else{
        return (
          <div style={null}>
          </div>
        )
      }
}

export default Notification