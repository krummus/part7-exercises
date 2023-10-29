import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';

const LoggedInUserPanel = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = async (event) => {
        dispatch({ type: 'user/removeUser' })
        dispatch({ type: 'notifications/makeNotification', message: `${user.name} has logged out`, errorState: false })
        setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    console.log(user)

    return(
        <>
            <strong>{user.username} - logged in - <Button variant='outlined' size ='large' onClick={handleLogout}>log out</Button></strong>
        </>
    )
}

export default LoggedInUserPanel