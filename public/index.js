const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = document.getElementById('name').value
  if (!name) {
    window.alert('name is required')
    return
  }
  const room = document.getElementById('room').value

  window.location.href = `/room.html?room=${room}&name=${name}`

  // fetch('/join', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     name,
  //     room,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     window.location = '/room.html'
  //     console.log(res)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
})
