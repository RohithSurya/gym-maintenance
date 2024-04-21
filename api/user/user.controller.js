const User = require("./user.model");
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

module.exports = { getUsers, createUser };
