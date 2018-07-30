var socket = io();

socket.on('connect', function() {
    console.log('Connected to server')
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
    console.log(message)
})

socket.emit('createMessage', {
    from: "Paurakh",
    text: "K xa keto tero khabar"
}, function(result) {
    console.log(result)
})