
import mongoose, { Schema, type Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  repositoryUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: [2, "Project name must be at least 2 characters"],
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    repositoryUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<IProject>(
  "Project",
  projectSchema
);
