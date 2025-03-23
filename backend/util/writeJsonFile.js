import fs from "node:fs/promises";

export async function writeJsonFile (filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        //await fs.writeFile("./data/usersFinal.json", JSON.stringify(parsedData, null, 2));
        console.log("Данные успешно записаны в файл");
    } catch (e) {
        console.error(`Ошибка при writing файла ${filePath}:`, e);
        throw new Error(`Ошибка writing файла ${filePath}`);
    }
}