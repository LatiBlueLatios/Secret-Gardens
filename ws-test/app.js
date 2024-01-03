class WebSocketClient {
    constructor() {
        this.ws = undefined;
        this.maxMessageCount = 500;

        this.serverUrl = document.querySelector("#serverUrl");
        this.connectionStatus = document.querySelector("#connectionStatus");
        this.messagesContainer = document.querySelector("#messages");
        this.sendMessageInput = document.querySelector("#sendMessage");
        this.connectButton = document.querySelector("#connectButton");
        this.disconnectButton = document.querySelector("#disconnectButton");
        this.sendButton = document.querySelector("#sendButton");
        this.clearButton = document.querySelector("#clearMessage");
    }

    init() {
        this.connectButton.addEventListener("click", () => this.open());
        this.disconnectButton.addEventListener("click", () => this.close());
        this.sendButton.addEventListener("click", () => this.send());
        this.clearButton.addEventListener("click", () => this.clearMessage());

        if (this.serverUrl instanceof HTMLInputElement && this.sendMessageInput instanceof HTMLInputElement) {
            this.serverUrl.addEventListener("keydown", ({ key }) => key === "Enter" && this.open());
            this.sendMessageInput.addEventListener("keydown", ({ ctrlKey, key }) => {
                if (key === "Enter" && ctrlKey) {
                    this.send();
                }
            });
        }

        this.toggleUI(false);
    }

    open() {
        if (this.serverUrl instanceof HTMLInputElement) {
            this.ws = new WebSocket(this.serverUrl.value);
            this.ws.addEventListener("open", () => this.onOpen());
            this.ws.addEventListener("close", () => this.onClose());
            this.ws.addEventListener("message", ({ data }) => this.onMessage(data));
            this.ws.addEventListener("error", () => this.onError());

            this.connectionStatus.textContent = "OPENING ...";
        } else {
            console.error("serverUrl is not an input element");
        }
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

    send() {
        const { addMessage, sendMessageInput, ws } = this;

        if (ws?.readyState === WebSocket.OPEN && sendMessageInput instanceof HTMLTextAreaElement) {
            const message = sendMessageInput.value;

            ws.send(message);
            addMessage.call(this, message, "SENT");``
            sendMessageInput.value = "";
        } else {
            console.log('somethign happened')
        }
    }

    onOpen() {
        this.connectionStatus.textContent = "OPENED";
        this.toggleUI(true);
    }

    onClose() {
        this.connectionStatus.textContent = "CLOSED";
        this.toggleUI(false);
        this.ws = undefined;
    }

    /**
     * @param {any} data
     */
    onMessage(data) {
        this.addMessage(data, "PRE");
    }

    onError() {
        this.addMessage("A ws error occured, check console");
    }

    /**
     * @param {string} data
     */
    addMessage(data, type = "") {
        const message = document.createElement("pre");

        message.textContent = data;
        message.classList.add(type.toLowerCase());
        this.messagesContainer.append(message);

        this.pruneMessages();
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    clearMessage() {
        this.messagesContainer.innerHTML = "";
    }

    pruneMessages() {
        while (this.messagesContainer.childElementCount > this.maxMessageCount) {
            this.messagesContainer.firstChild.remove();
        }
    }

    /**
     * @param {boolean} isConnected
     */
    toggleUI(isConnected) {
        [this.serverUrl, this.sendMessageInput, this.sendButton].forEach((element) => {
            if ("disabled" in element) {
                element.disabled = !isConnected;
            }
        });

        if (this.connectButton instanceof HTMLElement && this.disconnectButton instanceof HTMLElement) {
            this.connectButton.style.display = isConnected ? "none" : "inline";
            this.disconnectButton.style.display = !isConnected ? "none" : "inline";
        }
    }
}

const webSocketClient = new WebSocketClient();

webSocketClient.init();