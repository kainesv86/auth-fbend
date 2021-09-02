import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { getDb } from "../app/db";
import { joiValidator } from "../middleware/joiValidator";
import { UserDto } from "../modules/user/dto";
import { User } from "../modules/user";

const router = express.Router();

const loginSchema = Joi.object({
        username: Joi.string().alphanum().min(8).max(40).required(),
        password: Joi.string().alphanum().min(8).max(40).required(),
});

interface LoginDto {
        username: string;
        password: string;
}

router.post("/", joiValidator(loginSchema), async (req, res) => {
        const db = getDb();
        const { username, password } = req.body as LoginDto;
        const user = (await db?.collection("users").findOne({ username })) as UserDto | undefined;

        if (!user) return res.status(404).send("Username or password invalid");
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(404).send("Username or password invalid");
        const token = new User(user.username, user.password, user.fullname, user.email, user._id).generateAuthToken();
        res.header("x-auth-token", token).send(token);
});

export default router;
