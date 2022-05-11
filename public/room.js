const url = new URL(location.href)

const ROOM = url.searchParams.get('room')
const NAME = url.searchParams.get('name')

const SERVER = `ws://${window.location.host}/`

const ws = new WebSocket(SERVER)

console.log(ws)

ws.addEventListener('open', function () {
  console.log('連結建立成功。')
  sendMessage({
    type: 'join',
    name: NAME,
    room: ROOM,
  })
})

ws.addEventListener('error', function () {
  console.log('發生錯誤')
})

ws.addEventListener('close', function (e) {
  console.log('連結關閉，下次見~')
})

ws.addEventListener('message', function (e) {
  const message = getMessage(e)
  switch (message.type) {
    case 'talk':
      handleGetTalk(message)
      break

    default:
      console.log(message)
      break
  }
})

// setTimeout(function () {
//   var testMsg = { name: 'August', blog: "Let's Write" }
//   ws.send(JSON.stringify(testMsg))
//   // setTimeout(function () {
//   //   ws.close()
//   // }, 10000)
// }, 3000)

function sendMessage(data) {
  ws.send(JSON.stringify(data))
}
function getMessage(event) {
  return JSON.parse(event.data)
}

const talkForm = document.getElementById('talk')
const talkInput = document.getElementById('input')
talkForm.addEventListener('submit', handleSendTalk)

function handleSendTalk(event) {
  event.preventDefault()
  sendMessage({
    type: 'talk',
    userName: NAME,
    message: talkInput.value,
    room: ROOM,
  })
  talkForm.reset()
}

const chat = document.getElementById('chat')

function handleGetTalk(message) {
  if (message.isSelf) {
    chat.innerHTML += `
      <div class="message-wrapper self">
        <div class="message">${message.message}</div>
      </div>
    `
  } else {
    chat.innerHTML += `
      <div class="message-wrapper">
        <div class="name">${message.userName}</div>
        <div class="message">${message.message}</div>
      </div>
    `
  }
  window.scrollTo(0, document.body.scrollHeight)
}
