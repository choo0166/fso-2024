/* Helper functions for testing */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let currentMax = 0
  return blogs.reduce((result, blog) => {
    if (blog.likes > currentMax) {
      currentMax = blog.likes
      return blog
    } 
    return result
  }, {})
}

const mostBlogs = (blogs) => {
  // create map of authors and blog counts
  if (blogs.length === 0) {
    return {}
  }
  const authorMap = new Map()
  blogs.forEach((blog) => {
    if (authorMap.has(blog.author)) {
      authorMap.set(blog.author, authorMap.get(blog.author) + 1)
    } else {
      authorMap.set(blog.author, 1)
    }
  })
  // find the author with most blogs
  let result
  let maxCount = 0
  for (const [author, blogCount] of authorMap) {
    if (blogCount > maxCount) {
      maxCount = blogCount
      result = author
    }
  }
  return {
    author: result,
    blogs: maxCount,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  // create map of authors and likes counts
  const authorMap = new Map()
  blogs.forEach((blog) => {
    if (authorMap.has(blog.author)) {
        authorMap.set(blog.author, authorMap.get(blog.author) + blog.likes)
    } else {
        authorMap.set(blog.author, blog.likes)
    }
  })
  // find the author with most likes
  let result
  let maxCount = 0
  for (const [author, likeCount] of authorMap) {
    if (likeCount > maxCount) {
      maxCount = likeCount
      result = author
    }
  }
  return {
    author: result,
    likes: maxCount,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}