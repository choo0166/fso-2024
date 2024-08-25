const blogsRouter = require("express").Router()
const logger = require("../utils/logger")
const User = require("../models/user")
const Blog = require("../models/blog")
const { initMongoSession } = require("../utils/middleware")

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post("/", initMongoSession, async (request, response, next) => {
  const { token, user, mongoSession } = request
  logger.info(user)

  if (!token || !user) {
    return response.status(401).json({ error: "invalid credentials" })
  }
  try {
    const newBlog = new Blog({ ...request.body, user: user._id })
    logger.info("starting new mongo transaction...")
    mongoSession.startTransaction()

    logger.info("saving new blog ", newBlog)
    const savedBlog = await newBlog.save({ session: mongoSession })
    // Add the newly created blog ObjectId to user and update in users collection
    const updatedUser = await User.findByIdAndUpdate(
      user._id.toString(),
      {
        blogs: user.blogs.concat(savedBlog._id),
      },
      { new: true }
    ).session(mongoSession)
    if (updatedUser) {
      // commit changes if update is successful
      await mongoSession.commitTransaction()
      response.status(201).json(savedBlog)
    } else {
      await mongoSession.abortTransaction()
      response
        .status(404)
        .json({ error: "User record does not exist on server" })
    }
  } catch (error) {
    await mongoSession.abortTransaction()
    next(error)
  } finally {
    // close the mongo session
    logger.info("Terminating mongoose session")
    mongoSession.endSession()
  }
})

blogsRouter.delete(
  "/:id",
  initMongoSession,
  async (request, response, next) => {
    const blogId = request.params.id
    const { token, user, mongoSession } = request
    logger.info(user)

    if (!token || !user) {
      return response.status(401).json({ error: "invalid credentials" })
    }
    try {
      const blog = await Blog.findById(blogId)

      if (blog.user.toString() === user._id.toString()) {
        logger.info("starting new mongo transaction...")
        mongoSession.startTransaction()
        const res = await Blog.findByIdAndDelete(blogId).session(mongoSession)
        logger.info("deleted ", res)
        // Remove the deleted blog ObjectId from user and update in users collection
        const updatedUser = await User.findByIdAndUpdate(
          user._id.toString(),
          {
            blogs: user.blogs.filter((oid) => oid.toString() !== blogId),
          },
          { new: true }
        ).session(mongoSession)
        if (updatedUser) {
          // commit changes if update is successful
          await mongoSession.commitTransaction()
          response.status(204).end()
        } else {
          await mongoSession.abortTransaction()
          response
            .status(404)
            .json({ error: "User record does not exist on server" })
        }
      } else {
        response.status(403).json({ error: "unauthorized" })
      }
    } catch (error) {
      await mongoSession.abortTransaction()
      next(error)
    } finally {
      logger.info("Terminating mongoose session")
      mongoSession.endSession()
    }
  }
)

blogsRouter.put("/:id", async (request, response, next) => {
  const blogId = request.params.id
  const { token, user, body } = request

  if (!token || !user) {
    return response.status(401).json({ error: "invalid credentials" })
  }
  try {
    const res = await Blog.findByIdAndUpdate(blogId, body, {
      new: true,
      runValidators: true,
      context: "query",
    })
    if (res) {
      response.json(res)
    } else {
      response.status(404).json({ error: "Record does not exist on server" })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
