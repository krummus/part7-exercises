import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({ 
  name: 'users',
  initialState: [],
  reducers: {

    removeUser(state, action) {
      return state.filter(user => user.id !== action.id)
    },

    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { removeUser, setUsers } = usersSlice.actions

export default usersSlice.reducer