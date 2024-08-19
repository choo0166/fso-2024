/* Module that handles routing for the persons resource.
This will be exported to the app entry point and taken 
into use as middleware. */
const personsRouter = require("express").Router()
const logger = require("../utils/logger")
const Contact = require("../models/contact")

/* define route event handlers, path is relative to base url
defined in app entry point */
personsRouter.get("/", (request, response, next) => {
  Contact.find({})
    .then((contacts) => {
      response.json(contacts)
    })
    .catch((error) => next(error))
})

personsRouter.get("/:id", (request, response, next) => {
  // access id in query parameters
  const id = request.params.id
  Contact.findById(id)
    .then((contact) => {
      logger.info(contact)
      response.json(contact)
    })
    // execution continues to error handler middleware
    .catch((error) => next(error))
})

personsRouter.put("/:id", (request, response, next) => {
  const id = request.params.id
  const payload = request.body

  Contact.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedContact) => {
      // return formatted object from transformed toJSON method
      if (updatedContact) {
        response.json(updatedContact)
      } else {
        // handle record with id not found
        response.status(404).json({ error: "Record does not exist on server" })
      }
    })
    .catch((error) => next(error))
})

personsRouter.post("/", (request, response, next) => {
  const payload = request.body

  const newContact = new Contact({
    name: payload.name,
    number: payload.number,
  })

  newContact
    .save()
    .then((savedContact) => {
      // return formatted object from transformed toJSON method
      response.json(savedContact)
    })
    .catch((error) => next(error))
})

personsRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id)
    .then((result) => {
      logger.info(result)
      response.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = personsRouter
