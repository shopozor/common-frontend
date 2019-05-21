import validate, { passwords } from '../passwordPolitics'

describe('Password politics', () => {
  it('matches password politics', () => {
    Object.keys(passwords).forEach(description => {
      const password = passwords[description].password
      const isValid = passwords[description].isValid
      const received = `it returns ${validate(password)} if password ${description}`
      const expected = `it returns ${isValid} if password ${description}`
      expect(received).toBe(expected)
    })
  })
})
