const usersRouter = require("express").Router()
const logger = require("../utils/logger")
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (request, response, next) => {
  try {
    // populate replaces ObjectIds in field with actual documents
    const users = await User.find({}).populate("blogs")
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body
  const saltRounds = 10

  if (password.length < 3) {
    return response
      .status(400)
      .send({ error: "password length must be at least 3 characters." })
  }
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
