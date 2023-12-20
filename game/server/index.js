import { WebSocketServer } from "ws";

class Server {
    constructor() {
        this.wss = new WebSocketServer({
            port: 3000
        });

        console.log('Im alive!');
    }
}

const server = new Server();