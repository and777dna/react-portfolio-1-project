import express from "express";
import { readJsonFile } from "../util/readJsonFile.js";
import { writeJsonFile } from "../util/writeJsonFile.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const services = await readJsonFile("./data/services.json");
        return res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении services", details: error.message });
    }
})


router.post('/update-available-room', async (req, res) => {
    try {
        const { bookingID, action } = req.body;
        console.log(`2. I am inside deleteBooking`);

        if (!bookingID || !action) {
            return res.status(400).json({ error: "Не передан bookingID или действие (action)" });
        }

        const services = await readJsonFile("./data/services.json");
        const serviceIndex = services.findIndex(service => service.id === bookingID);

        if (serviceIndex === -1) {
            return res.status(404).json({ error: "Номер не найден" });
        }

        const totalNumberOfRooms = services[serviceIndex].totalNumber;
        let availability = services[serviceIndex].availability;

        if (action === "deleteBooking") {
                if (totalNumberOfRooms > availability) {
                    services[serviceIndex].availability += 1;
                } else {
                    return res.status(400).json({ error: "Нет доступных номеров" });
                }
        } else if (action === "addBooking") {
            if (availability > 0) {
                services[serviceIndex].availability -= 1;
            } else {
                return res.status(400).json({ error: "Нет доступных номеров" });
            }
        } else {
            return res.status(400).json({ error: "Некорректное действие (action). Используйте 'add' или 'delete'." });
        }

        services[serviceIndex].updatedAt = new Date().toISOString();
        await writeJsonFile("./data/services.json", services);

        return res.status(200).json({ message: "Доступность обновлена", service: services[serviceIndex] });
    } catch (error) {
        res.status(500).json({ error: "Ошибка при обновлении доступности", details: error.message });
    }
});


export default router;