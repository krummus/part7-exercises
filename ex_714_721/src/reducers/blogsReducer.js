import { createSlice } from "@reduxjs/toolkit"

const blogsSlice = createSlice({ 
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push({
        title: action.title,
        author: action.author,
        url: action.url,
        id: action.id,
        likes: action.likes,
        comments: action.comments,
        users: action.users
      })
    },

    upVoteBlog(state, action) {
      const id = action.updatedBlog.id
      return state.map(blog => blog.id !== id ? blog : action.updatedBlog)
    },

    addComment(state, action) {
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

export const { createBlog, upVoteBlog, addComment, removeBlog, setBlogs } = blogsSlice.actions

export default blogsSlice.reducer