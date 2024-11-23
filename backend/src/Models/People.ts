import mongoose, { Document, Schema } from "mongoose";

export interface IPeopleModel extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  role: "member" | "admin" | "teacher";
  series: string;
}
/*
{
    "name": "Syed Mahmudul Imran",
    "email": "smioni1302@gmail.com",
    "password": "Bankai@2002",
    "role": "admin",
}
 */
export const peopleSchema = new Schema<IPeopleModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    series: { type: String, required: true },
    profilePicture: { type: String },
    role: {
      type: String,
      required: true,
      default: "member",
      enum: ["member", "admin", "teacher"],
    },
  },
  {
    timestamps: true,
  },
);

export const People = mongoose.model<IPeopleModel>("People", peopleSchema);
