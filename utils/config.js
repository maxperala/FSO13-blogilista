require("dotenv").config();
const PORT = process.env.PORT ? process.env.PORT : 3001;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new Error("Please provide a DATABASE_URL!");

module.exports = { PORT, DATABASE_URL };
