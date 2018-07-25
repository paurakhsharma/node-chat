var socket = io();

socket.on('connect', function() {
    console.log('Connected to server')

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Hello keto k xa khabar'
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
    console.log(message)
})