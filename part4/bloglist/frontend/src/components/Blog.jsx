import { useState, useEffect } from "react"

const BlogLine = ({ blog }) => {
  return (
    <>
    <tr>
      <td>{blog.title}</td>
      <td>{blog.author}</td>
    </tr>
    </>
  )
}


const Blogs = ({ blogs }) => {

  return (
    <div>
      <table>
        <tbody>
          {blogs.map((blog) => {
            return <BlogLine key={blog.id} blog={blog} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Blogs