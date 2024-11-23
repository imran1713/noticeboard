import express from "express";
const courseRouter = express.Router();
import {
  createCourse,
  getCourseById,
  getCourses,
  updateCourseById,
} from "../Controllers/CourseController";

courseRouter.get("/", getCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.post("/", createCourse);
courseRouter.put("/:id", updateCourseById);

export { courseRouter };
