import { Request, Response } from "express";
import { Notice } from "../Models/NoticeModel";
import { Attachment } from "../Models/AttachmentModel"; // Assuming models exist
import { Comment } from "../Models/CommentModels";

export const createNotice = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      type,
      dueDate,
      status,
      course,
      createdBy,
      attachments,
    } = req.body;

    // Create a new Notice
    const newNotice = await Notice.create({
      title,
      description,
      type,
      ...(dueDate && { dueDate }),
      ...(status && { status }),
      ...(attachments && { attachments }),
      course,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      notice: newNotice,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating notice" });
  }
};

export const getAllNotices = async (req: Request, res: Response) => {
  try {
    const query = req.query; // Handle query parameters

    const notices = await Notice.find(query)
      .populate("createdBy") // Populate full document for `createdBy`
      .populate("course") // Populate full document for `course`
      .lean(); // Converts Mongoose documents to plain objects for easy manipulation

    // Process each notice to only include the latest 2 `attachments` and `comments`
    const processedNotices = await Promise.all(
      notices.map(async (notice) => {
        const attachments = await Attachment.find({
          _id: { $in: notice.attachments },
        })
          .sort({ updatedAt: -1 })
          .limit(2);
        const comments = await Comment.find({ _id: { $in: notice.comments } })
          .sort({ updatedAt: -1 })
          .limit(2);

        return {
          ...notice,
          attachments, // Replace with the latest 2 attachments
          comments, // Replace with the latest 2 comments
        };
      }),
    );

    res.status(200).json({ success: true, notices: processedNotices });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices" });
  }
};

export const updateNoticeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Update the notice by ID
    const updatedNotice = await Notice.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({
      success: true,
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating notice" });
  }
};

export const deleteNoticeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete the notice by ID
    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notice" });
  }
};
