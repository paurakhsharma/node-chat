var moment = require('moment')

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}

var generateUrl = (from, coords) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateUrl}