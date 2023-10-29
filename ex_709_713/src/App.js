import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import LoggedInUserPanel from './components/LoggedInUserPanel'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch({ type: 'blogs/setBlogs', payload: blogs }))
  }, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification />
      {user.username === '' ? <LoginForm />
      : 
      <div>
        <LoggedInUserPanel />
        <br />
        <Togglable buttonLabel='new note'>
          <CreateBlog user={user}/>
        </Togglable>
        <br />
        <BlogList user={user} />
      </div>
      }
    </div>
  )
}

export default App
