import { set, get, del } from '../cookie'

describe('Cookie manager', () => {
  const cookieId = 'testId'
  const cookieValue = 'testValue'
  var cookieDuration = 1

  test('function set creates a cookie with specified id, value and duration (in days)', () => {
    set({ cookieId, cookieValue, cookieDuration })
    expect(document.cookie).toBe(`${cookieId}=${cookieValue}`)
  })

  test('the created cookie is deleted after the specified duration', () => {
    cookieDuration = 0
    set({ cookieId, cookieValue, cookieDuration })
    expect(document.cookie).toBeFalsy()
  })

  test('function get returns the cookie value when given the cookie id', () => {
    cookieDuration = 1
    set({ cookieId, cookieValue, cookieDuration })
    expect(get({ cookieId })).toBe(cookieValue)
  })

  test('function del deletes the cookie', () => {
    set({ cookieId, cookieValue, cookieDuration })
    del({ cookieId })
    expect(document.cookie).toBeFalsy()
  })
})
