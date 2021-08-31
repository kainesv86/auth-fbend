import express from "express";
import { getDb } from "../app/db";

const router = express.Router();

router.get("/", async (req, res) => {
        const users = await getDb()?.collection("users").find().toArray();
        if (!users) res.status(400).send("Bad request");
        res.status(200).send(users);
});

export default router;
