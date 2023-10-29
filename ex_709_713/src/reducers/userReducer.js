import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({ 
    name: 'user',
    initialState: {
        username: '',
        name: '',
        token: ''
    },
    reducers: {
        setUser(state, action) {
            console.log(action)
            return {
                username: action.payload.username,
                name: action.payload.name,
                token: action.payload.token
            }
        },

        removeUser(state, action) {
            return { 
                username: '',
                name: '',
                token: ''
            }
        }
    }
})

export const { setUsers, removeUser } = userSlice.actions

export default userSlice.reducer