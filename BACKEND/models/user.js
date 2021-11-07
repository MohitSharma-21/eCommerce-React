const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      index: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email field is required"],
      index: true,
      validate: [isEmail, "Please enter valid email"],
    },

    password: {
      type: String,
      required: [true, "Password field is required"],
      index: true,
    },
    cart: [{
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    }],
  },
  { timestamps: true }
);

// hashing password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); // hashinng password

  next();
});

userSchema.plugin(uniqueValidator);

module.exports = model("User", userSchema);
