import { Request, Response } from "express";
import { People } from "../Models/People";
import { AppConfig } from "../../appConfig";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new person
export const createPerson = async (req: Request, res: Response) => {
  const { name, email, password, role, series } = req.body;

  try {
    // name, email, password, profilePicture, role, series

    const newPerson = await People.create({
      name,
      email,
      password,
      series,
      ...(role && role),
    });

    res.status(201).json({
      success: true,
      message: "Person created successfully",
      data: newPerson,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating person" });
  }
};

// Get all people
export const getAllPeople = async (req: Request, res: Response) => {
  try {
    const people = await People.find();
    res
      .status(200)
      .json({ message: "People fetched successfully", data: people });
  } catch (error) {
    res.status(500).json({ message: "Error fetching people", error });
  }
};

// Get a person by ID
export const getPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const person = await People.findById(id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    res
      .status(200)
      .json({ message: "Person fetched successfully", data: person });
  } catch (error) {
    res.status(500).json({ message: "Error fetching person", error });
  }
};

// get a person by email & password
export const getLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const people = await People.findOne({
      email,
      password,
    });
    if (!people) {
      return res.status(404).json({ message: "User not found!" });
    }
    const payload = {
      email,
      userId: people._id,
    };

    // generate token
    const token = jwt.sign(payload, AppConfig.jwtSecret, {
      expiresIn: "1h",
    });

    // set cookie
    res.cookie(AppConfig.cookieName, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 3600 * 60 * 1000),
      path: "/",
    });

    // send response
    res.status(200).json({
      message: "Login successful",
      success: true,
    });
  } catch (err) {
    console.log(" -> PeopleController", err);
    res.status(500).json({
      message: "login failed",
    });
  }
};

// Authenticate user
export const authenticateUser = async (req: Request, res: Response) => {
  const { user } = req.headers;
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "User found successfully" });
};

// Update a person by ID
// updatedPeople
export const updatePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body.updatedPeople;

    const updatedPerson = await People.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    res
      .status(200)
      .json({ message: "Person updated successfully", data: updatedPerson });
  } catch (error) {
    res.status(500).json({ message: "Error updating person", error });
  }
};

// Delete a person by ID
export const deletePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedPerson = await People.findByIdAndDelete(id);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    res
      .status(200)
      .json({ message: "Person deleted successfully", data: deletedPerson });
  } catch (error) {
    res.status(500).json({ message: "Error deleting person", error });
  }
};
