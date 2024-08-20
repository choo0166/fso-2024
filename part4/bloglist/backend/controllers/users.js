const usersRouter = require("express").Router()
const logger = require("../utils/logger")
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
      username,
      name,
      passwordHash 
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
