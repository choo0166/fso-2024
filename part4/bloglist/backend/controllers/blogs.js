const blogsRouter = require("express").Router()
const logger = require("../utils/logger")
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  const newBlog = new Blog(request.body)
  try {
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id
  try {
    const res = await Blog.findByIdAndDelete(id)
    logger.info(res)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id
  const payload = request.body

  try {
    const res = await Blog.findByIdAndUpdate(id, payload, {
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
