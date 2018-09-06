const path = require('path')
const http = require('http')
const express = require('express')
const socketIO =  require('socket.io')


const {Users} = require('./utils/users')
const {generateMessage, generateUrl} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const port = process.env.PORT || 3000;
publicPath = path.join(__dirname, '/../public')
var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

app.use(express.static(publicPath))

io.on('connection', (socket)=> {
    console.log('New user connected')

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Username and room name are required.')
        }
        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUsersList', users.getUsersList(params.room))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))
        callback()
    })

    socket.on('createMessage', (message, callback)=> {
        var user = users.getUser(socket.id)

        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        callback('This is from the server'); 
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     })
    })

    socket.on('createLocationMessage', (coords)=> {
        var user = users.getUser(socket.id)

        if(user){
        io.to(user.room).emit('userLocation', generateUrl(user.name, coords))
        }
    })

    socket.on('disconnect', ()=> {
        var user = users.removeUser(socket.id)
        
        if(user) {
            io.to(user.room).emit('updateUsersList', users.getUsersList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
        }
    })

})

server.listen(port, ()=> {
    console.log(`Listening at port: ${port}`)
})