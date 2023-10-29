import { useDispatch, useSelector } from 'react-redux'

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
        <div>
            {user.username} - logged in - <button onClick={handleLogout}>log out</button>
        </div>
    )
}

export default LoggedInUserPanel