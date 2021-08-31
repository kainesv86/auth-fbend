import jwt from "jsonwebtoken";
import { UserDto } from "./dto";

export class User implements UserDto {
        username: String;
        password: String;
        fullname: String;
        email: String;

        constructor(username: String, password: String, fullname: String, email: String) {
                this.username = username;
                this.password = password;
                this.fullname = fullname;
                this.email = email;
        }
}
