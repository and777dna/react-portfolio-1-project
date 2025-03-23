// utils/socket.js
import { Server } from "socket.io";
import usersData from "../data/users.json" with { type: 'json' };
//const usersData = require('../data/users.json');

export const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Разрешаем фронту подключаться
            methods: ["GET", "POST"],
        },
    });

    // Список пользователей (чтобы отслеживать подключённых)
    const users = {};

    io.on("connection", (socket) => {
        console.log("🔌 Новый пользователь подключился:", socket.id);



        socket.on("join", (username) => {
            const user = usersData.find(user => user.name === username);
            if (user) {
                socket.emit("userAuthenticated", { token: user.token });
            } else {
                socket.emit("error", "Пользователь не найден");
            }
        });
        /*// Пользователь входит в чат
        socket.on("join", (username) => {
            users[socket.id] = username;
            io.emit("userConnected", { username, id: socket.id }); // Оповещаем всех
        });*/

        // Получаем и рассылаем сообщения
        socket.on("sendMessage", (data) => {
            io.emit("receiveMessage", data); // Отправляем всем пользователям
        });

        // Пользователь отключился
        socket.on("disconnect", () => {
            console.log("❌ Пользователь отключился:", users[socket.id]);
            io.emit("userDisconnected", users[socket.id]); // Оповещаем всех
            delete users[socket.id];
        });
    });

    return io;
};
