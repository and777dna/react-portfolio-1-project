import express from "express";
import { readJsonFile } from "../util/readJsonFile.js";
import { writeJsonFile } from "../util/writeJsonFile.js";

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
        console.log("users: ", users);


        //await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
        writeJsonFile("./data/users.json", users)


        res.status(200).json(users);

    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post("/createuser", async (req, res) => {
    try {
        const users = await readJsonFile("./data/users.json");
        const newuser = req.body.changeduser;
        console.log("newuser: ", newuser);

        //TODO: to find last index of this array
        /*const  lastIndex = users.findLastIndex()
        users[lastIndex + 1] = {
            ...newuser
        }*/
        const lastIndex = users.length - 1;
        users[lastIndex + 1] = {
            ...newuser
        }
        console.log("users: ", users);

        writeJsonFile("./data/users.json", users)

        res.status(200).json(users);

    } catch (e) {
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router;