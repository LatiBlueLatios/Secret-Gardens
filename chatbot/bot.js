class Chatbot {
    constructor() {
        // What genuis thought it was a good idea to have responses as an object?
        // Oh wait, it was me...
        this.responses = {};
        this.responseLoaded = false;
    }

    // TODO: Add animations because instant responses are apparently unsettling

    /**
     * @param {Blob} file
     */
    async loadResponsesFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const result = e.target.result;

                if (typeof result === "string") {
                    try {
                        const responses = JSON.parse(result);
                        this.responses = responses;
                        this.chatWithUser("onload", true);
                        this.responseLoaded = true;
                        document.getElementById("sendMessage").removeAttribute("disabled");
                        resolve(responses);
                    } catch (error) {
                        console.error("Tried to parse the responses and failed spectacularly:", error);
                        reject("I’m too sophisticated for this JSON nonsense.");
                    }
                } else {
                    // When you expected a string but got something else, existential crisis ensues.
                    console.error("I need JSON! This is like getting a sweater for Christmas, but worse.");
                }
            };

            reader.onerror = (/** @type {any} */ e) => {
                // File loading, or the digital equivalent of “Oops, I dropped it.”
                console.error("The file has decided to play hide and seek. Hint: It’s winning.", e);
                // User soothing protocol initiated. Pat on back: optional.
                reject("The File Oracle has denied your request.");
            };

            reader.readAsText(file);
        });
    }

    /**
     * @param {string} responseCategory
     */
    getRandomResponse(responseCategory) {
        const response = this.responses[responseCategory];

        // Support both single response strings or arrays of responses
        if (Array.isArray(response.response)) {
            const randomIndex = Math.floor(Math.random() * response.response.length);
            return response.response[randomIndex];
        }

        console.log(response.response)
        return response.response;
    }

    /**
     * @param {string} input
     */
    processUserInput(input) {
        const sanitizedInput = input.toLowerCase().trim();
        let foundResponse;
        if (this.responseLoaded == false) {
            foundResponse = "You fucked with the HTML didn't you? Smh"
        } else {
            foundResponse = this.responses.default.response;
        }

        // Check against keys (which are regex patterns) to find the appropriate response
        for (let pattern in this.responses) {
            if (new RegExp(pattern).test(sanitizedInput)) {
                foundResponse = this.getRandomResponse(pattern);
                break;
            }
        }

        return foundResponse;
    }

    /**
     * @param {string} role
     * @param {any} text
     */
    appendMessageToChatLog(role, text) {
        const chatLog = document.getElementById("messages");
        const messageContainer = document.createElement("div");
        const message = document.createElement("p");

        message.textContent = `${role}: ${text}`;
        messageContainer.appendChild(message);
        chatLog.appendChild(messageContainer);

        chatLog.scrollTop = chatLog.scrollHeight;
    }

    /**
     * @param {string} userInput
     */
    chatWithUser(userInput, invisible = false) {
        if (invisible == false) this.appendMessageToChatLog("User", userInput);
        const response = this.processUserInput(userInput);

        if (response instanceof Promise) {
            response
                .then((botMessage) => {
                    this.appendMessageToChatLog("Chatbot", botMessage);
                })
                .catch((error) => {
                    this.appendMessageToChatLog("Chatbot", error);
                });
        } else {
            this.appendMessageToChatLog("Chatbot", response);
        }
    }
}

const chatbot = new Chatbot();

document.getElementById("sendButton").addEventListener("click", () => {
    const userInputField = document.getElementById("sendMessage");

    if (userInputField instanceof HTMLTextAreaElement) {
        const userInput = userInputField.value;
        userInputField.value = "";

        if (userInput) {
            chatbot.chatWithUser(userInput);
        }
    }
});

document.getElementById("uploadJson").addEventListener("change", async function (event) {
    const input = event.target;

    if (input instanceof HTMLInputElement && input.files) {
        const file = input.files[0];
        if (file) {
            try {
                const responses = await chatbot.loadResponsesFromFile(file);
                console.log("Responses loaded successfully:", responses);
            } catch (error) {
                console.error("Error loading responses:", error);
            }
        }
    }
});