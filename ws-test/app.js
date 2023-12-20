class WebSocketClient {
    constructor() {
        this.ws = null;
        this.maxMessageCount = 500;
    }

    init() {
        const getElement = id => document.getElementById(id);

        this.serverUrl = getElement('serverUrl');
        this.connectionStatus = getElement('connectionStatus');
        this.messagesContainer = getElement('messages');
        this.sendMessageInput = getElement('sendMessage');
        this.connectButton = getElement('connectButton');
        this.disconnectButton = getElement('disconnectButton');
        this.sendButton = getElement('sendButton');
        this.clearButton = getElement('clearMessage');

        this.connectButton.addEventListener('click', () => this.open());
        this.disconnectButton.addEventListener('click', () => this.close());
        this.sendButton.addEventListener('click', () => this.send());
        this.clearButton.addEventListener('click', () => this.clearMessage());

        this.serverUrl.addEventListener('keydown', ({key}) => key === 'Enter' && this.open());
        this.sendMessageInput.addEventListener('keydown', ({key, ctrlKey}) => {
            if (key === 'Enter' && ctrlKey) {
                this.send();
            }
        });

        this.toggleUI(false);
    }

    open() {
        this.ws = new WebSocket(this.serverUrl.value);
        this.ws.addEventListener('open', () => this.onOpen());
        this.ws.addEventListener('close', () => this.onClose());
        this.ws.addEventListener('message', ({data}) => this.onMessage(data));
        this.ws.addEventListener('error', () => this.onError());

        this.connectionStatus.textContent = 'OPENING ...';
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

    send() {
        if (this.ws?.readyState === WebSocket.OPEN) {
            const msg = this.sendMessageInput.value;
            this.ws.send(msg);
            this.addMessage(msg, 'SENT');
            this.sendMessageInput.value = '';
        }
    }

    onOpen() {
        this.connectionStatus.textContent = 'OPENED';
        this.toggleUI(true);
    }

    onClose() {
        this.connectionStatus.textContent = 'CLOSED';
        this.toggleUI(false);
        this.ws = null;
    }

    onMessage(data) {
        this.addMessage(data);
    }

    onError() {
        alert('WebSocket error');
    }

    addMessage(data, type = '') {
        const msg = document.createElement('pre');
        msg.textContent = data;
        msg.classList.add(type.toLowerCase());
        this.messagesContainer.appendChild(msg);

        this.pruneMessages();
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    clearMessage() {
        this.messagesContainer.innerHTML = '';
        console.log('Messages cleared');
    }

    pruneMessages() {
        while (this.messagesContainer.childElementCount > this.maxMessageCount) {
            this.messagesContainer.removeChild(this.messagesContainer.firstChild);
        }
    }

    toggleUI(isConnected) {
        [this.serverUrl, this.sendMessageInput, this.sendButton].forEach(el => el.disabled = isConnected);
        this.connectButton.style.display = isConnected ? 'none' : 'inline';
        this.disconnectButton.style.display = isConnected ? 'inline' : 'none';
    }
}

const webSocketClient = new WebSocketClient();
webSocketClient.init();