const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs')
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User
        .findById(request.params.id)
    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser._id)
})

usersRouter.put('/:id', async (request, response) => {
    await User.findByIdAndUpdate(request.params.id, request.body, { new: true, strict: true })
    response.status(204).end()
})

module.exports = usersRouter