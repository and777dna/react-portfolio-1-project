import express from "express";
import { readJsonFile } from "../util/readJsonFile.js";
import {writeJsonFile} from "../util/writeJsonFile.js";  // Импортируем функцию

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

//TODO: to commit this for today
router.post("/changeuser", async (req, res) => {
    try {
        const users = await readJsonFile("./data/users.json");
        const changeduser = req.body.changeduser;
        console.log("changeduser: ", changeduser);

        const existingIndex = users.findIndex(user => user.name === changeduser.name);
        if (existingIndex === -1) {
            res.status(500).json({ error: "No user found or internal error." })
        }
        console.log("existingIndex: ", existingIndex);
        console.log("users[existingIndex]: ", users[existingIndex]);

        users[existingIndex] = {
            ...users[existingIndex],
            ...changeduser
        }

        //fs.writeFile()
        //await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
        writeJsonFile("./data/users.json", users)


        res.status(200).json(users);

    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;
