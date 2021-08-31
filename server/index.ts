import express, { Application } from "express";
import Users from "./routers/users";

const app: Application = express();
import { initDb } from "./app/db";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", Users);

const PORT = process.env.PORT || 3000;

initDb("auth-fbend");

app.listen(PORT, () => console.log(`Listen to port ${PORT}...`));
