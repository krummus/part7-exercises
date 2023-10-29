import { useState } from 'react'
import { useSelector } from 'react-redux'

const Blog = ({blog, handleAddLike, handleBlogDelete}) => {

  const [visible, setVisible] = useState(false)
  const user = useSelector(state => state.user)

  const hideWhenVisible = { 
    display: visible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const showWhenVisible = {
    display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const showDeleteButton = (username) => {
    const currUser = blog.users.find(user => user.username === username)
    if(currUser !== undefined) {
      return(<button onClick={handleBlogDelete}>delete</button>)
    }
  }

  function toggleVisibility() {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <label key={blog.title}>{blog.title} - {blog.author}  </label><button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <label key={blog.title}>{blog.title} - {blog.author}</label><button onClick={toggleVisibility}>hide</button><br />
        <label key={blog.url}>{blog.url}</label><br />
        <label key={blog.likes}>likes</label>: {blog.likes} <button onClick={handleAddLike}>like</button><br />
        {blog.users.map(user => <label key={user.id}>{user.name}</label>)}<br />
        {showDeleteButton(user.username)}
      </div>
    </div>
 
  )
}

export default Blog

