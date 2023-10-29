const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('users')
    response.json(blogs)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const currBlog = await Blog.findById(request.params.id)
    const updatedBlog = {
        ...currBlog,
        comments: currBlog.append(request.body.newComment)
    }
    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
    const blogs = await Blog
        .findById(request.params.id).populate('users')
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        users: user.id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await User.findOneAndUpdate({ username: user.username }, { blogs: user.blogs })

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)
    const user = request.user

    if (blogToDelete.users.find(bl => bl.toString() === user.id)) {
        await Blog.findByIdAndRemove(request.params.id)
        user.blogs = user.blogs.filter(bl => bl.toString() !== request.params.id)
        await User.findByIdAndUpdate(user.id, user, { new: true })
        response.status(204).end()
    }else{
        return response.status(401).json({ error: 'user unable to remove' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(204).end()
})

module.exports = blogsRouter