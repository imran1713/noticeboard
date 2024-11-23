import express from "express";
const loginRouter = express.Router();
import * as PeopleController from "../Controllers/PeopleController";
import { authenticate } from "../Middlewares/checkLogin";

loginRouter.post("/login", PeopleController.getLogin);
loginRouter.get(
  "/authenticate",
  authenticate,
  PeopleController.authenticateUser,
);

export { loginRouter };
