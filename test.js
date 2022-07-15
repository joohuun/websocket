let url = 'ws://127.0.0.1:8000/ws/socket-server/'

const chatSocket = new WebSocket(url)
chatSocket.onopen = () => chatSocket.send(JSON.stringify({
    'event_pk': event_pk,
    'participant_pk': 1,
    'isConnected': 'true',
}));

chatSocket.onmessage = function (e) {
    let data = JSON.parse(e.data)
    console.log('Data:', data)

    if (data.type === 'chat') {
        let messages = document.getElementById('messages')

        messages.insertAdjacentHTML('beforeend', `<div>
                                        <p>${data.message}</p>
                                    </div>`)
    }
}

let form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = e.target.message.value
    chatSocket.send(JSON.stringify({
        'message': message
    }))
    form.reset()
})