import fs from "fs";
import path from "path";

const filePath = path.resolve("src/config/test-data.json");

const rawData = fs.readFileSync(filePath);
const testData = JSON.parse(rawData);

export const users = testData.users;