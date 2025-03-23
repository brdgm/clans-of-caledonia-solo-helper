import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Clans of Caledonia Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('button', { name: 'Setup Automa' }).click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play a few turns
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Action Completed' }).click()
  await page.getByRole('button', { name: 'Pass' }).click()
  await page.locator('#passModal').getByRole('button', { name: 'Pass' }).click()
  await page.getByRole('button', { name: 'Action Completed' }).click()

  // finish game
  await page.getByRole('button', { name: 'Abort Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Abort Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Clans of Caledonia Solo Helper')
})
