/*const express = require("express");
const mysql = require("mysql2");*/
import express from 'express';
import mysql from 'mysql2';

const app = express();
const port = 3001;

// Подключение к базе
const db = mysql.createConnection({
    host: "localhost",
    // user: "root",
    user: "andreisartin",
    password: "14usehiv",
    database: "mydatabase"
});

db.connect(err => {
    if (err) {
        console.error("Ошибка подключения к MySQL:", err);
        process.exit(1); // Завершаем процесс, если ошибка при подключении
    } else {
        console.log("MySQL подключен!");
    }
});

// Создание API-эндпоинта для получения данных
app.get("/users", (req, res) => {
    db.query("SELECT * FROM User", (err, results) => {
        if (err) {
            console.error("Ошибка подключения к MySQL:", err);
            process.exit(1); // Завершаем процесс, если ошибка при подключении
        } else {
            console.log("MySQL подключен!");
        }
        res.json(results);
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
