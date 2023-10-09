import { Document, Model, model, Schema, models } from "mongoose";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  username: string;
  role: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  photo?: string;
  correctPassword(candidatePass: string, userPass: string): Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>({
  name: {
    type: String,
    required: [true, "A user must have a name!"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email!"],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "You must set a unique username!"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      validator: function (this: UserDocument, el: string) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  photo: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePass: string,
  userPass: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = models.User || model<UserDocument, UserModel>("User", userSchema);

export default User;
