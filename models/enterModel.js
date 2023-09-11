import mongoose from "mongoose";

// interface EnterUserDetail extends Document {
//   date: Date;
//   uid: String;
// }

const enterSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "set the time!"],
  },
  uid: {
    type: String,
    required: [true, "set the ID!"],
    unique: true,
  },
});

// const EnterUserModel =
//   mongoose.models && "enteredUser" in mongoose.models
//     ? mongoose.models.enteredUser
//     : mongoose.model("enteredUser", enterSchema);

const EnterUserModel =
  mongoose.models.enteredUser || mongoose.model("enteredUser", enterSchema);

export default EnterUserModel;
