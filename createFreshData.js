const mongoose = require("mongoose");

// MOCK DATA
const users = require("./mock_data/users.json");
const organizations = require("./mock_data/organizations.json");
const gyms = require("./mock_data/gyms.json");

// ENTITIES
const User = require("./api/user/user.model");
const Gym = require("./api/gym/gym.model");
const Organization = require("./api/organization/organization.model");

// BUILD THE MONGO URI connection string
const { username, password, database } = require("./config.json");

const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.g9wbkot.mongodb.net/${database}?retryWrites=true&w=majority`;

// mongodb+srv://prsurya1020:<password>@cluster0.g9wbkot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

const __findMatch = (collection, id) => {
  //   console.log("dfsafda " + id);
  //   console.log(collection);

  const result = collection.find((doc) => {
    return doc.idx == id;
  });
  //   console.log("vasdf " + result);
  return result.mongo_id;
};

const execScript = async () => {
  await User.deleteMany({});
  await Organization.deleteMany({});
  await Gym.deleteMany({});

  for (let i = 0; i < organizations.length; i++) {
    const orgDoc = new Organization(organizations[i]);
    try {
      const saved = await orgDoc.save();
      organizations[i].mongo_id = saved._id;
      console.log(saved);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  for (let i = 0; i < gyms.length; i++) {
    const gym = gyms[i];
    gym.organization = __findMatch(organizations, gym.organization);
    const gymDoc = new Gym(gym);
    try {
      const saved = await gymDoc.save();
      gym.mongo_id = saved._id;
      console.log(saved);
    } catch (error) {
      console.log(error);
    }
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    user.gym = __findMatch(gyms, user.gym);
    const userDoc = new User(user);
    try {
      const saved = await userDoc.save();
      user.mongo_id = saved._id;
      console.log(saved);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  mongoose.connection.close();
};

execScript();
