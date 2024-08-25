const loginRouter = require("express").Router()
const logger = require("../utils/logger")
const config = require('../utils/config')
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body
  try {
    const user = await User.findOne({ username: username })
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) {
      // either user not found or password incorrect
      return response
        .status(401)
        .json({ error: "invalid username or password" })
    }

    const jwtPayload = {
      username: user.username,
      id: user._id,
    }
    const token = await jwt.sign(jwtPayload, config.JWT_SECRET, {
      expiresIn: 900,
    })
    response
      .status(200)
      .json({ token, expiresIn: 900, username: user.username })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter