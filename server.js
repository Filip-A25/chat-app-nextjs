const {createServer} = require("http");
const {Server} = require("socket.io");
const next = require("next");
const axios = require("axios");
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
    
    io.on("connection", (socket) => {
        console.log(`User ${socket.id} connected.`);

        socket.on("join_chat", (chatId) => {
            socket.join(chatId);
        });

        socket.on("send_message", async (data) => {
            try {
                await axios.post(`${process.env.SOCKET_IO_SERVER_ORIGIN}/api/chat/message`, data);
                io.to(data.chatId).emit("receive_message", data);   
            } catch (error) {
                console.log(error);
            }
        })

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnected.`);
        })
    })
    
    const port = process.env.SOCKET_IO_SERVER_PORT;
    
    httpServer.on("error", (error) => {
        console.log("ERROR: ", error);
    })

    httpServer.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
    })
})
