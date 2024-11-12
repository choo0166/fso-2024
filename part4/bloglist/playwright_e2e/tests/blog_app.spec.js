const { test, describe, expect, beforeEach } = require("@playwright/test")
const { loginWith, createBlog } = require("./helper")

const exampleBlog = {
  title: "Component testing is done with react-testing-library",
  author: "Anonymous Goose",
  url: "https://testing-library.com/docs/react-testing-library/intro/",
}

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // make request to empty database
    await request.post("/api/testing/reset")
    // create dummy users
    await request.post("/api/users", {
      data: {
        name: "Test User",
        username: "testusr",
        password: "password",
      },
    })
    await request.post("/api/users", {
      data: {
        name: "Test User 2",
        username: "testusr2",
        password: "password",
      },
    })
    await page.goto("/")
  })

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Blogs")
    await expect(locator).toBeVisible()
  })

  test("Login form is shown", async ({ page }) => {
    const loginBtn = await page.getByRole("button", { name: "login" })
    const userInput = page.getByTestId("username")
    const pwInput = page.getByTestId("password")

    expect(loginBtn).toBeVisible()
    expect(userInput).toBeVisible()
    expect(pwInput).toBeVisible()
  })

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "testusr", "password")
      const userBarDiv = await page.locator(".userBar")
      await page.waitForLoadState()
      expect(userBarDiv).toContainText("testusr logged in")
    })

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "testusr", "wrongpassword")
      const errorDiv = await page.locator(".error")
      expect(errorDiv).toContainText("Login failed due to invalid credentials")
      expect(errorDiv).toHaveCSS("border-style", "solid")
      expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)")
      await expect(page.getByText("testusr logged in")).not.toBeVisible()
    })
  })

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "testusr", "password")
      await page.waitForLoadState()
    })

    test("logout prevents new blog creation", async ({ page }) => {
      await page.getByRole("button", { name: "Logout" }).click()
      await expect(
        page.getByRole("button", { name: "create new post" })
      ).not.toBeVisible()
    })

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        exampleBlog.title,
        exampleBlog.author,
        exampleBlog.url
      )
      const blogsDiv = await page.locator(".blogList")
      expect(blogsDiv).toContainText(
        `${exampleBlog.title} by ${exampleBlog.author}`
      )
    })

    test("blog can be liked", async ({ page }) => {
      await createBlog(
        page,
        exampleBlog.title,
        exampleBlog.author,
        exampleBlog.url
      )
      await page.getByRole("button", { name: "view" }).click()
      await expect(page.getByText("likes: 0")).toBeVisible()
      await page.getByRole("button", { name: "like" }).click()
      await expect(page.getByText("likes: 1")).toBeVisible()
    })

    test("created blog can be deleted", async ({ page }) => {
      await createBlog(
        page,
        exampleBlog.title,
        exampleBlog.author,
        exampleBlog.url
      )
      await page.getByRole("button", { name: "view" }).click()
      // register a dialog handler
      page.on("dialog", (dialog) => dialog.accept())
      await page.getByRole("button", { name: "remove" }).click()

      const blogsDiv = await page.locator(".blogList")
      expect(blogsDiv).not.toContainText(
        `${exampleBlog.title} by ${exampleBlog.author}`
      )
    })

    test("delete button is shown only when blog is created by logged in user", async ({
      page,
    }) => {
      // create test blog as first dummy user
      await createBlog(
        page,
        exampleBlog.title,
        exampleBlog.author,
        exampleBlog.url
      )
      await page.getByRole("button", { name: "view" }).click()
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible()
      // logged out
      await page.getByRole("button", { name: "Logout" }).click()
      await page.waitForLoadState()
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible()
      // login as other dummy user
      await loginWith(page, "testusr2", "password")
      await page.waitForLoadState()
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible()
    })

    test("blogs should be arranged in descending order of likes", async ({
      page,
    }) => {
      const exampleBlogs = [
        {
          title: "Understanding React Component Lifecycle",
          author: "Jane Doe",
          url: "https://reactjs.org/docs/react-component-lifecycle.html",
          likes: 1,
        },
        {
          title: "Mastering JavaScript Closures",
          author: "John Smith",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
          likes: 2,
        },
        {
          title: "Building Scalable Web Applications with Node.js",
          author: "Alex Johnson",
          url: "https://nodejs.org/en/docs/guides/scalable-application-building/",
          likes: 3,
        },
      ]

      for (const blog of exampleBlogs) {
        await createBlog(page, blog.title, blog.author, blog.url)
      }

      // send likes to each post
      await page.getByRole("button", { name: "view" }).first().click()
      const likeFirst = await page
        .getByText(exampleBlogs[0].title)
        .locator("span")
        .getByRole("button", { name: "like" })

      for (let i = 0; i < exampleBlogs[0].likes; i++) {
        await likeFirst.click()
        await page.waitForLoadState()
      }

      await page.getByRole("button", { name: "view" }).first().click()
      const likeSecond = await page
        .getByText(exampleBlogs[1].title)
        .locator("span")
        .getByRole("button", { name: "like" })

      for (let i = 0; i < exampleBlogs[1].likes; i++) {
        await likeSecond.click()
        await page.waitForLoadState()
      }

      await page.getByRole("button", { name: "view" }).first().click()
      const likeThird = await page
        .getByText(exampleBlogs[2].title)
        .locator("span")
        .getByRole("button", { name: "like" })

      for (let i = 0; i < exampleBlogs[2].likes; i++) {
        await likeThird.click()
        await page.waitForLoadState()
      }

      // verify order of posts
      const blogsDiv = await page.locator(".blogDetails")
      expect(blogsDiv.nth(0)).toContainText(exampleBlogs[2].title)
      expect(blogsDiv.nth(1)).toContainText(exampleBlogs[1].title)
      expect(blogsDiv.nth(2)).toContainText(exampleBlogs[0].title)
    })
  })
})
