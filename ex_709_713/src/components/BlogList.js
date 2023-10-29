import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const handleAddLike = async (blogId) => {
        const currBlog = blogs.find(blog => blog.id.toString() === blogId)
        const currLikes = currBlog.likes + 1
        const updatedBlogObject = {
            ...currBlog,
            likes: currLikes,
            users: currBlog.users.map(usr => usr.id)
        }
        await blogService.updateOne(blogId.toString(), updatedBlogObject)

        const updatedBlogObjectRedux = {
            ...currBlog,
            likes: currLikes
        }
        dispatch({ type: 'blogs/upVoteBlog', updatedBlog: updatedBlogObjectRedux })
    }

    const handleBlogDelete = async (id) => {
        if (window.confirm("Do you really want to delete this blog?")) {
            const blogToDelete = blogs.find(blog => blog.id === id)
            await blogService.deleteOne(id.toString(), user.token)
            dispatch({ type: 'blogs/removeBlog', id: id })
            dispatch({ type: 'notifications/makeNotification', message: `a new blog ${blogToDelete.title} by ${blogToDelete.author}`, errorState: false })
            setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
        }else{
            dispatch({ type: 'notifications/makeNotification', message: `blog deletion cancelled`, errorState: true })
            setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
        }
    }

    return(
    <div>
        <h3>Blogs</h3>
        {blogs.map(blog =>
            <Blog 
                key={blog.id} 
                blog={blog} 
                handleAddLike={() => handleAddLike(blog.id)} 
                handleBlogDelete={() => handleBlogDelete(blog.id)}
            />
        )}
    </div>
    )
}

export default BlogList