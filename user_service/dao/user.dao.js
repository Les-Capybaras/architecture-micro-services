const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
}
 
// Login
exports.login = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check for existing user
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ msg: "User Does not exist" });
    }

    // Check for password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create and assign a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    
    res.json({
      token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create and Save a new User
exports.create = async (req, res) => {
  // Check for existing user
  const emailExists = await User.findOne({ where: { email: req.body.email } });
  if (emailExists) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  // Create a User object
  const user = {
    email: req.body.email,
    password: await hashPassword(req.body.password),
  };

  try {
    const dbUser = await User.create(user);
    
    return res.status(201).json({
      dbUser
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Some error occurred while creating the user." });
  }
};

exports.findOne = (req, res) => {
  const id = req.user.id;

  User.findByPk(id, { attributes: { exclude: ["password"] } })
    .then((data) => {
      let { password, ...userWithoutPassword } = data.dataValues;
      return res.send(userWithoutPassword);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};