import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  course_id: string;
  course_details: string;
  series: string;
  status: string;
  imageUrl?: string;
  description?: string;
}

const courseSchema = new Schema<ICourse>(
  {
    course_id: {
      type: String,
      required: true,
    },
    course_details: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "archive"],
      default: "active",
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);
