import express, { Application } from "express";
import Users from "./routers/users";
import Auth from "./routers/auth";

require("dotenv").config({ path: "./config/.env" });
require("express-async-errors");

const app: Application = express();
import { initDb } from "./app/db";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", Users);
app.use("/api/auth", Auth);

const PORT = process.env.PORT || 3000;

initDb("auth-fbend");

app.listen(PORT, () => console.log(`Listen to port ${PORT}...`));
