import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'

const CreateBlog = ({user}) => {
    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()

        const title = event.target.title.value
        const author = event.target.author.value
        const urllink = event.target.urllink.value

        const newBlogObject = {
            title: title,
            author: author, 
            url: urllink, 
            likes: 0
        }

        try {
            await blogService.createOne(newBlogObject, user.token)
            dispatch({ type: 'blogs/createBlog', title: title, author: author, urllink: urllink })
            dispatch({ type: 'notifications/makeNotification', message: `a new blog ${newBlogObject.title} by ${newBlogObject.author}`, errorState: false })
            setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
        } catch (exception) {
            console.log(exception)
            dispatch({ type: 'notifications/makeNotification', message: exception.response.data.error, errorState: true })
            setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
            console.log('blog creation failed')
        }

        event.target.title.value = ''
        event.target.author.value = ''
        event.target.urllink.value = ''
    }

    return(
    <div>
        <h3>Create Blog</h3>
        <form onSubmit={addBlog}>
            <div>
                title: 
                <input name='title' />
            </div>
            <div>
                author: 
                <input name='author' />
            </div>
            <div>
                url: 
                <input name='urllink' />
            </div>
            <div> 
                <button type="submit">create</button>
            </div>
        </form>
    </div>
    )
}

export default CreateBlog