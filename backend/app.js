// server.js
import bodyParser from 'body-parser';
import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import * as http from "node:http";

import usersRoutes from './routes/users.js';
import authRoutes from './routes/authentication.js';
import servicesRoutes from './routes/services.js';

import { setupSocket } from './util/socket.js';
/*import { readJsonFile } from "./util/readJsonFile.js"; // Подключаем функцию

import admin from "firebase-admin";
import fs from "node:fs/promises";*/


const PORT = 3001;


dotenv.config();
const app = express();
const server = http.createServer(app); // Создаём HTTP-сервер



/*// Инициализация Firebase Admin SDK
//const serviceAccount = require("./data/services.json");
const serviceAccount = JSON.parse(await fs.readFile("./data/serviceAccountKey.json", "utf-8"));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my1reactproject-default-rtdb.europe-west1.firebasedatabase.app/"
});
const db = admin.firestore();


//const services = JSON.parse(fs.readFile("./data/services.json", "utf8"));
const services = readJsonFile("./data/services.json");
console.log(services);

async function uploadData() {
    const batch = db.batch();
    services.forEach((service) => {
        const docRef = db.collection("services").doc(service.id);
        batch.set(docRef, service);
    });

    await batch.commit();
    console.log("Данные загружены в Firestore.");
}

uploadData();*/

// Инициализируем WebSocket
setupSocket(server);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`🔥 Запрос: ${req.method} ${req.url}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use("/authenticationpage", authRoutes);
app.use("/users", usersRoutes);  // Теперь все запросы "/users" обрабатываются в usersRoutes
app.use("/services", servicesRoutes);

server.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
