// userService.js

const User = require("../models/User");
const { comparePassword, generateToken } = require("../utils/auth");

const findUserByEmail = async (email) => {
  return User.findOne({ email }).select("+password");
};

const findUserById = async (id) => {
  console.log(`Querying database for user with ID: ${id}`);
  return User.findById(id);
};

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const deleteUserById = async (id) => {
  return User.findByIdAndDelete(id);
};

const getAllUsers = async () => {
  return User.find({});
};

const getAllUsersDataForML = async () => {
  return User.find({}, "_id interactions");
};

const findUserByIdForML = async (id) => {
  const user = await User.findById(id, "interactions preferences")
    .populate("preferences.preferredGenres", "name") // Populate genre names
    .lean();

  if (!user) {
    return null;
  }

  // Exclude notifications from preferences
  const { notifications, ...preferencesWithoutNotifications } =
    user.preferences;

  const userProfile = {
    interactions: user.interactions,
    preferences: preferencesWithoutNotifications,
  };

  // Replace genre IDs with their names in preferredGenres
  userProfile.preferences.preferredGenres =
    userProfile.preferences.preferredGenres.map((genre) => genre.name);

  return { userProfile };
};

// Authenticate user by email and password
const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  // Compare the password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({ _id: user._id, role: user.role });
  return { user, token };
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  authenticateUser,
  deleteUserById,
  getAllUsers,
  getAllUsersDataForML,
  findUserByIdForML,
};
