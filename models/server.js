
const express = require('express');
//El intercambio de recursos de origen cruzado ( CORS )
var cors = require('cors');

const {socketController} = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.rutasPath = {};

        // Middelwares
        this.middelswares();

        // ruras app
        this.routes();

        // eventos de socket
        this.socket();
    }

    middelswares() {
        this.app.use(cors());

        // directorio publico
        this.app.use(express.static('public'));

    }
    routes() {
    //    this.app.use(this.rutasPath.auth,require('../routes/auth'));
    };
    socket() {
        this.io.on("connection", socketController);
    };

    listen() {
        this.server.listen(this.port, () =>{
            console.log(`servidor en ${this.port}`);
        })
    }
}

module.exports = Server;