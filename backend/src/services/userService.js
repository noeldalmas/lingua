const User = require("../models/User");
const { comparePassword, generateToken } = require("../utils/auth");

const findUserByEmail = async (email) => {
  return User.findOne({ email }).select("+password");
};

const findUserById = async (id) => {
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

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  authenticateUser,
  deleteUserById,
  getAllUsers,
};
