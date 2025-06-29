// uploadToFirebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// Импорт твоей локальной базы (пример: объект services)
//import { services } from "../data/services.json"; // подставь свой путь
/*import fs from "fs";
const json = fs.readFileSync("../data/services.json", "utf-8");
const services = JSON.parse(json);*/
import services from "../data/services.json" with { type: "json" };

console.log("services.length:",services.length)

// ⚠️ Замените своими данными Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCIpfr7rJMpVt8EP7GMs_WboOF1RtepK1k",
    authDomain: "booking-325a0.firebaseapp.com",
    projectId: "booking-325a0",
    storageBucket: "booking-325a0.firebasestorage.app",
    messagingSenderId: "379537217932",
    appId: "1:379537217932:web:d06788b256809050411ea9",
    measurementId: "G-Y34J4XZZ10"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Загрузка всех сервисов в коллекцию "services"
async function uploadServices() {
    for (const service of services) {
        await setDoc(doc(db, "services", service.id), service);
        console.log(`Загружен сервис: ${service.id}`);
    }
}

uploadServices()
    .then(() => console.log("✅ Все данные загружены"))
    .catch(console.error);
