const expect = require('expect')

var {isRealString} = require('./validation')

describe('validate input data', () => {
  it('should reject empty value', () => {
    expect(isRealString('')).toBe(false)
  })

  it('should reject empty white spaces', () => {
    expect(isRealString('     ')).toBe(false)
  })

  it('should accept valid word', () => {
    expect(isRealString('Hello')).toBe(true)
  })

  it('should accept valid two words', () => {
    expect(isRealString('Mero nam')).toBe(true)
  })

  it('should accept valid two words with white spaces in sides', () => {
    expect(isRealString('Mero nam    ')).toBe(true)
  })
  it('should accept numbers', ()=> {
    expect(isRealString('9099 ')).toBe(true)
  })
})