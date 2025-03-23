import fs from 'node:fs/promises';

export async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf8"); // Читаем файл как текст (строку)
        return JSON.parse(data);  // Парсим JSON
    } catch (error) {
        console.error(`Ошибка при чтении файла ${filePath}:`, error);
        throw new Error(`Ошибка чтения файла ${filePath}`);
    }
}
