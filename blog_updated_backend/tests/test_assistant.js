const Blog = require('../models/blog')
const User = require('../models/user')

const testUser = [
    {
        username: 'ahoward',
        name: 'Ashley Howard',
        password: 'hidden'
    },
    {
        username: 'jdalco',
        name: 'Jess Dalco',
        password: 'alpaca1'
    }
]

const blogPool = [
    {
        title: 'Bleh Blah 1',
        author: 'Edsandwich',
        url: 'http://www.bleh.blah/',
        likes: 5
    },
    {
        title: 'Howdy Hoe Neighbourino',
        author: 'Ned Flanders',
        url: 'http://www.nedflandersacademy.com/howdy_hoe_neighbourino_blog.html',
        likes: 2
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
    }
]

const invalidUsers = [
    {
        username: 'jf',
        name: 'Jo Fegan',
        password: 'goodPassword'
    },
    {
        username: 'jfegan',
        name: 'Jo Fegan',
        password: ''
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'Ashley Howard', url: 'http://www.removethissoon.com', likes: 88 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { testUser, blogPool, invalidUsers, nonExistingId, blogsInDb, usersInDb }