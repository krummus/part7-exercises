import React from 'react'
import userService from '../services/users'
import loginService from '../services/logins'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
  
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({
        username, password
      })
  
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  
      userService.setToken(user.token)
      
      dispatch({ type: 'user/setUser', payload: user })
      dispatch({ type: 'notifications/makeNotification', message: `${user.name} has logged in`, errorState: false })
      setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
    } catch (exception) {
      dispatch({ type: 'notifications/makeNotification', message: exception.message, errorState: true })
      setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
    }
  
    event.target.username.value = ''
    event.target.password.value = ''
  } 

  return(
    <form onSubmit={handleLogin}>
      <div>
        username: 
        <input name='username' />
      </div>
      <div>
        password: 
        <input type='password' name='password' />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {}

export default LoginForm