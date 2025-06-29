import express from "express";
import { readJsonFile } from "../util/readJsonFile.js";
import * as error from "antd";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const holidays = await readJsonFile("./data/holidays.json");
        return res.status(200).json(holidays);
    } catch (e) {
        res.status(500).json({ error: e, details: error.message });
    }
})

router.get("/cities", async (req, res) => {
    let arrayOfCities = []
    try {
        const cities = await readJsonFile("./data/cities.json");
        /*for (cities of cities) {//TODO: to return here later to see how it works
            arrayOfCities.push(cities.name)//which data type will be returned?this []?
        }*/
        const arrayOfCities = await cities.map(city => city.name)
        console.log("arrayOfCities:", arrayOfCities);
        return res.status(200).json(arrayOfCities);

    } catch (e) {
        res.status(500).json({ error: e, details: error.message });
    }
})

export default router;