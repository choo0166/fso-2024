const express = require('express')
const cors = require('cors') 
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()
const personsRouter = require('./controllers/persons')
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

/* middlewares
Middleware are functions that can be used for handling request and response objects e.g.
const myLogger = function (req, res, next) {
  console.log('LOGGED') // prints `LOGGED` for every request to App
  next() // yields control to the next middleware 
} 

middlewares are called in the order of `use` statements
Note: these will be called before the route event handlers. To
call middleware on specific routes, specify them in the event 
handler */

// allow cors from frontend since backend server is listening on a different port
app.use(cors()) 
// use express json-parser for accessing json payloads in request body
app.use(express.json()) 
// morgan logger middleware
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content-body"
  )
)

/* Routers or controllers are middlewares that define event 
handlers for related routes grouped into its own module. 
Here, the notesRouter middleware is called if request URL
has /api/persons in the base path */
app.use('/api/persons', personsRouter)

/* Execution continues to this middleware when no 
event handlers are registered for a specified route */
app.use(middleware.unknownEndpoint)

// error handler middleware must be loaded last
app.use(middleware.errorHandler)

module.exports = app