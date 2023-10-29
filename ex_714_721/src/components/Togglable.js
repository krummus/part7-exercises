import { useState } from 'react'
import Button from '@mui/material/Button'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='outlined' size ='large' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <Button variant='outlined' size ='large' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

export default Togglable