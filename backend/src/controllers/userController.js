const userService = require("../services/userService");
const { generateToken } = require("../utils/auth");

const registerUser = async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await userService.findUserByEmail(userData.email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userService.createUser(userData);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      preferences: user.preferences,
      createdAt: user.createdAt,
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: error.message || "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await userService.authenticateUser(email, password);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: error.message || "Error logging in user" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: error.message || "Error fetching user profile" });
  }
};

// User update their own profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await userService.findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude role from the request body
    const { role, ...updateData } = req.body;

    Object.assign(user, updateData);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      preferences: updatedUser.preferences,
      createdAt: updatedUser.createdAt,
      token: generateToken(updatedUser),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ message: error.message || "Error updating user profile" });
  }
};

// Admin update user
const updateUser = async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.assign(user, req.body);

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message || "Error updating user" });
  }
};

// Admin delete user
const deleteUser = async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "Admin cannot delete themselves" });
    }

    await userService.deleteUserById(user._id);

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: error.message || "Error deleting user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res
      .status(500)
      .json({ message: error.message || "Error fetching all users" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
  getAllUsers,
};
