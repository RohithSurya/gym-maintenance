const Gym = require("./gym.model");

const createGym = async (req, res) => {
  const { body } = req;
  try {
    const gymDoc = new Gym(body);
    const gym = await gymDoc.save();
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getGym = async (req, res) => {
  try {
    const gym = await Gym.find().populate("organization");
    res.json(gym);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
module.exports = { createGym, getGym };
