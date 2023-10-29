import { createSlice } from "@reduxjs/toolkit"

const blogsSlice = createSlice({ 
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const content = action.payload
      state.push({
        content,
        id: 1,
        likes: 0
      })
    },

    upVoteBlog(state, action) {
      const id = action.updatedBlog.id
      return state.map(blog => blog.id !== id ? blog : action.updatedBlog)
    },

    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.id)
    },

    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { createBlog, upVoteBlog, removeBlog, setBlogs } = blogsSlice.actions

export default blogsSlice.reducer