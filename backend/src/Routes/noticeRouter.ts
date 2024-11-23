import express from "express";
const noticeRouter = express.Router();
import { authenticate } from "../Middlewares/checkLogin";
import { createNotice } from "../Controllers/NoticeController";

noticeRouter.post("/", createNotice);

export { noticeRouter };
