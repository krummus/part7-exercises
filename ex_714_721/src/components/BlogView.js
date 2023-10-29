import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useParams, Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const BlogView = () => {
    const dispatch = useDispatch()

    const id = useParams().id

    const user = useSelector(state => state.user)
    const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

    const blogListStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 10
    }

    const handleAddLike = async (blogId) => {
        const currBlog = blog
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
    
      const handleBlogDelete = async (blogId) => {
          if (window.confirm("Do you really want to delete this blog?")) {
            const blogToDelete = blog
            try {
              await blogService.deleteOne(blogId.toString(), user.token)
              dispatch({ type: 'blogs/removeBlog', id: blogId })
              dispatch({ type: 'notifications/makeNotification', message: `${blogToDelete.title} by ${blogToDelete.author} has been deleted`, errorState: false })
              setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
            } catch (exception) {
              dispatch({ type: 'notifications/makeNotification', message: exception.message, errorState: true })
              setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
            }
          }else{
              dispatch({ type: 'notifications/makeNotification', message: `blog deletion cancelled`, errorState: true })
              setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
          }
      }
    
      const showDeleteButton = (username) => {
        const currUser = blog.users.find(user => user.username === username)
        if(currUser !== undefined) {
          return(<button onClick={() => handleBlogDelete(blog.id)}>delete</button>)
        }
      }

      const addComment = async (event) => {
        event.preventDefault()

        const comment = event.target.comment.value

        if (comment.length > 2) {
            const updatedBlogObject = {
                ...blog,
                comments: blog.comments.concat(comment),
                users: blog.users.map(usr => usr.id)
            }
            console.log(updatedBlogObject, 'updated object')

            const updatedBlogObjectRedux = {
              ...blog,
              comments: blog.comments.concat(comment)
          }
            
            try {
                await blogService.updateOne(blog.id.toString(), updatedBlogObject)
                dispatch({ type: 'blogs/upVoteBlog', updatedBlog: updatedBlogObjectRedux })
                dispatch({ type: 'notifications/makeNotification', message: `comment added`, errorState: false })
                setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
            } catch (exception) {
                dispatch({ type: 'notifications/makeNotification', message: exception.message, errorState: true })
                setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
            }
        }else{
            dispatch({ type: 'notifications/makeNotification', message: 'comment too short', errorState: true })
            setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
        }

        event.target.comment.value = ''
      }
    
      return (
        <div>
          <div style={blogListStyle}>
            <h2>{blog.title} {blog.author}</h2>
            <Link class='blogLinkText' to={blog.url}>{blog.url}</Link><br />
            <label class='blogLikeTitle' key={blog.likes}>Likes</label>: <b>{blog.likes}</b> <Button variant='outlined' size ='medium' onClick={() => handleAddLike(blog.id)}>like</Button><br />
            <label class='addedByText'>Added by: {blog.users.map(user => <label key={user.id}>{user.name}</label>)}</label><br />
            {showDeleteButton(user.username)}
            <h3>comments</h3>
            <form onSubmit={addComment}>
                <div> 
                    <TextField label="Enter comment" variant="outlined" name='comment' placeholder='type comment here...'/><Button variant='outlined' size ='large' type='submit'>Add Coment</Button>
                </div>
                <div>
                    <ul>
                        {blog.comments.map(comm => <li key={comm}>{comm}</li>)}
                    </ul>
                </div>
            </form>
          </div>
        </div>
     
      )
    }


export default BlogView