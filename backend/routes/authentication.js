import express from "express";
import { readJsonFile } from "../util/readJsonFile.js";
import authentication, { comparePasswords } from "../util/auth.js";
import { writeJsonFile } from "../util/writeJsonFile.js";  // Импортируем функцию

const router = express.Router();

//router .post() .get()


//autorisation, authentication DONE
router.post("/", async (req, res) => {
    console.log("I am inside app.use(/authpage, authRoutes)");
    const mode = req.query.mode;  // Извлекаем параметр "mode" из query string
    /*if (mode === 'Authenticate') {
        res.send('Вы на странице аутентификации');
    } else {
        res.send('Неверный режим');
    }*/

    try {
        console.log("req:",req);
        const reqBody = req.body;
        console.log("reqBody:",reqBody)
        const name = req.body.name
        console.log("name:",name)


        const password = req.body.password;


        const users = await readJsonFile("./data/users.json")
        const userIndex = await users.findIndex(user => user.name === name);
        console.log("userIndex:",userIndex)
        let token;

        const mode = req.body.mode;

        const adminRole = users[userIndex].role === "admin";
        console.log("adminRole:",adminRole);


        if (mode === "Authenticate") {
            const extractedPassword = users[userIndex].password;
            try {
                if (comparePasswords(password, extractedPassword)) {
                    token = authentication(password);
                    //const role = users[userIndex].role;
                    //console.log("const role = users[userIndex].role;", role);
                    return res.status(200).json({ token })
                }
            } catch (e) {
                console.log("some error detected during creating hash", e)
            }
        } else {
            token = authentication(password);
            console.log("token:",token)

            users[userIndex] = {
                ...users[userIndex],
                password: password,
                token: token,
            }

            writeJsonFile("./data/users.json", users )

            return res.status(200).json({ token, role: adminRole })
        }

        //if (userIndex !== -1) {} else {}


        /*const updatedUser = {
            ...user,
            token: token
        }*/



    } catch (e) {
        res.status(500).json({ error: "mistake for creating auth", details: e.message });
    }
});



export default router;