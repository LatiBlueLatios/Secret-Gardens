import { WebSocketServer } from "ws";

class Server {
    constructor() {
        this.wss = new WebSocketServer({
            port: 3000
        });

        console.log('Im alive!');

        this.wss.on('connection', (ws, req) => this.handleConnection(ws, req));
    }

    handleConnection(ws) {

    }
}

const server = new Server();