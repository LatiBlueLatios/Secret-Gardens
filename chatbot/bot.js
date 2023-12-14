class Chatbot {
    constructor() {
        this.responses = {
            greetings: [
                "Hello! How can I help you today?",
                "Hi there! What can I do for you?",
                "Greetings! How may I assist you?",
                "No",
            ],
            farewell: [
                "Goodbye! Have a great day.",
                "It's been nice talking to you. Cya!",
                "Farewell! Have fun and stay safe."
            ],
            default: "I'm not sure how to respond to that. Can you ask me something else?"
        };
    }

    getRandomResponse(response) {
        const randomIndex = Math.floor(Math.random() * this.responses[response].length);
        return this.responses[response][randomIndex];
    }

    processUserInput(input) {
        const sanitizedInput = input.toLowerCase().trim();

        switch (true) {
            case /hello|hi/.test(sanitizedInput):
                return this.getRandomResponse('greetings');
            case /goodbye|bye/.test(sanitizedInput):
                return this.getRandomResponse('farewell');
            case /math/.test(sanitizedInput):
                return this.solveMathProblem(sanitizedInput);
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
            return "I'm sorry, I couldn't compute that. Please enter a valid math expression.";
        }
    }

    appendMessageToChatLog(role, text) {
        const chatLog = document.getElementById('chat-log');
        const messageContainer = document.createElement('div');
        const message = document.createElement('p');

        message.textContent = `${role}: ${text}`;
        messageContainer.appendChild(message);
        chatLog.appendChild(messageContainer);

        chatLog.scrollTop = chatLog.scrollHeight;
    }

    chatWithUser(userInput) {
        this.appendMessageToChatLog("User", userInput);
        const response = this.processUserInput(userInput);

        if (response instanceof Promise) {
            response
                .then((botMessage) => {
                    this.appendMessageToChatLog("Chatbot", botMessage);
                })
                .catch((error) => {
                    this.appendMessageToChatLog("Chatbot", error);
                });9
        } else {
            this.appendMessageToChatLog("Chatbot", response);
        }
    }
}

const chatbot = new Chatbot();

document.getElementById('send-button').addEventListener('click', () => {
    const userInputField = document.getElementById('user-input');
    const userInput = userInputField.value;
    userInputField.value = ''; // Clear the input field

    if (userInput) {
        chatbot.chatWithUser(userInput);
    }
});
