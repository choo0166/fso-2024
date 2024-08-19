const mongoose = require('mongoose')

// define schema for the document to be stored
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (entry) => {
        return /^\+65(6|8|9)\d{7}$/.test(entry)
      },
      message: props => `${props.value} is not a valid phone number.`
    },
    required: true
  }
})

/* define model i.e. constructor function to create new objects 
based on provided schema. Will inherit methods to query/update
objects within the collection which will be named as the plural, 
lowercase version of the provided model name */
const Contact = mongoose.model('Contact', contactSchema)

// format objects returned by mongoose on models using the schema
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // transform surrogate key to string
    delete returnedObject._id
    delete returnedObject.__v // remove mongo versioning field
  }
})

module.exports = Contact