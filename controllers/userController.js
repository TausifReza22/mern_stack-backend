import User from '../schema/userSchema.js';
import jwt from "jsonwebtoken";

// Create a new user
const createUser = async (req, res) => {
    // const { fullName, email, password, mobileNumber} = req.body;
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const token = jwt.sign({ user }, "jais@123", {
        expiresIn: "1h",
      });
      res.cookie("token", token);
  
      res
        .status(200)
        .json({ message: "Login Successfully", userInfo: user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user by email
const getUserByEmail = async (req, res) => {
    try {
        // const { email } = req.params; // using for params
        const { email } = req.body; 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user by email
const updateUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete user by email
const deleteUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { createUser, loginUser, getAllUsers, getUserByEmail, updateUserByEmail, deleteUserByEmail }