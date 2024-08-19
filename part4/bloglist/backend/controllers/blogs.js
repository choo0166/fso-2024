const blogsRouter = require("express").Router()
const logger = require("../utils/logger")
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((error) => next(error))
})

blogsRouter.post("/", (request, response, next) => {
  const newBlog = new Blog(request.body)

  newBlog
    .save()
    .then((savedBlog) => {
      // return formatted object from transformed toJSON method
      response.status(201).json(savedBlog)
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter