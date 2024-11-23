import { Request, Response } from "express";
import { Comment } from "../Models/CommentModels";

// Create a new comment
export const addComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { noticeId, userId, message, reactions, attachments } = req.body;
    const comment = new Comment({
      noticeId,
      userId,
      message,
      reactions,
      attachments,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get comments by noticeId
exports.getCommentsByNotice = async (req: Request, res: Response) => {
  try {
    const { noticeId } = req.params;
    const comments = await Comment.find({ noticeId }).lean();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a comment (params->id, req.body)
exports.updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a comment (params->id)
exports.deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
