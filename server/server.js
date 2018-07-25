const path = require('path')
const http = require('http')
const express = require('express')
const socketIO =  require('socket.io')

const port = process.env.PORT || 3000;
publicPath = path.join(__dirname, '/../public')
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=> {
    console.log('New user connected')

    socket.on('createMessage', (message)=> {
        console.log(message.from, message.text)
    })

    socket.on('disconnect', ()=> {
        console.log('Client disconnected')
    })

    socket.emit('newMessage', {
        from: 'Paurakh', 
        text: 'This is Paurakh speaking. Enjoy your time',
        createdAt: 13432
    })
})

server.listen(port, ()=> {
    console.log(`Listening at port: ${port}`)
})