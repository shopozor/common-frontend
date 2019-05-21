import validate, { passwords } from '../passwordPolicy'

describe('Password policy', () => {
  it('matches password policy', () => {
    Object.keys(passwords).forEach(description => {
      const password = passwords[description].password
      const isValid = passwords[description].isValid
      const received = `it returns ${validate(password)} if password ${description}`
      const expected = `it returns ${isValid} if password ${description}`
      expect(received).toBe(expected)
    })
  })
})
