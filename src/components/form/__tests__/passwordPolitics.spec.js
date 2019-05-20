import validate from '../passwordPolitics'

describe('Password politics', () => {
  it('returns false if password length is smaller than 8', () => {
    expect(validate('aBc4!=7')).toBe(false)
  })

  it('returns false if password length is greater than 20', () => {
    expect(validate('abc4!=789012345678901')).toBe(false)
  })

  it('returns true in all other cases', () => {
    expect(validate('abc4!=78'))
  })
})
