import { WebSocketServer } from "ws";
import Client from "./client.js";
class Server {
    constructor() {
        this.wss = new WebSocketServer({
            port: 3000
        });

        this.clientArray = [];

        console.log('Im alive!');

        this.wss.on('connection', (ws, req) => this.handleConnection(ws, req));
    }

    /**
     * @param {import("ws")} ws
     * @param {import("http").IncomingMessage} req
     */
    handleConnection(ws, req) {
        const client = new Client(ws, req, this);
        client.handleOpen();
        this.clientArray.push(client);
    }
}

const server = new Server();