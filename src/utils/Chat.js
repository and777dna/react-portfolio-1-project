import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Подключаемся к бэкенду

function Chat() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]); // Обновляем сообщения
        });

        socket.on("userConnected", (data) => {
            console.log(`🟢 ${data.username} подключился`);
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("userConnected");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", { username, text: message });
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Чат</h2>
            <input
                type="text"
                placeholder="Введите имя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.username}:</strong> {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                placeholder="Сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Отправить</button>
        </div>
    );
}

export default Chat;