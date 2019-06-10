import { firstUpperCase, atLeastOneMatch } from '../Helpers'

describe('Src Helpers', () => {
  it('sets the first character to uppercase', () => {
    expect(firstUpperCase('aaaa')).toBe('Aaaa')
  })

  it('checks if two arrays have one element in common', () => {
    const base = [1, 2, 2]
    const matching = [0, 1, 3]
    const nonMatching = [0, 3, 4]
    expect(atLeastOneMatch(base, matching)).toBe(true)
    expect(atLeastOneMatch(base, nonMatching)).toBe(false)
  })
})
