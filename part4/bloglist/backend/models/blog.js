const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  /* user field is an ObjectId (_id), and any _id 
  stored here must be from the User model */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Blog = mongoose.model("Blog", blogSchema)

/* Sanitize returned fields when toJSON or JSON.stringify 
method is called on returned object from model */
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // transform surrogate key to string
    delete returnedObject._id
    delete returnedObject.__v // remove mongo versioning field
  },
})

module.exports = Blog
