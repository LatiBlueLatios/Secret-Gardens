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
        this.sendButton = document.querySelector("#endButton");
        this.clearButton = document.querySelector("#clearMessage");
    }

    init() {
        this.connectButton.addEventListener("click", () => this.open());
        this.disconnectButton.addEventListener("click", () => this.close());
        this.sendButton.addEventListener("click", () => this.send());
        this.clearButton.addEventListener("click", () => this.clearMessage());

        this.serverUrl.addEventListener("keydown", ({key}) => key === "Enter" && this.open());
        this.sendMessageInput.addEventListener("keydown", ({ctrlKey, key}) => {
            if (key === "Enter" && ctrlKey) {
                this.send();
            }
        });

        this.toggleUI(false);
    }

    open() {
        this.ws = new WebSocket(this.serverUrl.value);
        this.ws.addEventListener("open", () => this.onOpen());
        this.ws.addEventListener("close", () => this.onClose());
        this.ws.addEventListener("message", ({data}) => this.onMessage(data));
        this.ws.addEventListener("error", () => this.onError());

        this.connectionStatus.textContent = "OPENING ...";
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

    send() {
        const { addMessage, sendMessageInput, ws } = this;
        
        if (ws?.readyState === WebSocket.OPEN) {
            const message = sendMessageInput.value;

            ws.send(message);
            addMessage.call(this, message, "SENT");
            sendMessageInput.value = "";
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

    onMessage(data) {
        this.addMessage(data);
    }

    onError() {}

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

    toggleUI(isConnected) {
        [this.serverUrl, this.sendMessageInput, this.sendButton].forEach(element => element.disabled = isConnected);
        this.connectButton.style.display = isConnected ? "none" : "inline";
        this.disconnectButton.style.display = isConnected ? "inline" : "none";
    }
}

const webSocketClient = new WebSocketClient();

webSocketClient.init();