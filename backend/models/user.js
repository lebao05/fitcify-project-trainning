const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const artistProfile = require("./artistProfile");
function generateRandomString(length = 32) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    /* ───────── primary auth fields ───────── */
    role: {
      type: String,
      enum: ["user", "artist", "admin"], // ✅ only these three values
      default: "user", // most accounts start as plain users
      required: true,
    },
    artistProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artistProfile",
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: (v) => {
          const earliest = new Date("1940-01-01");
          const today = new Date();
          return v >= earliest && v < today;
        },
        message: "unvalid date of birth",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    email: {
      type: String,
      required() {
        return this.authProvider === "email";
      },
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required() {
        return !this.googleId && !this.facebookId;
      },
    },

    /* ───────── role & social login ───────── */
    role: { type: String, enum: ["user", "artist", "admin"], default: "user" },
    googleId: { type: String, default: null, sparse: true },
    facebookId: { type: String, default: null, sparse: true },
    authProvider: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },

    /* ───────── music-app additions ───────── */
    avatarUrl: { type: String, default: "" },
    isPremium: { type: Boolean, default: false },
    subscribedUntil: { type: Date, default: null },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    /* ───────── admin flags ───────── */
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
    suspensionReason: { type: String, default: null },
    suspendedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    suspendedAt: { type: Date, default: null },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Hash password before saving if it's an email-based signup
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.authProvider !== "email") {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for email-based login
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (this.authProvider !== "email") {
    throw new Error("Password comparison is only for email-based accounts");
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method for email/password signup
userSchema.statics.signupWithEmail = async function ({
  username,
  email,
  password,
}) {
  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  return await this.create({
    username,
    email,
    password,
    authProvider: "email",
  });
};

// Static method for Google signup
userSchema.statics.authWithGoogle = async function ({ username, googleId }) {
  const existingUser = await this.findOne({ $or: [{ googleId }] });
  if (existingUser) {
    return existingUser;
  }
  return await this.create({
    username,
    googleId,
    email: generateRandomString(12) + "@gmail.com",
    authProvider: "google",
  });
};

// Static method for Facebook signup
userSchema.statics.authWithFacebook = async function ({
  username,
  facebookId,
}) {
  const existingUser = await this.findOne({ $or: [{ facebookId }] });
  if (existingUser) {
    return existingUser;
  }
  return await this.create({
    username,
    facebookId,
    email: generateRandomString(12) + "@gmail.com",
    authProvider: "facebook",
  });
};

// Static method to find user by provider
userSchema.statics.findByProvider = async function (provider, identifier) {
  if (provider === "email") {
    return await this.findOne({ email: identifier });
  } else if (provider === "google") {
    return await this.findOne({ googleId: identifier });
  } else if (provider === "facebook") {
    return await this.findOne({ facebookId: identifier });
  } else {
    throw new Error("Invalid provider");
  }
};

module.exports = mongoose.model("User", userSchema);
