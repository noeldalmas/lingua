const userService = require("../services/userService");
const { generateToken } = require("../utils/auth");

// /src/controllers/userController.js
const registerUser = async (req, res, next) => {
  const userData = req.body;
  userData.role = "student";

  try {
    const requiredFields = ["name", "username", "email", "password", "nativeLanguage", "dailyGoal", "topics", "languageToLearn"];
    for (const field of requiredFields) {
      if (!userData[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const existingUser = await userService.findUserByEmail(userData.email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userService.createUser(userData);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      nativeLanguage: user.nativeLanguage,
      dailyGoal: user.dailyGoal,
      topics: user.topics,
      languageToLearn: user.languageToLearn,
      level: user.level,
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};


const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { user, token } = await userService.authenticateUser(email, password);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Invalid credentials" });
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
    next(error); // Pass the error to the next middleware
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.assign(user, req.body);

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const deleteUser = async (req, res, next) => {
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
    next(error); // Pass the error to the next middleware
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// Get user data for Python app ML model
const getAllUsersDataForML = async (req, res, next) => {
  try {
    const users = await userService.getAllUsersDataForML();

    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass the error to the next middleware
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
  getAllUsersDataForML,
};
