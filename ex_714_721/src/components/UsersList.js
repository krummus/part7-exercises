import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {

    const users = useSelector(state => state.users)

    return(
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(user => {
                        return(
                            <tr key={user.name}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserList