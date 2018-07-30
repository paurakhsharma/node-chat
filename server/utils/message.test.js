const expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        expect(true).toBe(true)
        responseMessage = generateMessage('Paurakh', 'Hello, hope you are doing well')
        expect(responseMessage.from).toBe('Paurakh')
        expect(typeof(responseMessage.createdAt)).toBe('number')
        expect(responseMessage.text).toBe('Hello, hope you are doing well')
    })
})