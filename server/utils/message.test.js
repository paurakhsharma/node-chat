const expect = require('expect')

var {generateMessage, generateUrl} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        responseMessage = generateMessage('Paurakh', 'Hello, hope you are doing well')
        expect(responseMessage.from).toBe('Paurakh')
        expect(typeof(responseMessage.createdAt)).toBe('number')
        expect(responseMessage.text).toBe('Hello, hope you are doing well')
    })
})

describe('generateUrl', () => {
    it('should generate correct url object', () => {
        responseMessage = generateUrl('UserLocation', {
            latitude: 5,
            longitude: 10
        })
        expect(responseMessage.from).toBe('UserLocation')
        expect(typeof(responseMessage.createdAt)).toBe('number')
        expect(responseMessage.url).toBe('https://www.google.com/maps?q=5,10')
    })
})