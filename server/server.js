const path = require('path')
const http = require('http')
const express = require('express')
const socketIO =  require('socket.io')

const {generateMessage, generateUrl} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const port = process.env.PORT || 3000;
publicPath = path.join(__dirname, '/../public')
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=> {
    console.log('New user connected')

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Username and room name are required.')
            
        }
        socket.join(params.room)


        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))
        callback()
    })

    socket.on('createMessage', (message, callback)=> {
        console.log(message)
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server'); 
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     })
    })

    socket.on('createLocationMessage', (coords)=> {
        io.emit('userLocation', generateUrl("UserLocation", coords))
    })

    socket.on('disconnect', ()=> {
        console.log('Client disconnected')
    })

})

server.listen(port, ()=> {
    console.log(`Listening at port: ${port}`)
})