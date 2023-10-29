import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = () => {

    const blogs = useSelector(state => state.blogs)

    return(
        <div class='blogList'>
            <h3 class='blogList'>Blogs</h3>
            <ul class='blogList'>
            {blogs.map(blog =>
                <li><Link key={blog.id} to={`/blogs/${blog.id}`}><Blog blog={blog}/></ Link></li>
            )}
            </ul>
        </div>
    )
}

export default BlogList