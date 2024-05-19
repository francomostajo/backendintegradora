const socket = io();

const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = 'user@example.com'; // Placeholder, replace with actual user email or ID
    const message = input.value;
    socket.emit('chatMessage', { user, message });
    input.value = '';
});

socket.on('message', (msg) => {
    const li = document.createElement('li');
    li.textContent = `${msg.user}: ${msg.message}`;
    messages.appendChild(li);
});

socket.on('chatHistory', (msgs) => {
    msgs.forEach(msg => {
        const li = document.createElement('li');
        li.textContent = `${msg.user}: ${msg.message}`;
        messages.appendChild(li);
    });
});