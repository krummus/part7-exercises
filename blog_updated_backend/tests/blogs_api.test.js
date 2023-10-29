const mongoose = require('mongoose')
const supertest = require('supertest')
const assistant = require('./test_assistant')
const bcrypt = require('bcryptjs')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(assistant.testUser[0].password, 10)
    let userObject1 = new User({ username: assistant.testUser[0].username, name: assistant.testUser[0].name, passwordHash: passwordHash })
    await userObject1.save()

    const passwordHash2 = await bcrypt.hash(assistant.testUser[1].password, 10)
    let userObject2 = new User({ username: assistant.testUser[1].username, name: assistant.testUser[1].name, passwordHash: passwordHash2 })
    await userObject2.save()
})

describe('test for users', () => {
    test('users contains a user', async () => {
        await api
            .get('/api/users')
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await assistant.usersInDb()
        expect(usersAtEnd).toHaveLength(2)
    })
})

describe('tests for initial testing', () => {
    test('user login delivers a token', async () => {
        const restoken1 = await api
            .post('/api/login')
            .send({ username: assistant.testUser[0].username, password: assistant.testUser[0].password })
        expect(restoken1.body.token).not.toEqual(null)
    })

    test('user login with incorrect credentials - password excluded', async () => {
        const fakeUser = {
            username: 'jf',
            name: 'Jo Fegan',
            password: 'goodPassword'
        }
        await api
            .post('/api/login')
            .send({ username: fakeUser.username })
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('user login with incorrect credentials password included', async () => {
        const fakeUser = {
            username: 'jf',
            name: 'Jo Fegan',
            password: 'goodPassword'
        }
        await api
            .post('/api/login')
            .send({ username: fakeUser.username, password: fakeUser.password })
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Adding Blogs to the database', () => {
    test('First adding without credentials - no token', async () => {
        const newBlog = {
            title: 'Joe Rogan',
            author: 'Wikipedia contributors',
            url: 'https://en.wikipedia.org/wiki/Joe_Rogan',
            likes: 8,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        await api
            .get('/api/blogs')
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await assistant.blogsInDb()
        expect(blogsAtEnd).toHaveLength(0)
    })

    test('First adding without credentials - with made-up token', async () => {
        await api
            .post('/api/login')
            .send({ username: assistant.testUser[0].username, password: assistant.testUser[0].password })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: 'Joe Rogan',
            author: 'Wikipedia contributors',
            url: 'https://en.wikipedia.org/wiki/Joe_Rogan',
            likes: 8,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer 62ff96803cb7e0d32819d4b5')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const currBlogs1 = await assistant.blogsInDb()
        expect(currBlogs1).toHaveLength(0)
    })

    test('First adding without credentials - with useful token for user 1', async () => {
        const token2 = await api
            .post('/api/login')
            .send({ username: assistant.testUser[0].username, password: assistant.testUser[0].password })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: 'Joe Rogan',
            author: 'Wikipedia contributors',
            url: 'https://en.wikipedia.org/wiki/Joe_Rogan',
            likes: 8,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token2.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const currBlogs2 = await assistant.blogsInDb()
        expect(currBlogs2).toHaveLength(1)
    })

    test('attempt to delete blog with token from other user', async () => {
        const token3 = await api
            .post('/api/login')
            .send({ username: assistant.testUser[0].username, password: assistant.testUser[0].password })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const token4 = await api
            .post('/api/login')
            .send({ username: assistant.testUser[1].username, password: assistant.testUser[1].password })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: 'Joe Rogan',
            author: 'Wikipedia contributors',
            url: 'https://en.wikipedia.org/wiki/Joe_Rogan',
            likes: 8,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token3.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newBlog2 = {
            title: 'Howdy Hoe Neighbourino',
            author: 'Ned Flanders',
            url: 'http://www.nedflandersacademy.com/howdy_hoe_neighbourino_blog.html',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token4.body.token}`)
            .send(newBlog2)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const currBlogs2 = await assistant.blogsInDb()
        const currUsers2 = await assistant.usersInDb()
        const blogToDelete2 = currBlogs2.filter(bl => bl.users[0].toString() === currUsers2[0].id.toString())
        const blogToDelete2id = blogToDelete2[0].id.toString()

        await api
            .delete(`/api/blogs/${blogToDelete2id}`)
            .set('Authorization', `Bearer ${token4.body.token}`)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('attempt to delete blog with token from authorized user', async () => {
        const token3 = await api
            .post('/api/login')
            .send({ username: assistant.testUser[0].username, password: assistant.testUser[0].password })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const token4 = await api
            .post('/api/login')
            .send({ username: assistant.testUser[1].username, password: assistant.testUser[1].password })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const newBlog = {
            title: 'Joe Rogan',
            author: 'Wikipedia contributors',
            url: 'https://en.wikipedia.org/wiki/Joe_Rogan',
            likes: 8,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token3.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newBlog2 = {
            title: 'Howdy Hoe Neighbourino',
            author: 'Ned Flanders',
            url: 'http://www.nedflandersacademy.com/howdy_hoe_neighbourino_blog.html',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token4.body.token}`)
            .send(newBlog2)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const currBlogs2 = await assistant.blogsInDb()
        const currUsers2 = await assistant.usersInDb()
        const blogToDelete2 = currBlogs2.filter(bl => bl.users[0].toString() === currUsers2[0].id.toString())
        const blogToDelete2id = blogToDelete2[0].id.toString()

        await api
            .delete(`/api/blogs/${blogToDelete2id}`)
            .set('Authorization', `Bearer ${token3.body.token}`)
            .expect(204)

        const currBlogs3 = await assistant.blogsInDb()
        expect(currBlogs3).toHaveLength(1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})