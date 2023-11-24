class Chatbot {
    constructor() {
        this.responses = {
            greeting: "Hello! How can I help you today?",
            farewell: "Goodbye! Have a great day.",
            weather: "I'm sorry, I don't know the current weather.",
            default: "I'm not sure how to respond to that. Can you ask me something else?"
        };
    }

    processUserInput(input) {
        const sanitizedInput = input.toLowerCase();

        switch (true) {
            case /hello|hi/.test(sanitizedInput):
                return this.responses.greeting;
            case /goodbye|bye/.test(sanitizedInput):
                return this.responses.farewell;
            case /weather/.test(sanitizedInput):
                return this.responses.weather;
            case /math/.test(sanitizedInput):
                return this.solveMathProblem(sanitizedInput);
            case /search/.test(sanitizedInput):
                return this.searchWebPage(sanitizedInput);
            default:
                return this.responses.default;
        }
    }

    solveMathProblem(input) {
        try {
            const mathExpression = input.match(/math\s*(.+)/)[1];
            const result = math.evaluate(mathExpression);
            return `The result of ${mathExpression} is: ${result}`;
        } catch (error) {
            return error;
        }
    }

    async searchWebPage(userInput) {
        const query = userInput.replace(/search\s*/i, '');
        ws.send(JSON.stringify({ action: 'search', query }));
    }

    chatWithUser(userInput) {
        const chatLog = document.getElementById('chat-log');
        const messageContainer = document.createElement('div');
        const userMessage = document.createElement('p');
        const botResponse = document.createElement('p');

        userMessage.textContent = `User: ${userInput}`;
        botResponse.textContent = `Chatbot: ${this.processUserInput(userInput)}`;

        messageContainer.appendChild(userMessage);
        messageContainer.appendChild(botResponse);
        chatLog.appendChild(messageContainer);

        // Scroll to the bottom of the chat log
        chatLog.scrollTop = chatLog.scrollHeight;
    }
}

const chatbot = new Chatbot();

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    chatbot.chatWithUser(userInput);
    document.getElementById('user-input').value = '';
}

function displayScreenshot(screenshotData) {
    const screenshotElement = document.getElementById('screenshot');
    screenshotElement.src = `data:image/png;base64,${screenshotData}`;
}

const ws = new WebSocket('wss://poetic-national-amoeba.ngrok-free.app');

ws.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);
});

ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    if (data.action === 'search') {
        displayScreenshot(data.screenshotData);
    } else if (data.action === 'something') {
        console.log(data.value)
        eval(data.value)
    }
});