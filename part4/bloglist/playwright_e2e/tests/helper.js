const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new post' }).click()
  await page.getByTestId('newBlogTitle').fill(title)
  await page.getByTestId('newBlogAuthor').fill(author)
  await page.getByTestId('newBlogUrl').fill(url)
  await page.getByRole('button', { name: 'submit' }).click()
}

module.exports = { loginWith, createBlog }