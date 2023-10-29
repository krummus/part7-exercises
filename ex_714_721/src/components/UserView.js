import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserView = () => {

    const id = useParams().id
    const users = useSelector(state => state.users)
    const user = users.find(u => u.id === id)

    if(!user) {
        return null
    }

    return(
    <div>
        <h2>{user.name}</h2>
        <h4>added blogs</h4>
        <ul>
            {user.blogs.map(blog => (
                <Link key={blog.id} to={`/blogs/${blog.id}`}><li key={blog.title}>{blog.title}</li></Link>
            ))}
        </ul>
    </div>
    )
}

export default UserView