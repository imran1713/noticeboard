import mongoose, { Schema, Document, Types } from "mongoose";

export interface INoticeModel extends Document {
  title: string; // Title of the notice
  description: string; // Detailed description
  type: "General" | "CT" | "Assignment" | "Lab Class"; // Enumerated notice types
  createdAt: Date; // Date the notice was posted
  updatedAt: Date;
  dueDate?: Date; // Optional due date
  status: "active" | "archived"; // Status of the notice
  course: Types.ObjectId;
  createdBy: Types.ObjectId; // Reference to the Author collection
  attachments: Types.ObjectId[]; // References to the Attachment collection
  comments: Types.ObjectId[]; // References to the Comment collection
}
const demo = {
  title: "hola",
  description: "lorem50   ",
  type: "CT",
  dueDate: new Date(Date.now() + 3600 * 60 * 60 * 1000),
  status: "active",
  course: "",
  createBy: "",
};

const noticeSchema = new Schema<INoticeModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["General", "CT", "Assignment", "Lab Class"],
      required: true,
      default: "General",
    },
    dueDate: { type: Date },
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
        default: [],
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
        default: [],
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "People",
    },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Notice = mongoose.model("Notice", noticeSchema);
