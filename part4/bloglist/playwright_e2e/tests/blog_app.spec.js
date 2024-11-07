const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // make request to empty database
    await request.post('/api/testing/reset')
    // create dummy user
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testusr',
        password: 'password'
      }
    })
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })
})