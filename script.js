// Get the chat input elements
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.querySelector('.chat-messages');

// Function to add a user message to the chat window
function addUserMessage(message) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');
  messageContainer.classList.add('user');
  
  const messageElement = document.createElement('div');
  messageElement.classList.add('bubble');
  messageElement.classList.add('user-bubble');
  
  messageElement.innerText = message;
  messageContainer.appendChild(messageElement);
  chatMessages.appendChild(messageContainer);
}

// Function to add a bot message to the chat window
function addBotMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add('ai');

  // Check if the response contains any HTML code
  const isHTML = message.includes('<');

  const bubbleElement = document.createElement('div');
  bubbleElement.classList.add('bubble');
  bubbleElement.classList.add('ai');

  // If the response contains HTML code, add a preview element
  if (isHTML) {
    const previewElement = document.createElement('div');
    previewElement.innerHTML = message;
    previewElement.classList.add('html-preview');
    bubbleElement.appendChild(previewElement);
  } else {
    bubbleElement.innerText = message;
  }

  messageElement.appendChild(bubbleElement);
  chatMessages.appendChild(messageElement);
}



// Function to send user input to the GPT API and display the bot response
function sendMessage() {
  const userInputValue = userInput.value.trim();

  if (userInputValue !== '') {
    // Add user message to chat window
    addUserMessage(userInputValue);

    fetch('https://api.itsrose.site/others/simi?text=' + userInputValue + '&level=18&lc=id')
      .then(res => res.json())
      .then(res => {
        // Add bot response to chat window
        addBotMessage(res.result.simi.original);
      })
      .catch(err => console.error(err));

    // Clear the user input
    userInput.value = '';
  }
}

// Add event listener to the send button
sendBtn.addEventListener('click', sendMessage);

// Add event listener to the input field to also allow sending a message by pressing Enter
userInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});