import express from "express";
const signupRouter = express.Router();
import { createPerson } from "../Controllers/PeopleController";

signupRouter.post("/", createPerson);

export { signupRouter };
