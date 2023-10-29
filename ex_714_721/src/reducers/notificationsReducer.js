import { createSlice } from "@reduxjs/toolkit"

const notificationsAtStart = []

const asObject = (message) => {
  return {
    messsage: message
  }
}

const initialState = notificationsAtStart.map(asObject)

const notificationSlice = createSlice({ 
  name: 'notifications',
  initialState: initialState,
  reducers: {
    makeNotification(state, action) {
      console.log(action)
      const content = action.message
      state.push({
        message: content,
        errorStyle: action.errorState
      })
    },

    removeNotification(state, action) {
      return state.filter((_, idx) => idx !== 0)
    },
  },
})

export const { makeNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer