class Client {
    /**
     * @param {any} ws
     * @param {any} req
     * @param {any} server
     */
    constructor(ws, req, server) {
        this.ws = ws;
        this.req = req;
        this.server = server;

        this.ws.on('message', (/** @type {any} */ data) => this.handleMessage(data));
    }

    handleOpen() {
        this.sendPacket({
            opcode: 0,
            payload: {
                test: 'greetings'
            }
        })
    }

    /**
     * @param {string} data
     */
    handleMessage(data) {
        try {
            const packet = JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @param {{ opcode: number; payload: { test: string; }; }} json
     */
    sendPacket(json) {
        const packet = JSON.stringify(json);
        this.ws.send(packet);
    }

    /**
     * @param {string} data
     */
    safeParseJSON(data) {
        try {
            return { parsedData: JSON.parse(data), isValidJSON: true };
        } catch (e) {
            return { parsedData: null, isValidJSON: false };
        }
    }
}

export default Client;