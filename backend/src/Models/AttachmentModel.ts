import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the Attachment document
export interface IAttachmentModel extends Document {
  type: "image" | "pdf" | "link" | "video";
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema for attachments
const attachmentSchema = new Schema<IAttachmentModel>(
  {
    type: {
      type: String,
      enum: ["image", "pdf", "link", "video"],
      required: true,
    },
    url: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          /^(https?:\/\/|\/).+\.(jpg|jpeg|png|pdf|mp4|mov|html|htm|php|asp|aspx|gif|svg|webm)$/.test(
            value,
          ), // Basic URL and extension validation
        message: "Invalid URL or file type.",
      },
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  },
);

// Export the model
export const Attachment: Model<IAttachmentModel> =
  mongoose.model<IAttachmentModel>("Attachment", attachmentSchema);
