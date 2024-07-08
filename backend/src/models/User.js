const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const interactionSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    watchTime: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    liked: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const userPreferencesSchema = new mongoose.Schema(
  {
    preferredLanguages: {
      type: [String],
      default: [],
    },
    preferredGenres: {
      type: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
      default: [],
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Hide the password by default
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    preferences: userPreferencesSchema,
    interactions: [interactionSchema],
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate auth token for the user
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);
