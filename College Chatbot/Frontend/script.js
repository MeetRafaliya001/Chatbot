
const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

async function sendMessage() {
    const message = userInput.value.trim();
    if(message) {
        addUserMessage(message);
        userInput.value = '';
        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: message})
            });
            
            const data = await response.json();
            addBotMessage(data.response);
        } catch (error) {
            addBotMessage('Sorry, I am having trouble connecting to the server.');
        }
    }
}

// Remove numeric input restriction
userInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        sendMessage();
    }
});
