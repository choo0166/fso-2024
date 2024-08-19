const express = require('express')
const cors = require('cors') 
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()
const blogsRouter = require('./controllers/blogs')
const morgan = require("morgan")
const middleware = require('./utils/middleware')

/* MongoDB init
This allows fields not specified in schema to be saved */
mongoose.set('strictQuery',false)

logger.info("Connecting to DB...")
mongoose.connect(config.MONGODB_URI)
.then(res => logger.info("Connected to MongoDB"))
.catch(err => {
  logger.error("error connecting to MongoDB: ", err.message)
})

// morgan logging token for request body
morgan.token("content-body", (request, response) => {
  return JSON.stringify(request.body)
})

app.use(cors()) 
app.use(express.json()) 
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content-body"
  )
)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app