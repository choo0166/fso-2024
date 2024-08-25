/* Configuration module - All environmental variables are imported here */
require("dotenv").config()

const PORT = process.env.PORT || 3001
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

module.exports = { PORT, MONGODB_URI, JWT_SECRET }
