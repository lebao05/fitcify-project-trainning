const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
function generateRandomString(length = 32) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: function () {
        return this.authProvider === "email";
      },
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId && !this.facebookId;
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "artist"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      default: null,
      sparse: true,
    },
    facebookId: {
      type: String,
      default: null,
      sparse: true,
    },
    authProvider: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
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
