import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, test, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import BlogForm from "../components/BlogForm"

describe("<BlogForm />", () => {
  const createPostMockHandler = vi.fn()

  let container
  beforeEach(() => {
    container = render(
      <BlogForm createPostHandler={createPostMockHandler} />
    ).container
  })

  test("onSubmit form handler called with correct form details", async () => {
    const exampleBlog = {
      title: "Component testing is done with react-testing-library",
      author: "Anonymous Goose",
      url: "https://testing-library.com/docs/react-testing-library/intro/",
    }

    const user = userEvent.setup()
    const inputTitle = container.querySelector(`input[name="title"]`)
    const inputUrl = container.querySelector(`input[name="url"]`)
    const inputAuthor = container.querySelector(`input[name="author"]`)
    const submitButton = screen.getByText("submit")

    await user.type(inputTitle, exampleBlog.title)
    await user.type(inputAuthor, exampleBlog.author)
    await user.type(inputUrl, exampleBlog.url)
    await user.click(submitButton)

    expect(createPostMockHandler.mock.calls).toHaveLength(1)
    expect(createPostMockHandler.mock.calls[0][0]).toStrictEqual(exampleBlog)
  })
})
