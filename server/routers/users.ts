import express from "express";
import Joi from "joi";
import { getDb } from "../app/db";
import { joiValidator } from "../middleware/joiValidator";
import { User } from "../modules/user";
import { UserDto } from "../modules/user/dto";

const router = express.Router();

const registerSchema = Joi.object({
        username: Joi.string().alphanum().min(8).max(40).required(),
        password: Joi.string().alphanum().min(8).max(40).required(),
        confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
        fullname: Joi.string().min(8).max(40).required(),
        email: Joi.string().email().required(),
});

router.get("/", async (req, res, next) => {
        const users = await getDb()?.collection("users").find().toArray();
        if (!users) res.status(400).send("Bad request");
        res.status(200).send(users);
});

router.post("/", joiValidator(registerSchema), async (req, res) => {
        const { username, password, email, fullname } = req.body as UserDto;
        const user = new User(username, password, fullname, email);
        res.status(200).send(user);
});

export default router;
