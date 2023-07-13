const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },

    mobile: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);


module.exports = { UserModel };
