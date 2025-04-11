const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};