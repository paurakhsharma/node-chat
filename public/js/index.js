var socket = io();

socket.on('connect', function() {
    console.log('Connected to server')
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
    console.log(message)
    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)

    jQuery('#messages').append(li)
})

socket.on('userLocation', function(message) {
    console.log(message)
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My current location</a>')

    li.text(`${message.from}: `)
    a.attr('href', message.url)
    li.append(a)
    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val(),
        createdAt: new Date().getTime()
    }, function(result) {
        console.log(result)
    })
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function(e) {
    e.preventDefault()
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords)
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

    }, function() {
        alert('Unable to fetch location')
    })
})