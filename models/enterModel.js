import mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema({
  formatedDate: String,
  enter: Date,
  exit: Date,
});

const enterSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: [true, "set the ID!"],
  },
  username: {
    type: String,
    unique: true,
    require: [true, "Set the username!"],
  },
  userLogins: {
    type: [userLoginSchema],
  },
});

// const EnterUserModel =
//   mongoose.models && "enteredUser" in mongoose.models
//     ? mongoose.models.enteredUser
//     : mongoose.model("enteredUser", enterSchema);

const EnterUserModel =
  mongoose.models.EnterModel || mongoose.model("EnterModel", enterSchema);

export default EnterUserModel;
