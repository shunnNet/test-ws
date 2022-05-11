const WebSocket = require('ws')
const User = require('./User')
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
// const dayjs = require("dayjs");

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/room', (req, res) => {
//   res.send(path.resolve('./public/room.html'))
// })

app.post('/join', (req, res) => {
  // console.log(req.body)
  res.send({
    message: 'OK',
  })
})

const s = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const wss = new WebSocket.Server({
  server: s,
})

function createRoom(name, users = []) {
  return {
    name,
    users: users,
    sendMessageBy(theUser, message) {
      this.users.forEach((aUserInRoom) => {
        message.isSelf = theUser.userId === aUserInRoom.userId
        aUserInRoom.ws.send(JSON.stringify(message))
      })
    },
    addUser(user) {
      this.users.push(user)
    },
    broadcast(message) {
      users.forEach((aUserInRoom) => {
        aUserInRoom.ws.send(JSON.stringify(message))
      })
    },
  }
}

const room1 = createRoom('room1', [])
const room2 = createRoom('room2', [])
const room3 = createRoom('room3', [])
const room4 = createRoom('room4', [])

const rooms = {
  room1,
  room2,
  room3,
  room4,
}

wss.on('connection', function connection(ws) {
  console.log('server connection')

  const user = new User({ ws })
  // room1.addUser(user)

  // room1.broadcast({
  //   type: 'join',
  //   message: `${user.userId} is joining room1`,
  // })

  ws.on('message', (message) => {
    const msg = JSON.parse(message)
    msg.user = user
    handleMessage(msg)
  })
})

function handleMessage(message) {
  switch (message.type) {
    case 'join':
      handleJoin(message)
      break
    case 'talk':
      handleTalk(message)

    default:
      break
  }
}

function handleJoin(message) {
  const room = rooms[message.room]
  message.user.name = message.name
  room.addUser(message.user)
  room.broadcast({
    type: 'join',
    message: `${message.user.name} is joining ${room.name}`,
  })
}
function handleTalk(message) {
  console.log(message)
  const room = rooms[message.room]

  room.sendMessageBy(message.user, {
    type: 'talk',
    userName: message.user.name,
    userId: message.user.userId,
    message: message.message,
  })
}
