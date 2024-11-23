import { Request, Response } from "express";
import { Course } from "../Models/Course";
import { IPeopleModel } from "../Models/People";
import { IncomingHttpHeaders } from "node:http"; // Adjust the path as per your project structure

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { course_id, course_details, series, status } = req.body;

    // Validate status
    if (status && !["active", "archive"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Invalid status. Must be 'active' or 'archive'." });
    }

    const newCourse = new Course({
      course_id,
      course_details,
      series,
      ...(status && { status }),
    });
    await newCourse.save();
    res.status(201).json({ success: true, newCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating course" });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  const user = req.headers.user as unknown as IPeopleModel;
  // return res.status(200).json(user);
  console.log(user);

  try {
    const { status } = req.query as { status: string };

    // Validate status
    if (!["active", "archive"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Invalid status. Must be 'active' or 'archive'." });
    }

    const courses = await Course.find({ status, series: user.series });
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: `No courses found with status: ${status}` });
    }

    res.status(200).json({ courses, success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params; // Course ID from the request parameters
  console.log(id);

  const user = req.headers.user as unknown as IPeopleModel;
  try {
    // Find course by ID
    const course = await Course.findById(id);

    // Handle case where course is not found
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Return the course
    console.log(user);
    return res.status(200).json({ course, success: true, user_id: user._id });
  } catch (error) {
    // Handle invalid ObjectId or other errors
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const updateCourseById = async (req: Request, res: Response) => {
  console.log(req.headers.user);
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ message: `No course found with ID: ${id}` });
    }
    res.status(200).json({ updatedCourse, success: true });
  } catch (error) {
    res.status(500).json({ error: "Error updating course" });
  }
};

export const deleteCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ message: `No course found with ID: ${id}` });
    }
    res.json({ message: "Course deleted successfully", deletedCourse });
  } catch (error) {
    res.status(500).json({ error: "Error deleting course" });
  }
};
