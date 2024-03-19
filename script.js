const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3000');

// Log errors.
socket.onerror = function(error) {
  console.error('WebSocket Error: ', error);
};

// Log messages from the server.
socket.onmessage = function(event) {
  const message = document.createElement('div');
  message.textContent = event.data;
  messagesDiv.appendChild(message);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Send a message when the send button is clicked.
sendButton.addEventListener('click', function() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.send(message);
    messageInput.value = '';
  }
});

// Send a message when the Enter key is pressed.
messageInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});
