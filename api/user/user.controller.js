const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
const config = require("../../config.json");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const createUser = async (req, res) => {
  const { body } = req;
  delete body.created;
  try {
    const userDoc = new User(body);
    const user = userDoc.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString });
  }
};

const registerUser = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  if (!email || !password)
    res.status(400).json({ error: "username and password are required" });

  User.init()
    .then(async () => {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const userDoc = new User({ ...body, password: hashed });
      const saved = await userDoc.save();
      const user = saved.toObject();
      delete user.password;
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.toString() });
    });
};

const loginUser = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) res.status(401).json({ error: "Invalid user credentials" });
    // console.log(user);
    const hashed = user.password;
    const authorized = await bcrypt.compare(password, hashed);
    if (!authorized)
      res.status(401).json({ error: "Invalid user credentials" });
    else {
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        config.jwtsecret
      );
      const userObj = user.toObject();
      delete userObj.password;
      res.header(`Authorization`, `Bearer ${token}`).json(userObj);
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = { getUsers, createUser, registerUser, loginUser };
