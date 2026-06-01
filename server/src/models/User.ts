// Responsible for defining the user model blueprint
import mongoose from "mongoose";

interface IUser {
    username: string,
    email: string,
    password: string,
}
