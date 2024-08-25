const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const mongoose = require("mongoose")

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    // handle invalid resource id param
    return response.status(400).send({ error: "malformatted id" })
  }

  if (error.name === "ValidationError") {
    // handle mongoose validator exception
    return response.status(400).json({ error: error.message })
  }

  if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    // handle mongoose validator unique index exception
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" })
  }

  if (error.name === "JsonWebTokenError") {
    // handle missing jwt exception
    return response.status(401).json({ error: "invalid token" })
  }

  if (error.name === "TokenExpiredError") {
    // handle expired jwt exception
    return response.status(401).json({ error: "token expired" })
  }

  // execution continues to default Express error handler
  next(error)
}

const tokenExtractor = (request, response, next) => {
  try {
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("Bearer ")) {
      // assign token from authorization header to request object
      request.token = authorization.replace("Bearer ", "")
    } else {
      request.token = null
    }
  } catch (error) {
    next(error)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  // assume tokenExtractor middleware is taken into use before this is called
  try {
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: "invalid token" })
    }
    request.user = await User.findById(decodedToken.id)
  } catch (error) {
    next(error)
  }
  next()
}

const initMongoSession = async (request, response, next) => {
  try {
    const session = await mongoose.startSession()
    logger.info('started mongoose session', session)
    request.mongoSession = session
  } catch (error) {
    next(error)
  }
  next()
}

// middleware chain terminates here
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
  initMongoSession,
  unknownEndpoint,
}
