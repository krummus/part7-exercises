const testsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

testsRouter.post('/reset', async (request, response) => {
    await User.deleteMany({})
    console.log('deleted users')
    await Blog.deleteMany({})
    console.log('deeted blogs')

    response.status(200).end()
})

module.exports = testsRouter