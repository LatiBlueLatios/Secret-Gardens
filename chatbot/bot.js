class Chatbot {
    constructor() {
        // What genuis thought it was a good idea to have responses as an object?
        // Oh wait, it was me...
        // Can't wait for the user to load 6.9 MB of data :trol:
        this.responses = {
            "onload" : {
                response: "Please upload a response file before continuing."
            }
        };
        this.responseLoaded = false;
    }

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
                        resolve(responses);
                    } catch (error) {
                        // JSON threw a tantrum. It’s not me, it’s definitely you.
                        console.error(`JSON parsing went about as well as Sora’s cooking attempts:`, error);
                        reject("Turns out my JSON parsing skills are as good as Sora’s social skills.");
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

        /// Sometimes a response is like a box of chocolates, other times it’s just one chocolate.
        if (Array.isArray(response.response)) {
            const randomIndex = Math.floor(Math.random() * response.response.length);
            return response.response[randomIndex];
        }

        return response.response;
    }

    /**
     * @param {string} input - A line tossed into the vast ocean of code, let’s reel in a keeper.
     */
    processUserInput(input) {
        const sanitizedInput = input.toLowerCase().trim();
        let foundResponse;
        if (this.responseLoaded == false) {
            // Our response bank seems to have taken a hiatus to a remote countryside, Yosuga no Sora style.
            foundResponse = "Your responses? Lost in the countryside of uninitialised state. Try accessing after the train arrives."
        } else {
            // Relying on our default response like Sora relies on Haru, unconditionally and a tad bit too much.
            foundResponse = this.responses.default.response;
        }

        // Pulling out our Pokedex to match the input with the perfect response-mon.
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
    
        // Just like Sora reserves her words for Haru, the chatbot reserves its ‘thinking…’ for dramatic effect.
        if (role === "Chatbot") {
            message.textContent = "Chatbot: Thinking";
            let thinkingDots = 0;

            chatLog.appendChild(messageContainer);
            messageContainer.appendChild(message);

            const thinkingInterval = setInterval(() => {
                thinkingDots = (thinkingDots + 1) % 4;
                message.textContent = `Chatbot: Thinking${'.'.repeat(thinkingDots)}`;
            }, 500); // Update the ellipsis every half a second to optimally milk the tension.

            const delay = Math.floor(Math.random() * 1000) + 3000;
            setTimeout(() => {
                clearInterval(thinkingInterval);
                message.textContent = `${role}: ${text}`;
                chatLog.scrollTop = chatLog.scrollHeight;
            }, delay);
        } else {
            message.textContent = `${role}: ${text}`;
            messageContainer.appendChild(message);
            chatLog.appendChild(messageContainer);
            // Keep scrolling, just like your social media feed at 3 AM.
            chatLog.scrollTop = chatLog.scrollHeight;
        }
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
            // A direct response, skipping the postal service of backend servers.
            this.appendMessageToChatLog("Chatbot", response);
        }
    }
}

// Beep boop boop beep
const chatbot = new Chatbot();
chatbot.chatWithUser("onload", true);

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