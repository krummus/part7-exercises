import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationsReducer from './reducers/notificationsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notifications: notificationsReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store