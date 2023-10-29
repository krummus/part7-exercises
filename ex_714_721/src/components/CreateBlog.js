import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
            const response = await blogService.createOne(newBlogObject, user.token)
            dispatch({ type: 'blogs/createBlog',
                        title: response.title, 
                        author: response.author, 
                        urllink: response.urllink,
                        likes: response.likes,
                        users: response.users,
                        comments: response.comments,
                        id: response.id    
                    })

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
        <h3 class='createBlog'>Create Blog</h3>
        <form onSubmit={addBlog}>
            <div>
                <TextField label='Title' variant='outlined' name='title' size='small' />
            </div>
            <div>
                <TextField label='Author' variant='outlined' name='author' size='small' />
            </div>
            <div>
                <TextField label='URL' variant='outlined' name='urllink' size='small' />
            </div>
            <div>
                <Button variant='outlined' size ='large' type='submit'>Create</Button> 
            </div>
        </form>
    </div>
    )
}

export default CreateBlog