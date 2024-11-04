import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, test, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import Blogs from "../components/Blog"

const blogs = [
  {
    id: "0",
    title: "Component testing is done with react-testing-library",
    author: "Anonymous Goose",
    url: "https://testing-library.com/docs/react-testing-library/intro/",
    likes: 0,
    user: {
      username: "agoose",
      name: "Anonymous Goose",
    },
  },
]

describe("<Blogs />", () => {
  // mock handlers
  const likeBlogMockHandler = vi.fn()
  
  let container
  // define handler to be called before each test
  beforeEach(() => {
    container = render(
      <Blogs blogs={blogs} likeBlogHandler={likeBlogMockHandler} />
    ).container
  })

  test("renders blog title and author by default", () => {
    const e = screen.getByText(`${blogs[0].title} by ${blogs[0].author}`)
    const div = container.querySelector(".togglableDetails")
    expect(e).toBeDefined()
    expect(div).toHaveStyle("display: none")
  })

  test("show blog url and likes when view button is clicked", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)

    const div = container.querySelector(".togglableDetails")
    expect(div).not.toHaveStyle("display: none")
    const e1 = screen.getByText(`${blogs[0].url}`)
    const e2 = screen.getByText(`likes: ${blogs[0].likes}`)
    expect(e1).toBeDefined()
    expect(e2).toBeDefined()
  })

  test("like handler is called twice when button is clicked twice", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("like")
    await user.click(button)
    await user.click(button)

    expect(likeBlogMockHandler.mock.calls).toHaveLength(2)
  })
})
