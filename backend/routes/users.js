import express from "express";
import { readJsonFile } from "../util/readJsonFile.js";  // Импортируем функцию

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await readJsonFile("./data/users.json");
        //console.log(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении пользователей", details: error.message });
    }
});

export default router;
