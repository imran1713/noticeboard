import mongoose, { Document, Types, Schema } from "mongoose";

export interface ICommentModel extends Document {
  message: string;
  createdAt: Date;
  updatedAt: Date;
  reactions: {
    likes: number;
    dislikes: number;
  };
  notice_id: Types.ObjectId;
  user_id: Types.ObjectId;
  attachments: Types.ObjectId[];
}

const commentSchema = new mongoose.Schema<ICommentModel>(
  {
    notice_id: {
      type: Schema.Types.ObjectId,
      ref: "Notice",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "People",
      required: true,
    },
    message: { type: String, required: true },
    reactions: {
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
    },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  },
);
export const Comment = mongoose.model<ICommentModel>("Comment", commentSchema);
