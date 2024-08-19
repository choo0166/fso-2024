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
})

const Blog = mongoose.model("Blog", blogSchema)

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // transform surrogate key to string
    delete returnedObject._id
    delete returnedObject.__v // remove mongo versioning field
  },
})

module.exports = Blog