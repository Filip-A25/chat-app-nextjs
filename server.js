const {createServer} = require("http");
const {Server} = require("socket.io");
const next = require("next");
const axios = require("axios");
const { randomUUID } = require("crypto");
const {MemorySessionStorage} = require("./sessionStorage.js");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});

app.prepare().then(() => {
    const httpServer = createServer();

    const io = new Server(httpServer, {
        cors: {
            origin: process.env.SOCKET_IO_SERVER_ORIGIN,
            methods: ['GET', 'POST'],
            credentials: true
        }
    })

    io.use((socket, next) => {
        const sessionId = socket.handshake.auth.sessionId;
        if (sessionId) {
            const sessionStorage = new MemorySessionStorage();
            const session = sessionStorage.findSession(sessionId);
            if (session) {
                socket.sessionId = sessionId;
                socket.userId = session.userId;
                socket.username = session.username;
                return next();
            }
        }

        const userId = socket.handshake.auth.userId; 
        const username = socket.handshake.auth.username;

        if (!userId || !username) return next(new Error("Invalid data."));

        socket.sessionId = randomUUID();
        socket.userId = userId;
        socket.username = username;

        next();
    })

    io.on("connection", (socket) => {
        console.log(`User ${socket.userId} connected.`);

        socket.emit("session", {
            sessionId: socket.sessionId
        })

        socket.join(socket.userId);

        socket.on("find_user", (username) => {
            let searchedUser;

            for (let [id, socket] of io.of("/").sockets) {
                if (socket.username === username) {
                    searchedUser = {messengerId: socket.userId, username: socket.username};
                    break;
                }
            }

            if (!username) {
                socket.emit("error", new Error(`User with username ${username} could not be found.`));
            }
            socket.emit("get_user", searchedUser);
        })

        socket.on("private_message", ({message, receiverId}) => {
            io.to(receiverId).emit("receive_message", {
                message,
                senderId: socket.userId,
                senderUsername: socket.username,
                to: receiverId
            })
        
            socket.emit("receive_sent_message", {username: socket.username, message});
        })

        socket.on("disconnect", () => {
            console.log(`User ${socket.userId} disconnected.`);
        })
    })
    
    const port = process.env.SOCKET_IO_SERVER_PORT;
    
    httpServer.on("error", (error) => {
        console.log("ERROR: ", error);
        process.exit(1);
    })

    httpServer.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
    })
})
